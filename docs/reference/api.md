---
title: Incident API reference
---

Base URL: `http://127.0.0.1:3333`. This API is a local synthetic teaching service,
not a hosted endpoint. It has no authentication, persistent storage, rate limiter,
notification delivery or production service guarantees.

## GET /health

Returns `200` with `{"status":"ok"}`. No request body or credentials are needed.

## POST /incidents

Required headers:

| Header | Value |
| --- | --- |
| Content-Type | `application/json` (charset parameter permitted) |
| Idempotency-Key | 1–80 ASCII letters, digits, dots, underscores or hyphens |

Body limit: **16,384 bytes**. Unknown object fields are rejected.

| Field | Type | Rules |
| --- | --- | --- |
| title | string | Required, nonblank, at most 120 JavaScript string code units before trimming |
| severity | string | Exactly `low`, `medium` or `high` |

```json
{"title":"Synthetic latency alert","severity":"high"}
```

### Success responses

New keys return `201`; replaying an existing key with the same normalized title
and severity returns `200`. Property order and leading/trailing title whitespace
do not affect replay matching. Severity is case-sensitive.

```json
{"id":"INC-0001","title":"Synthetic latency alert","severity":"high","replayed":false}
```

`id` increments within the running process; it is not globally unique. `replayed`
is true only for the successful replay response. Keys and IDs reset on restart.

### Error responses

| HTTP status | Error | Meaning |
| --- | --- | --- |
| 400 | invalid_idempotency_key | Missing key or invalid length/characters |
| 400 | invalid_json | Malformed JSON or unreadable request body |
| 400 | invalid_incident | Invalid fields, types, title or severity |
| 409 | idempotency_conflict | An existing key was reused with different normalized content |
| 413 | body_too_large | Request body exceeds 16,384 bytes |
| 415 | application_json_required | Unsupported or missing content type |
| 404 | not_found | Any unsupported method/path combination |

Errors have the shape `{"error":"error_code"}`. There is no endpoint to read,
update or delete incidents. A receipt from this demo is not a real incident record.
