# amigolint launch

Prepared for Amerigo on 2026-09-15. Social posts and outreach have not been
sent. This is the review checklist referenced by `docs/SPEC.md`.

## Public product

- [npm package](https://www.npmjs.com/package/amigolint): version 0.1.0
- [GitHub release](https://github.com/Amerigo2020/amigolint/releases/tag/v0.1.0)
- GitHub description, npm homepage link and nine relevant topics are set.
- The README explains real repository checks, how to try the CLI, all 15
  rules, configuration, CI, and the public API.
- The source checkout has explicit exclusions for deliberately broken test
  fixtures and the demo. The dogfood workflow uses default discovery.

## Assets to review

| Asset | Purpose |
| --- | --- |
| [Launch demo](demo/launch/README.md) | Recorded example, MP4/GIF, provenance and reproduction |
| [LinkedIn draft](launch/linkedin.md) | Personal launch post with a concrete example |
| [Show HN preparation](launch/show-hn.md) | Verified facts and questions for your own submission text |
| [Early testers](launch/early-testers.md) | Ten public candidates and individualized draft invitations |
| [Feedback guide](launch/feedback.md) | Small trial and useful, sanitized bug reports |
| [Study methodology](study/METHODOLOGY.md) | What the saved scan does and does not establish |

The demo uses a labelled, controlled reproduction. It does not expose private
repository contents or claim a defect in someone else's live project.

## Release checks

- [x] `pnpm build`, `pnpm test` (271 tests), `pnpm lint`, and `git diff --check`
  pass for the launch changes; the CLI bundle is 159.94 kB.
- [x] `npx amigolint` in this checkout reports one actual instruction file
  with zero findings, excluding the deliberately broken examples and fixtures.
- [x] A clean public install of version 0.1.0 runs successfully: fresh install,
  matching version output, and a clean JSON lint report for a separate project.
- [x] The 24.72-second launch video is visually reviewed. The actual CLI
  reports one stale-script error before the manual edit and zero findings after
  it; the saved CLI hash matches the build used for the final tests.

For the published source state, check the latest commit on
[main](https://github.com/Amerigo2020/amigolint/tree/main) and its
[GitHub Actions runs](https://github.com/Amerigo2020/amigolint/actions).
The checks above record the local launch verification; GitHub CI verifies
the pushed revision separately.

The npm 0.1.0 artifact retains the README bundled at publication. Editing
GitHub documentation does not update that immutable package artifact; a later
package release would be needed to ship a revised README there.

## Launch sequence

1. Review the assets and publish the tested source changes to GitHub.
2. Invite a small number of relevant developers from the shortlist in an
   appropriate existing or invited conversation; use each draft as context,
   not a mass message.
3. Publish the LinkedIn post with the MP4 and the repository link.
4. Write your own Show HN text using the facts provided, then submit the
   repository link when you can answer technical questions.
5. Record actual feedback and CI adoption, fix reproducible issues, and share
   a follow-up with concrete findings rather than an unverified percentage.

The immediate goal is ten voluntary trials and specific feedback. No number
of stars or ranking outcome is guaranteed.
