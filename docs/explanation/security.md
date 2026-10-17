---
title: Security boundaries
---

## A synthetic local API

The demo binds to loopback. Use invented titles and events only. It does not
authenticate requests, encrypt local HTTP or persist records. Do not expose the
service with a public tunnel, bind it to all network interfaces or send real
incident, patient, employee or customer information to it.

Validation rejects unknown fields, overly large request bodies, malformed JSON
and invalid keys. This limits some accidental misuse; it does not make the service
secure for hostile multi-user traffic. The in-memory map has no expiration or
capacity bound, so sustained new keys can exhaust memory even with a body limit.

## A static documentation deployment

Pull-request checks have read-only repository access. Deployment runs only from
the main-branch workflow or its manual dispatch. Only the deployment job receives
Pages and identity-token permissions. No personal access token, application secret
or SSH deploy key is needed in repository settings.

Dependencies are locked for reproducibility. Review audit findings rather than
running a breaking `npm audit fix --force` blindly. A clean audit is one signal,
not proof of security; a finding also needs affected-component and reachability
analysis. Generated output is excluded from Git and rebuilt in CI.

## Content and contribution hygiene

Review MDX like source code: JSX and imports can execute during builds. Do not
build an untrusted pull request with deployment credentials or use
`pull_request_target` to run its code. Review workflow changes, dependency updates
and snippets separately from prose edits. Public examples must not contain real
credentials, private CVs, application trackers or employer data.
