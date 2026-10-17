---
title: Deploy through GitHub Actions
---

## Delivery path

The repository uses two workflows:

| Trigger | Workflow | Result |
| --- | --- | --- |
| Pull request to main | Validate documentation | API tests, production build and generated-route checks; no deployment |
| Push to main or manual dispatch | Deploy documentation | Same checks, upload static artifact, deploy to GitHub Pages |

The site is static. The demo API is **not** deployed to Pages. Browser readers can
read the tutorial; to execute API calls, they must start the local Node service.

## First-time setup

1. Set repository **Settings → Pages → Source → GitHub Actions**.
2. Ensure Actions is enabled for the repository and the official actions are allowed.
3. Confirm `url`, `baseUrl`, `organizationName` and `projectName` in
   `docusaurus.config.js` match the repository owner and name.
4. Push to `main`, then inspect **Actions → Deploy documentation**.
5. Open the deployment URL from the successful `github-pages` environment.

The deployment job requests `pages: write` and `id-token: write` only. Build jobs
use `contents: read`. There is no stored personal access token or SSH deploy key.
Pull requests cannot execute the privileged deployment job.

## Verify a release

Check the workflow's commit SHA against the change you intended to release. Open
the homepage and a nested reference page directly, then refresh it. Confirm CSS
and JavaScript load beneath `/docs-as-code-lab/` and browser back/forward works.

## Roll back

Revert the bad source commit on a branch, validate it and merge the revert through
review. The resulting push rebuilds and redeploys the known source. Do not edit
generated `build/` files or assume restarting a job reverses a content change.

For a deliberate practice release, follow the [release drill](release-drill.md).
