# lintAmigo launch

Prepared for Amerigo on 2026-09-15. The product is **lintAmigo**; the npm
package and CLI are `lintamigo`. **Version 0.1.1 is published and verified.**
Social posts have not been sent, and personal tester invitations are not part
of this launch.

## Public release

- npm: [lintamigo](https://www.npmjs.com/package/lintamigo), version 0.1.1
- GitHub: [Amerigo2020/lintamigo](https://github.com/Amerigo2020/lintamigo)
- [GitHub release v0.1.1](https://github.com/Amerigo2020/lintamigo/releases/tag/v0.1.1)
- README, schema links, CLI help, reports, API imports, and media use the new
  name; legacy amigolint configuration and suppression comments remain accepted.

The release uses source commit `6d61f8128db3c1aab474bef96c69a708c0beb5a7`,
which matches npm metadata. The [release workflow](https://github.com/Amerigo2020/lintamigo/actions/runs/34982736153)
published with provenance and marked `amigolint@0.1.0` with a migration notice.
The previous package still installs and works; old GitHub URLs redirect to the
renamed repository.

## Assets to review

| Asset | Purpose |
| --- | --- |
| [Launch demo](demo/launch/README.md) | Recorded example, MP4/GIF, provenance and reproduction |
| [LinkedIn draft](launch/linkedin.md) | Public launch post with a concrete example |
| [Show HN preparation](launch/show-hn.md) | Facts and questions for Amerigo's own submission text |
| [Feedback guide](launch/feedback.md) | Voluntary trials and useful, sanitized bug reports |
| [Study methodology](study/METHODOLOGY.md) | What the saved scan does and does not establish |
| [Archived tester research](launch/early-testers.md) | Optional, unused reference; no personal outreach |

The demo uses a labelled, controlled reproduction. It does not expose private
repository contents or claim a defect in someone else's live project.

## Release checks

- [x] `pnpm build`, `pnpm test` (289 tests), `pnpm lint`, and `git diff --check`
  pass for the rename; the CLI bundle is 160.51 kB.
- [x] The renamed package and binary report version 0.1.1; the API imports
  from `lintamigo` and the packed package stays within size limits.
- [x] Config precedence follows `docs/SPEC.md` §8 and both new and legacy
  suppression prefixes pass their regression checks.
- [x] Running the built `lintamigo` CLI in this checkout checks the actual instructions
  while excluding deliberately broken examples and fixtures.
- [x] The renamed demo media is visually reviewed against actual CLI output;
  the launch MP4 is 26.76 seconds and its recorded hash matches the tested build.
- [x] The reviewed changes are on GitHub and CI is green for that commit.
- [x] npm publication and the GitHub release for 0.1.1 are verified.
- [x] A fresh public install of `lintamigo@0.1.1` runs successfully from a
  separate project, and old GitHub URLs redirect to the renamed repository.

Check the latest [main revision](https://github.com/Amerigo2020/lintamigo/tree/main)
and its [GitHub Actions runs](https://github.com/Amerigo2020/lintamigo/actions).
Local build evidence, pushed source, and a published npm package are separate
checks. The [release source CI](https://github.com/Amerigo2020/lintamigo/actions/runs/34982542183)
passed on Linux, macOS, and Windows. A fresh public install passed the version,
CLI, legacy binary alias, API import, and `init` checks. A separate clean install
of `amigolint@0.1.0` also checked this source checkout with zero findings.

## Public launch sequence

1. Rename and release verified on 2026-09-15; the public install command is ready to share.
2. Publish the LinkedIn post from Amerigo's profile with the renamed MP4 and
   repository link; stay available for questions.
3. Write the Show HN title and discussion personally using the facts provided,
   then submit the repository when the tool is ready to try.
4. Share a tailored public post in relevant developer forums where the current
   rules allow project promotion. Check each destination's rules first and
   disclose that Amerigo built lintAmigo. No personal tester invitations.
5. Record voluntary feedback and actual CI adoption, fix reproducible issues,
   and publish a follow-up with concrete findings rather than an unverified
   percentage.

The goal is useful feedback from public discovery. No number of stars,
replies, or ranking outcome is promised. The archived shortlist is not a
prerequisite or an active outreach queue.
