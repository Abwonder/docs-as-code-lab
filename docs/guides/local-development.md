---
title: Develop and review a documentation change
---

## Start a working copy

```bash
git clone https://github.com/Abwonder/docs-as-code-lab.git
cd docs-as-code-lab
nvm use
npm ci
npm start
```

Open the local URL printed by Docusaurus. The site lives under
`/docs-as-code-lab/`, matching the deployed project path. `npm start` reloads
content changes; configuration changes may require restarting it.

## Make a focused change

Create a `codex/` branch for the task. Choose the correct page type: a tutorial for
a learning sequence, a guide for a task, reference for exact behavior, or an
explanation for a design decision. Add the document ID to `sidebars.js` if adding
a page. Keep code examples synthetic and runnable.

Use relative Markdown links between documentation files. For screenshots, provide
meaningful alternative text and never include secrets, account details or customer
data. Do not paste private production logs into a public issue.

## Check what readers will see

```bash
npm run verify
npm run serve
```

The production build differs from the development server: it compiles MDX,
validates links and emits static files. `check:site` checks generated local links
and assets against the configured project path. It does not crawl the internet
or test a remote provider's API.

Review the site at desktop and mobile widths, including the navigation menu,
code-block scrolling and dark mode. Open a pull request with a short description
of the reader problem, the change and validation. A green build does not replace
technical review or proofreading.
