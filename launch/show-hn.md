# Show HN preparation

Status: facts and submission checklist only; not submitted.

The [HN guidelines](https://news.ycombinator.com/newsguidelines.html) say:
"Don't post generated text or AI-edited text."
Write the actual submission title and discussion in your own words. This
file is preparation, not a comment to copy into HN.

## Submission facts

- Project: amigolint, MIT-licensed TypeScript CLI.
- Submit the repository URL: https://github.com/Amerigo2020/amigolint
- Start the title with `Show HN:` and describe what can be tried.
- Try it from a project directory: `npx amigolint` (Node.js 20 or newer).
- No signup, LLM call or API key is required by the linter.
- Checks instruction files against real repository paths and commands.
- Supports CLAUDE.md, AGENTS.md, Cursor rules and Copilot instructions,
  with further formats listed in the README.
- Fifteen rules, GitHub annotations, JSON and SARIF output, and a public API.
- Findings and suggestions are advisory; v0.1.0 does not automatically edit
  instruction files.
- Contradiction detection and token counts use heuristics. A secret-shaped
  match is not proof that a live credential was exposed.
- The launch video is a controlled reproduction using actual CLI output.

## Questions to answer personally

1. What happened in your own workflow that made you build this?
2. Which specific repository checks are most useful to you?
3. How do you manage false positives and intentional examples?
4. What did you learn from the first release and running it on its own repo?
5. What feedback would change your next implementation decision?

## Boundaries of the study

Do not lead with the 73% figure. It counts automated error-level findings in
a saved sample, not confirmed defects or a representative failure rate.
See [methodology](../study/METHODOLOGY.md). The sample did not preserve commit
SHAs, a linter version, or per-finding manual validation.

## Submission checklist

- The reviewed source changes are on GitHub and CI is green for that commit.
- The command installs and works from a separate project, without cloning
  amigolint itself.
- You can stay in the discussion and explain the implementation yourself.
- Use your own text; do not coordinate upvotes or comments.
- Submit once and respond to substantive questions and bug reports.

Sources checked 2026-09-15:
[Show HN guidelines](https://news.ycombinator.com/showhn.html) and
[HN guidelines](https://news.ycombinator.com/newsguidelines.html).
