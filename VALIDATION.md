# Validation evidence

Created October 17, 2026. This file records actual checks, not planned results.

Local environment: Linux, Node 24.15.0, npm 11.12.1, Docusaurus 3.10.2.

| Check | Observed outcome |
| --- | --- |
| API behavioral suite | Six tests passed using ephemeral loopback ports |
| Production build with patched overrides | Passed; static output generated |
| Generated output | 11 authored HTML routes and 311 local link/asset targets passed |
| Deliberate missing Markdown document | Build failed with exit 1 and the intended missing target |
| Restore original document and rebuild | Passed; no deliberate broken link remains |
| Development server | Started on loopback port 3107; client compilation succeeded after restoration; HTTP request succeeded |
| Dependency audit after overrides | Zero critical/moderate/low; 28 inherited high flags from one remaining braces advisory root; see SECURITY.md |
| GitHub Actions build / Pages deployment | Both passed in [run 39036792928](https://github.com/Abwonder/docs-as-code-lab/actions/runs/39036792928) for initial commit 663ce86 |
| Live browser | Homepage rendered; API link navigated correctly; nested API URL reloaded directly without a 404 |

The initial audit reported 45 inherited flags. Explicit patched overrides removed
the tinypool, serialization, selector-parser and uuid advisory roots; braces has
no published patch at review. These are build tools, but the remaining risk is
documented rather than suppressed or described as a clean audit.

The development page uses client rendering; the production build supplies static
HTML. The live homepage was visually checked and its screenshot is stored at
`assets/site-preview.png`. The deployment took place after the local checks; it is
supported by the separate remote workflow evidence above.

These checks were performed with Codex assistance. The owner's independent
release-drill practice is not recorded as completed.
