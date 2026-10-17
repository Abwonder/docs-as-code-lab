# Dependency review

The initial Docusaurus 3.10.2 dependency tree was audited on October 17, 2026.
The report included inherited build-tool findings, not 45 separate root causes.
Direct advisory roots were tinypool, serialize-javascript, postcss-selector-parser,
uuid and braces. Do not interpret a static deployment as making build-time
vulnerabilities irrelevant: MDX and configuration are executable build inputs.

## Explicit patched overrides

The manifest uses exact npm overrides, locked in package-lock.json:

| Package | Override | Reason |
| --- | --- | --- |
| tinypool | 2.2.0 | Prototype-pollution/RCE worker-option advisories |
| serialize-javascript | 7.1.2 | Serialization code-injection and CPU exhaustion advisories |
| postcss-selector-parser | 7.1.6 | Flat-selector parsing complexity advisory |
| uuid | 11.1.1 | Buffer bounds advisory in older v3/v5/v6 implementations |

Some overrides cross the parent's declared major range. They are an explicit
compatibility trade-off, not an upstream Docusaurus guarantee. Production build,
API tests and generated-site checks must pass with this tree. Recheck the overrides
when upgrading Docusaurus; remove them when upstream resolves patched versions.

## Remaining upstream issue

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
affects braces through 3.0.3; the advisory listed **no patched version** at review.
It describes stack exhaustion from deeply nested attacker-controlled brace patterns.

The project retains this build-tool dependency with a documented limitation:
only trusted repository configuration/content is built; glob patterns are static;
development binds to loopback; and the deployed result is static HTML/CSS/JS, not
a Node build service accepting user patterns. Untrusted PR code must never be
built with deployment permissions. These boundaries reduce exposure but do not
patch the package. Audit results therefore must not be reported as clean.

Monitor the upstream advisory and Docusaurus release notes. Review new findings
and their actual dependency paths before using `npm audit fix`; do not accept an
automatic forced downgrade of Docusaurus as a remediation without evaluation.

Further references:
- [Tinypool advisory](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)
- [Serialization advisory](https://github.com/advisories/GHSA-5c6j-r48x-rmvq)
- [Selector parser advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)
- [UUID advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq)

Do not put security reports containing credentials or private data in this public
repository. Use synthetic reproductions only.
