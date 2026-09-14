# Automated scan of agent instruction files

Report written: 2026-09-02T22:54:27.103Z. This timestamp does not establish when each repository was scanned.

This report counts automated linter findings with no recorded manual validation. A flag is not a confirmed defect, and this selected sample does not estimate the prevalence of defects across GitHub. See [methodology and limitations](METHODOLOGY.md).

| Metric | Result |
| --- | ---: |
| Repositories analysed | 100 |
| Repositories that failed | 0 |
| Repositories with at least one error-level finding | 73.0% (73/100) |
| Repositories with an error-level stale-path finding | 66.0% (66/100) |
| Repositories with an error-level stale-script finding | 38.0% (38/100) |
| Repositories with a credential-pattern finding | 1.0% (1/100) |
| Median approximate tokens across all discovered instructions per repository | ≈7323 |

Credential-pattern findings are aggregate-only; repository names and credential values are not recorded alongside them. A match does not establish that a credential was real, active, or usable.

The saved data does not capture repository commit SHAs, the linter version, star counts, or the original search response. By default, the study runner bypasses repository-specific amigolint configuration, so intentional examples or test fixtures can contribute findings.

## Most common rule codes

This table includes every reported severity, not just error-level findings. Counts do not represent confirmed defects.

| Code | Rule | Findings |
| --- | --- | ---: |
| AL001 | stale-path | 4308 |
| AL002 | stale-script | 1225 |
| AL007 | duplicate-rule | 1019 |
| AL008 | contradiction | 689 |
| AL013 | huge-code-block | 308 |
| AL011 | frontmatter | 144 |
| AL006 | dead-link | 122 |
| AL005 | token-budget | 108 |
| AL003 | broken-import | 94 |
| AL009 | vague-rule | 89 |

## Rerunning the study

`pnpm study` resumes saved records; it does not rescan completed repositories. Even a run with no pending repositories refreshes the report timestamp. A fresh run scans current default branches and cannot reproduce this historical snapshot exactly without the missing source revisions and linter version. See [methodology and limitations](METHODOLOGY.md).
