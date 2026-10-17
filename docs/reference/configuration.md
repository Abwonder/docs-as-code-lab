---
title: Site configuration reference
---

| Setting | Location | Purpose |
| --- | --- | --- |
| url | docusaurus.config.js | Public host origin, without project path |
| baseUrl | docusaurus.config.js | `/docs-as-code-lab/`; must match repository deployment path |
| routeBasePath | docs preset | `/` places documentation at the site root |
| trailingSlash | site config | `true` emits directory/index.html routes for static hosting |
| onBrokenLinks | site config | `throw` prevents releasing unresolved internal links |
| onBrokenMarkdownLinks | markdown hooks | `throw` treats unresolved document references as failures |
| sidebarPath | docs preset | Explicit learning/task/reference/explanation navigation |
| editUrl | docs preset | Links each page back to its source on GitHub |
| customCss | theme preset | Theme tokens and responsive landing-page cards |

## Repository files

```text
docs/                         Source Markdown and MDX
examples/api.mjs              Local demo implementation
examples/api.test.mjs         Behavioral contract tests
scripts/check-site.mjs        Generated route/asset verification
src/css/custom.css            Light/dark responsive styles
.github/workflows/ci.yml      Pull-request checks
.github/workflows/deploy.yml  Main-branch static deployment
package-lock.json             Exact resolved dependency graph
```

`build/`, `.docusaurus/` and `node_modules/` are generated and ignored. Do not
commit environment files or edit output files as a way to fix source problems.
The site uses Docusaurus 3.10.2 and Node 24. Keep all Docusaurus packages on the
same version when upgrading; inspect release notes and run a clean locked install.
