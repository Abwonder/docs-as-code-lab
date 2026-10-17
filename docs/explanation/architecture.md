---
title: Why this documentation architecture?
---

## A service small enough to verify

The Node HTTP implementation is deliberately small. It demonstrates request
validation and idempotent retries without cloud accounts, external APIs or a
database. The reference can therefore be checked directly against code and tests.
It is not a claim that this design is suitable for production incident handling.

## Separate reader needs

The tutorial teaches a complete first success. Guides answer operational tasks.
Reference gives exact fields and responses. Explanations make trade-offs explicit.
Mixing all four into a single long README would make everyday lookup harder.

## Build documentation as a product artifact

Docusaurus compiles Markdown/MDX and navigation into static HTML. A successful
build catches many syntax and link errors, while generated-output checks catch
incorrect project-path links and missing local assets. Neither proves that prose
is technically accurate. The API tests provide an additional behavioral check.

## Keep runtime and publishing separate

GitHub Pages hosts the static documentation; it cannot run this Node HTTP service.
The tutorial makes that separation explicit. Publishing requires only a scoped
Actions token and a Pages artifact, rather than a server or a long-lived deploy
credential. This reduces the operational scope of the portfolio.

## Known limitations

There is one current documentation edition, no localization, no site search, no
external-link crawler and no automated accessibility certification. Local link
checks cover target files, while Docusaurus also validates document relationships.
The demo keeps unbounded incident/key data in process memory and loses it on exit.
Production design would require durability, authentication, authorization, quotas,
observability, retention rules and a more complete threat model.
