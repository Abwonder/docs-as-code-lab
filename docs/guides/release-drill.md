---
title: Practise a change, failure and recovery
---

This is a practice procedure, not a claim that you have completed it. Run the
steps yourself before presenting the project as something you can independently
maintain.

## Exercise A: repair a broken reference

1. Create a branch: `git switch -c codex/practice-broken-link`.
2. Temporarily change a relative Markdown link to a document that does not exist.
3. Run `npm run build`. Capture the nonzero exit and the referenced source file.
4. Repair the link and run `npm run verify`.
5. Explain why a build failure is preferable to shipping a broken tutorial.

Keep deliberate broken examples off `main`. You do not need to submit an
intentionally broken pull request or disrupt the live site.

## Exercise B: change an API requirement

1. Add a new supported severity to the service.
2. Update the validation tests and the API reference together.
3. Run the tutorial with the new severity, then run all checks.
4. Explain which checks verify behavior and which only verify documentation routes.

## Exercise C: release and recover

Open a small documentation pull request. Read the CI logs before merging. After
deployment, verify a nested URL directly. Revert the content change in a new pull
request and observe the next deployment.

Record real observations in a dated note: commit SHA, workflow URL, symptom,
diagnosis, fix and outcome. Never backdate a practice exercise or turn a demo into
a customer deployment on a CV.
