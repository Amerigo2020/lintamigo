# Interpreting the saved repository scan

This directory contains a saved automated scan of 100 selected public GitHub
repositories. [results.json](results.json) is the stored data;
[RESULTS.md](RESULTS.md) presents its counts. The saved artifact timestamp is
2026-09-02T22:54:27.103Z and the data schema version is 2.

## What the numbers mean

The runner records whether each repository's linter report contains at least
one finding at error severity. The saved data contains 73 such repositories,
including 66 with an AL001 stale-path error and 38 with an AL002 stale-script
error. These groups overlap and must not be added together.

There is no recorded manual validation of individual findings. The figures
describe what the linter flagged, not how many repositories contain confirmed
defects. They do not measure false-positive rates, agent failures, or the
prevalence of problems across GitHub. A path can be intentional example text,
and a command may rely on setup the static checks cannot establish.

Rule totals include findings of all severities. The 4,308 AL001 findings, for
example, must not be read as an error-only total. Token counts use the linter's
approximation and sum every discovered instruction file; they do not represent
the context necessarily loaded at the start of an agent session. The CLI's `stats`
command separately reports always-loaded and on-demand instructions.

Credential-pattern matches are stored only as aggregate counts. A match
does not verify that a credential is real, active, or usable. Repository
names and secret values are not stored alongside those matches.

## Sample and missing historical evidence

[repos.txt](repos.txt) preserves the selected repository names. Its original
annotation described a GitHub API sample dated 2026-09-02, covering
TypeScript, JavaScript, Python, Go, and Rust repositories with CLAUDE.md or
AGENTS.md. The original API query, search responses, per-repository star
counts, and ranking were not retained. The saved artifacts therefore do not
support a claim that these were the 100 most-starred eligible repositories
or that every repository exceeded a particular star threshold.

The per-repository records retain status, approximate token totals, and
three finding-presence flags. They do not retain the repository commit SHA,
linter version or commit, individual findings, or manual review decisions.
The schema version identifies the data format, not the linter version.
Consequently, the historical scan cannot be reproduced exactly from these
artifacts alone.

## How the runner behaves

[scripts/study.ts](../scripts/study.ts) shallow-clones each pending repository's
default branch and calls `lint({ root: repositoryRoot, config: {} })`.
Passing an empty configuration applies the linter's defaults and bypasses
repository-specific amigolint configuration, including custom exclusions
and rule settings. Standard discovery exclusions still apply, but deliberate
examples and test fixtures can be scanned. Repositories are not built and
their documented commands are not executed to confirm findings.

`pnpm study` is a resumable collection command. It loads the existing JSON
and processes only repository names with no saved record; both successful
and failed recorded attempts are skipped. With the checked-in results, it
does not rerun the 100 completed scans. A later run that adds repositories
can mix observations from different dates or linter implementations.

Every persistence step refreshes `generatedAt`, including a run with nothing
left to scan. That field is an artifact-write timestamp, not proof that all
repositories were scanned at that time. The runner also regenerates
RESULTS.md with qualification notes and a link to this methodology. Editing
the Markdown report does not change the stored observations.

For a fresh study, call the exported `runStudy()` with a new `resultsPath`
and `markdownPath` so that the saved snapshot stays intact. A fresh run
scans current default branches; it is a new observation, not a recreation
of this one. Before using new results to make claims about confirmed
defects, retain source revisions and the linter version, document sampling
and exclusions, and manually review the findings supporting those claims.
