---
title: Diagnose a failed build or broken page
---

Work from the first actionable error in the failed job. Reproduce with the same
Node version and `npm ci`; do not delete the lockfile as a first response.

| Symptom | Likely cause | Check and repair |
| --- | --- | --- |
| `npm ci` fails with lock mismatch | Manifest changed without lockfile | Run `npm install` locally, review and commit both files |
| MDX compilation fails | Unclosed JSX tag or braces outside a code block | Read the reported file and line; put literal JSON in fenced `json` blocks |
| Broken-link build error | Renamed document or incorrect path | Update references and `sidebars.js`; rebuild |
| Page renders without styling | Incorrect project `baseUrl` | Use `/docs-as-code-lab/`, including both slashes |
| Nested page returns 404 | Wrong deployment artifact or missing route | Confirm `build` was uploaded and `trailingSlash` is true |
| Pages deployment fails | Pages source disabled or permissions missing | Inspect Settings → Pages and the deploy job permissions |
| Demo API returns 409 | Same key, different normalized payload | Reconcile intended event; use a new key only for a new event |
| `EADDRINUSE` on port 3333 | Another local process owns the demo port | Stop your previous demo; do not terminate an unidentified process |

## Reset generated state

If a normal rebuild still uses stale generated state:

```bash
npm run clear
npm run verify
```

This clears Docusaurus output, not source files or Git history. If CI passes but
the deployed site is stale, inspect the latest deployment SHA and environment
status before changing code.

## Report a reproducible issue

Include the failing command, Node/npm versions, relevant file/line, expected
behavior, observed result and a minimal synthetic example. Remove credentials and
private URLs from logs. Preserve the failure evidence instead of repeatedly
rerunning a broken deployment without a diagnosis.
