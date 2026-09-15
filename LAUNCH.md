# lintAmigo launch

Prepared for Amerigo on 2026-09-15. The product is **lintAmigo**; the npm
package and CLI are `lintamigo`. Target release: **0.1.1**. Rename publication
and release verification are pending. Social posts have not been sent, and
personal tester invitations are not part of this launch.

## Release targets

- npm: [lintamigo](https://www.npmjs.com/package/lintamigo), version 0.1.1
- GitHub: [Amerigo2020/lintamigo](https://github.com/Amerigo2020/lintamigo)
- Release tag: `v0.1.1`
- README, schema links, CLI help, reports, API imports, and media use the new
  name; legacy amigolint configuration and suppression comments remain accepted.

These are the intended release coordinates, not confirmation of publication.
The previous `amigolint@0.1.0` package is a historical artifact; preparing the
rename does not update that package or prove the new one installs.

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
- [ ] The reviewed changes are on GitHub and CI is green for that commit.
- [ ] npm publication and the GitHub release for 0.1.1 are verified.
- [ ] A fresh public install of `lintamigo@0.1.1` runs successfully from a
  separate project, and old GitHub URLs redirect to the renamed repository.

Check the latest [main revision](https://github.com/Amerigo2020/lintamigo/tree/main)
and its [GitHub Actions runs](https://github.com/Amerigo2020/lintamigo/actions).
Local build evidence, pushed source, and a published npm package are separate
checks. The release owner updates this checklist after verifying them.

## Public launch sequence

1. Publish and verify the rename and release before sharing install commands.
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
