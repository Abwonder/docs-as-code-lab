import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createServer} from './api.mjs';

async function fixture(run) {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (body, key = 'demo-001', type = 'application/json') => fetch(`${base}/incidents`, {
    method: 'POST', headers: {'content-type': type, 'idempotency-key': key},
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
  try { await run(base, post); } finally { await new Promise(resolve => server.close(resolve)); }
}

test('health endpoint and unknown route match the reference', () => fixture(async base => {
  assert.deepEqual(await (await fetch(`${base}/health`)).json(), {status: 'ok'});
  assert.equal((await fetch(`${base}/missing`)).status, 404);
}));
test('tutorial creates one incident; replay has the same ID', () => fixture(async (_, post) => {
  const body = {title: 'Synthetic latency alert', severity: 'high'};
  const first = await post(body); assert.equal(first.status, 201);
  assert.deepEqual(await first.json(), {id: 'INC-0001', ...body, replayed: false});
  const retry = await post(body); assert.equal(retry.status, 200);
  assert.equal((await retry.json()).id, 'INC-0001');
  assert.equal((await post({...body, severity: 'low'})).status, 409);
}));
test('canonical title whitespace and JSON key order do not create duplicates', () => fixture(async (_, post) => {
  await post({title: ' Alert ', severity: 'low'});
  const response = await post({severity: 'low', title: 'Alert'});
  assert.equal(response.status, 200);
  assert.equal((await response.json()).replayed, true);
}));
test('invalid title, severity, unknown fields and malformed JSON are rejected', () => fixture(async (_, post) => {
  for (const body of [{title: '', severity: 'high'}, {title: 'a', severity: 'critical'},
    {title: 'a', severity: 'low', secret: 'synthetic'}, null, [], '{']) {
    assert.equal((await post(body)).status, 400);
  }
}));
test('content type, idempotency key and body-size limits are enforced', () => fixture(async (_, post) => {
  assert.equal((await post('{}', 'demo', 'text/plain')).status, 415);
  assert.equal((await post('{}', '')).status, 400);
  assert.equal((await post('{}', 'a b')).status, 400);
  assert.equal((await post('x'.repeat(16385))).status, 413);
}));
test('a server restart resets demo storage', () => fixture(async (_, post) => {
  assert.equal((await post({title: 'After restart', severity: 'medium'})).status, 201);
}));
