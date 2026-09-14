# First-user feedback

Use this after someone agrees to try amigolint. It is not a request to upload
their repository or complete instruction files.

## A small trial

From a project that already has agent instructions:

```sh
npx --yes amigolint@0.1.0 --version
npx --yes amigolint@0.1.0
```

Exit code 1 means the tool found error-level findings. Exit code 2 means a
configuration or runtime problem. Review findings before changing anything.

## Useful feedback

- Agent/file format used and operating system/Node.js version
- One rule code and finding that was useful, if any
- One false positive, if any, with a minimal sanitized reproduction
- Whether adding the check to CI would be useful

Do not request full repositories, unredacted output, private paths or tokens.
Use the existing [bug report form](https://github.com/Amerigo2020/amigolint/issues/new/choose)
for a reproducible issue; an agreed conversation is also fine.

## First-week measures

Track these as observations, not promises or a star forecast:

| Measure | Starting target | Observed |
| --- | --- | --- |
| People who chose to try the tool | 10 | Not collected |
| Specific useful/false-positive reports | 3 | Not collected |
| Repositories that adopt it in CI | 1 | Not collected |
| GitHub stars | Observe actual count | Not collected |

Distinguish an invitation sent, a reply received, a command tried, and an
actual CI adoption. Public clone/download counts can include automation.
