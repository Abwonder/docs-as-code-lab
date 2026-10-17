import http from 'node:http';
import {pathToFileURL} from 'node:url';

export function createServer() {
  const incidents = new Map();
  return http.createServer(async (request, response) => {
    const send = (status, body) => {
      response.writeHead(status, {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store'});
      response.end(JSON.stringify(body));
    };
    if (request.method === 'GET' && request.url === '/health') return send(200, {status: 'ok'});
    if (request.method !== 'POST' || request.url !== '/incidents') return send(404, {error: 'not_found'});
    if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return send(415, {error: 'application_json_required'});
    }
    const key = request.headers['idempotency-key'];
    if (typeof key !== 'string' || !/^[A-Za-z0-9._-]{1,80}$/.test(key)) {
      return send(400, {error: 'invalid_idempotency_key'});
    }
    let bytes = 0;
    const chunks = [];
    try {
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 16384) return send(413, {error: 'body_too_large'});
        chunks.push(chunk);
      }
      const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      if (!input || typeof input !== 'object' || Array.isArray(input)
          || typeof input.title !== 'string' || !input.title.trim() || input.title.length > 120
          || !['low', 'medium', 'high'].includes(input.severity)
          || Object.keys(input).some(k => !['title', 'severity'].includes(k))) {
        return send(400, {error: 'invalid_incident'});
      }
      const normalized = {title: input.title.trim(), severity: input.severity};
      const existing = incidents.get(key);
      if (existing) {
        if (existing.title !== normalized.title || existing.severity !== normalized.severity) {
          return send(409, {error: 'idempotency_conflict'});
        }
        return send(200, {...existing, replayed: true});
      }
      const incident = {id: `INC-${String(incidents.size + 1).padStart(4, '0')}`, ...normalized};
      incidents.set(key, incident);
      return send(201, {...incident, replayed: false});
    } catch {
      return send(400, {error: 'invalid_json'});
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createServer();
  server.listen(3333, '127.0.0.1', () => console.log('Synthetic demo: http://127.0.0.1:3333'));
}
