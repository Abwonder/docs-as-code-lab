---
title: Send your first incident
description: Run a local API and verify an idempotent retry in about ten minutes.
---

You will create a synthetic incident and retry the same request without creating
a second record. You need Node.js 24, npm, curl and two terminal windows. Nothing
in this tutorial contacts an incident provider or sends a notification.

## 1. Install and start

From the repository root:

```bash
npm ci
npm run demo
```

Keep this terminal open. The service listens only on `127.0.0.1:3333`.

## 2. Check health

In the second terminal:

```bash
curl -i http://127.0.0.1:3333/health
```

Expect HTTP `200` and `{"status":"ok"}`. If the connection fails, check that the
first terminal is still running and port 3333 is available.

## 3. Create a synthetic incident

```bash
curl -i http://127.0.0.1:3333/incidents \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: demo-001' \
  --data '{"title":"Synthetic latency alert","severity":"high"}'
```

Expect HTTP `201`:

```json
{"id":"INC-0001","title":"Synthetic latency alert","severity":"high","replayed":false}
```

## 4. Retry safely

Repeat exactly the command from step 3. Expect HTTP `200`, the same `INC-0001`,
and `"replayed":true`. Change the severity while retaining `demo-001` and you get
HTTP `409`: the key is already associated with a different incident.

Use a new key for a genuinely different event. Do not treat a conflict as a reason
to change the key automatically; check which event you intended to send.

## 5. Clean up

Press Ctrl+C in the first terminal. All demo incidents are held in memory and
disappear when the service exits. No database, account or cleanup request is needed.

Next: inspect the [API contract](../reference/api.md), or run `npm test` to verify
the same behavior automatically.
