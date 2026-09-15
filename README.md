# lintAmigo

Catch stale paths and deleted scripts in CLAUDE.md, AGENTS.md, Cursor rules,
and Copilot instructions. Runs locally without an LLM or API key.

Formerly **amigolint**. The product is **lintAmigo**; the npm package and
command are lowercase `lintamigo`.

[![npm version](https://img.shields.io/npm/v/lintamigo.svg)](https://www.npmjs.com/package/lintamigo)
[![CI](https://github.com/Amerigo2020/lintamigo/actions/workflows/ci.yml/badge.svg)](https://github.com/Amerigo2020/lintamigo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Run in the project you want to check:

```sh
npx lintamigo
```

```text
AGENTS.md:3:7   error  stale-path    `docs/architecture.md` does not exist
AGENTS.md:5:11  error  stale-script  `publish-demo` just recipe does not exist
CLAUDE.md:7:39  error  secret-leak   Potential assigned credential `D3m0****` found
```

![A stale command, manual correction, and clean lintAmigo check](demo/launch/lintamigo-launch.gif)

For a small example you can reproduce, see the
[renamed-script demo](demo/launch/README.md).

## Why

Renaming a file or deleting a package script does not update the instructions
your coding agent reads. lintAmigo checks those references against your
repository and reports where to fix them. It also flags credential-shaped
values, oversized instructions, and invalid agent frontmatter.

No configuration is required. It supports CLAUDE.md, AGENTS.md, Cursor rules,
Copilot instructions, Gemini CLI, Windsurf, Cline, and Roo files. Output stays
deterministic for local use and CI; detected credentials are masked in findings.

## Quick start

Node.js 20 or newer is required. Run from the project you want to check,
without installing:

```sh
npx lintamigo
```

Or pin it in a project:

```sh
npm install --save-dev lintamigo
npx lintamigo
```

Useful commands:

```sh
npx lintamigo AGENTS.md docs/CLAUDE.md
npx lintamigo --format github
npx lintamigo --rule stale-path,stale-script
npx lintamigo stats
npx lintamigo rules --format md
```

Errors exit with status 1. Runtime and configuration failures exit with status
2. Warnings are allowed unless `--max-warnings <n>` is exceeded. Try every rule
against the deliberately broken fixture with `pnpm demo` after cloning this
repository.

In this source checkout, `lintamigo.config.json` excludes `test/fixtures/`
and `examples/broken-repo/` from normal scans because they contain intentional
errors. Use `pnpm demo` to run the example in an isolated temporary directory
with its own configuration.

The root also keeps an identical `amigolint.config.json` so the published
legacy `amigolint@0.1.0` package excludes those fixtures when run here.

## What it checks

This table is the output of `lintamigo rules --format md`:

| Code | Rule | Default | Description |
| --- | --- | --- | --- |
| AL001 | `stale-path` | error | Reports unresolved file, directory, and glob references, with relocation hints for paths found elsewhere. |
| AL002 | `stale-script` | error | Reports missing package scripts and make, just, or turbo targets, including workspace-qualified commands, while ignoring placeholders and direct file execution. |
| AL003 | `broken-import` | error | Reports unresolved Claude imports, unmatched Cursor globs, and mismatched skill names. |
| AL004 | `secret-leak` | error | Reports credential-shaped assignments, provider tokens, and private key material while masking every detected value. |
| AL005 | `token-budget` | warn | Reports instruction files and automatically loaded agent totals that exceed configured token budgets. |
| AL006 | `dead-link` | warn | Reports local links that do not resolve and optionally checks HTTP links with bounded HEAD requests. |
| AL007 | `duplicate-rule` | warn | Reports substantially duplicated instruction lines across agent files. |
| AL008 | `contradiction` | warn | Reports possible conflicts between positive and negative imperative instructions. |
| AL009 | `vague-rule` | info | Reports vague instructions that do not tell an agent what concrete action to take. |
| AL010 | `missing-essentials` | info | Reports repositories whose root agent instructions do not include a build, test, or lint command. |
| AL011 | `frontmatter` | error | Validates required frontmatter and agent-specific field types. |
| AL012 | `nested-override` | info | Reports nested agent files that substantially repeat instructions already loaded from the root file. |
| AL013 | `huge-code-block` | warn | Reports fenced code blocks that are too long to maintain inline in agent instructions. |
| AL014 | `todo-marker` | info | Reports unresolved TODO-style markers outside fenced code examples. |
| AL015 | `absolute-user-path` | warn | Reports absolute home-directory paths that only work on one contributor machine. |

`lintamigo stats` separates files and approximate tokens into **Always loaded**
and **On demand** columns. Its summary counts only context loaded at startup;
skills, commands, scoped instructions, and nested location-specific files no
longer inflate that total.

## Configuration

Create a documented starter config with `npx lintamigo init`, or create
`lintamigo.config.json` manually:

```json
{
  "$schema": "https://raw.githubusercontent.com/Amerigo2020/lintamigo/main/schema.json",
  "include": ["docs/agents/*.md"],
  "exclude": ["**/fixtures/**"],
  "rules": {
    "vague-rule": "off",
    "token-budget": ["warn", { "file": 6000, "agentTotal": 10000 }],
    "stale-path": ["error", { "ignore": ["/api/**"] }]
  },
  "checkUrls": false
}
```

`init` refuses to create a new file when any recognized configuration file
or package key already exists, including a legacy one, so it cannot silently
replace or shadow your settings.

Configuration lookup uses the first available source, in this order:

1. An explicit `--config <path>`
2. `lintamigo.config.json`
3. `.lintamigorc.json`
4. `package.json#lintamigo`
5. Legacy `amigolint.config.json`
6. Legacy `.amigolintrc.json`
7. Legacy `package.json#amigolint`

The selected source is merged over the defaults; separate configuration
sources are not combined. Use `--check-urls` to opt into bounded HTTP link
checks.

Suppress a finding close to the instruction when the exception is intentional:

```md
<!-- lintamigo-disable-next-line stale-path -->
Use `generated/client.ts` after code generation.
```

Block suppressions use `<!-- lintamigo-disable stale-path, dead-link -->` and
`<!-- lintamigo-enable -->`; `<!-- lintamigo-disable-file -->` suppresses a
whole file when placed at the top.

Existing `amigolint-disable-next-line`, `amigolint-disable`,
`amigolint-enable`, and `amigolint-disable-file` comments remain supported.

### Migrating from amigolint

Use `npx lintamigo` for new runs. If the old package is a project dependency,
replace it with `lintamigo` and update CI commands and API imports. Existing
configuration and suppression comments continue to work; rename them when
convenient. New configuration sources take precedence over legacy sources
as listed above.

The new package also installs an `amigolint` binary alias for existing local
scripts. The npm dependency and API import still use `lintamigo`; the old
`amigolint` npm package does not become the new package automatically.

## CI

GitHub Actions can emit annotations directly on changed instruction files:

```yaml
name: Lint agent instructions
on: [push, pull_request]

permissions:
  contents: read

jobs:
  lintamigo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npx --yes lintamigo@0.1.1 --format github
```

For [pre-commit](https://pre-commit.com/), install `lintamigo` as a dev dependency
and add:

```yaml
repos:
  - repo: local
    hooks:
      - id: lintamigo
        name: lintAmigo
        entry: npx --no-install lintamigo
        language: system
        pass_filenames: false
```

JSON, SARIF 2.1.0, and GitHub workflow-command formats are also available with
`--format json|sarif|github`.

## Programmatic API

Editors and other tools can use the same pipeline as the CLI:

```ts
import { lint } from 'lintamigo';

const report = await lint({
  root: process.cwd(),
  paths: ['AGENTS.md'],
  ruleIds: ['stale-path'],
});

for (const finding of report.findings) {
  console.log(finding.code, finding.file, finding.line, finding.message);
}
```

`lint()` returns the JSON report shape: discovered files and token estimates,
sorted findings, and error, warning, info, and suppression totals.

## Repository study

The [saved study snapshot](study/RESULTS.md) contains automated findings from
100 selected public GitHub repositories. These findings have no recorded
manual validation and do not establish how many repositories have confirmed
defects. Read the [sampling and methodology notes](study/METHODOLOGY.md) before
using the numbers; the study runner resumes saved results rather than
reproducing that historical scan.

## Roadmap

- **v0.2:** safe fixes for dead links and uniquely suggested stale paths, an
  exact optional tokenizer, and `--watch`
- **v0.3:** optional bring-your-own-key `--ai` explanations for contradictions
  and vagueness, plus a VS Code extension using the programmatic API
- **v0.4:** agent-specific rule packs, including Claude `@import` structure

## Contributing

Issues and focused pull requests are welcome. Read
[CONTRIBUTING.md](CONTRIBUTING.md) for the test-first rule workflow and run
`pnpm lint`, `pnpm test`, and `pnpm build` before submitting a change. Community
participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md).

If lintAmigo helps you maintain your agent instructions, a GitHub star is
welcome. Found a useful catch or a false positive? Share a small,
credential-free example in an [issue](https://github.com/Amerigo2020/lintamigo/issues).

lintAmigo is available under the [MIT License](LICENSE).

---

**Amigo tools** — small, focused tools for reliable AI-assisted development.
