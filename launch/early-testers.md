# Early tester shortlist

Prepared 2026-09-15. **Research and unsent drafts only.** These public repository owners have not agreed to test amigolint. The fit assessment comes from reading their instruction files, not from running amigolint against their projects or confirming defects.

Start with **@yicheng47**, **@VictorTomaili**, and **@anmoln7**: they cover a real application, instruction synchronization, and an existing documentation gate. The goal is useful feedback, including false positives; a response or star is not assumed.

For every candidate, the channel is **only an existing relevant conversation or an explicit invitation**. No posting destination has been selected or cleared. Check that destination's current contribution/community rules before posting. Do not open a promotional issue, PR, or unsolicited DM. The source links below establish technical fit, not permission to advertise.

GitHub repository metadata, the default-branch `AGENTS.md`, and its latest commit were checked on 2026-09-15. Instruction links are pinned to that file's last-changing commit. “Last push” is the repository timestamp observed during research; it is not proof the owner is available today. All ten repositories were unarchived.

## 1. @yicheng47 — Runner — first priority

[Repository](https://github.com/yicheng47/runner) · [Instruction evidence](https://github.com/yicheng47/runner/blob/e37e7f7fabf07e027e9c2c30c8e84927601c584a/AGENTS.md) · Last push: 2026-09-14

The agent guide maps Rust crates and documentation directories and lists Make validation commands. This is a concrete application repository with the kinds of path and command references amigolint checks.

**Draft:** “How do you keep Runner's crate map and Make commands in AGENTS.md aligned as the app changes? I'm Amerigo, and I built [amigolint](https://github.com/Amerigo2020/amigolint) to check instruction files locally. Would you try `npx amigolint` from your Runner checkout and tell me whether its findings are useful or false positives? I'd especially value feedback on the Rust/Make setup.”

## 2. @VictorTomaili — agent-cli — first priority

[Repository](https://github.com/VictorTomaili/agent-cli) · [Instruction evidence](https://github.com/VictorTomaili/agent-cli/blob/c1fd09844f3673b1613b497cf601671d3769176a/AGENTS.md) · Last push: 2026-09-10

The project synchronizes agent instructions across tools. Its own guide distinguishes published-package commands from checkout commands and explicitly describes local-only, ignored documentation—useful cases for judging false positives.

**Draft:** “When agent-cli synchronizes instructions, how do you check that the referenced commands and paths still make sense in the destination? I'm Amerigo, the author of [amigolint](https://github.com/Amerigo2020/amigolint). Would you run `npx amigolint` in your own checkout and share useful findings or false positives? Your distinction between installed-package docs and local-only files would be particularly helpful feedback.”

## 3. @anmoln7 — agent-standard-oss — first priority

[Repository](https://github.com/anmoln7/agent-standard-oss) · [Instruction evidence](https://github.com/anmoln7/agent-standard-oss/blob/978c8835ad5fa521f1b522baa61727f3ae4ba28f/AGENTS.md) · Last push: 2026-09-12

Its own agent guide documents a single source of truth, shell validation, an example instruction file, and `doc-gate-check`. This owner already addresses instruction drift and can assess overlap or missing value.

**Draft:** “Does your existing doc gate cover the drift cases you actually encounter, or are there checks you'd still want? I'm Amerigo; I built [amigolint](https://github.com/Amerigo2020/amigolint), a local instruction-file linter. If you're interested, could you try `npx amigolint` in agent-standard-oss and tell me whether it adds anything useful or mostly overlaps? False positives around your examples would also help.”

## 4. @mertkayacs — ReevesAgents

[Repository](https://github.com/mertkayacs/reevesagents) · [Instruction evidence](https://github.com/mertkayacs/reevesagents/blob/6ada8fa07c0793321e98c754f2e9ba10a4c1c58b/AGENTS.md) · Last push: 2026-09-14

AGENTS.md is an operator guide for an agent-orchestration CLI, with command examples, local state paths, and links to translated guides. This differs from a conventional contributor guide and could expose noisy assumptions.

**Draft:** “Do you check ReevesAgents' operator AGENTS.md automatically when commands or documentation move? I'm Amerigo, and I built [amigolint](https://github.com/Amerigo2020/amigolint). Would you try `npx amigolint` in your checkout and tell me whether it produces useful findings or noise on a guide aimed at operating the tool? I'm particularly interested in that distinction from ordinary contributor instructions.”

## 5. @KbWen — agentic-os

[Repository](https://github.com/KbWen/agentic-os) · [Instruction evidence](https://github.com/KbWen/agentic-os/blob/818007e5f7193c163960353d5ef99f55c1211913/AGENTS.md) · Last push: 2026-09-14

The root instructions refer to engineering/security rules, workflow files, generated context, and evidence gates. That mix makes path checks and heuristic precision relevant without implying any actual defect.

**Draft:** “How do you validate references between agentic-os's root instructions, rules, and workflow files as they evolve? I'm Amerigo, the author of [amigolint](https://github.com/Amerigo2020/amigolint). Would you try `npx amigolint` on your checkout and share useful findings or false positives? Your generated and conditional context paths would be a valuable reality check for the linter's assumptions.”

## 6. @Kulaxyz — self-learning-skills

[Repository](https://github.com/Kulaxyz/self-learning-skills) · [Instruction evidence](https://github.com/Kulaxyz/self-learning-skills/blob/14e90441f72df98d77412aada63b0ae0653b22cf/AGENTS.md) · Last push: 2026-09-14

The portable AGENTS.md describes recording verified procedures and links to Claude skills and a Cursor rule. This is a relevant perspective on checks applied to instructions that grow over time.

**Draft:** “Once a learned procedure is saved, how do you notice when its paths or commands become outdated? I'm Amerigo; I built [amigolint](https://github.com/Amerigo2020/amigolint) to check agent instruction files locally. Would you try `npx amigolint` in self-learning-skills and tell me which findings help and which are false positives? I'm curious whether linting fits your procedure-capture workflow.”

## 7. @sohaibt — product-mode

[Repository](https://github.com/sohaibt/product-mode) · [Instruction evidence](https://github.com/sohaibt/product-mode/blob/1975fd979b5cf1648c683096e5e51a912e387617/AGENTS.md) · Last push: 2026-09-14

The instructions focus on product decisions, scope, assumptions, and outcomes. A prose-heavy guide is useful for evaluating whether optional vagueness and contradiction hints are meaningful or distracting.

**Draft:** “Would a linter's wording hints help a product-focused agent guide, or mostly get in the way? I'm Amerigo, and I built [amigolint](https://github.com/Amerigo2020/amigolint). If you're interested, could you try `npx amigolint` in product-mode and tell me which findings are useful or false positives? Your decision-focused instructions are a good test of where heuristic advice should stay quiet.”

## 8. @hexsprite — claude-agents-md

[Repository](https://github.com/hexsprite/claude-agents-md) · [Instruction evidence](https://github.com/hexsprite/claude-agents-md/blob/16f2e27031d6618321ae0fe3e9ed29ba1e18bb22/AGENTS.md) · Last push: 2026-07-15

The repository uses AGENTS.md as its source and describes generated, ignored CLAUDE.md plus hook and test paths. Good technical fit; recheck current activity before approaching.

**Draft:** “How should a linter treat an AGENTS.md source when CLAUDE.md is generated or virtualized by the loader? I'm Amerigo, the author of [amigolint](https://github.com/Amerigo2020/amigolint). Would you try `npx amigolint` in your plugin checkout and report useful findings or false positives? Your loading model would help me check that the tool's assumptions match real usage.”

## 9. @Pierry — harness-kit

[Repository](https://github.com/Pierry/harness-kit) · [Instruction evidence](https://github.com/Pierry/harness-kit/blob/da128bbb6cf6e145fb300f35a3036029f6c99026/AGENTS.md) · Last push: 2026-07-15

AGENTS.md is a registry connecting agent definitions, skills, commands, and generated runtime paths. The project combines deterministic gates and evals. Recheck current activity before approaching.

**Draft:** “How do you keep harness-kit's agent registry aligned with its skill, command, and runtime paths? I'm Amerigo; I built [amigolint](https://github.com/Amerigo2020/amigolint), a local instruction-file linter. Would you try `npx amigolint` from your checkout and tell me whether its findings are useful or false positives? Your split between checked-in definitions and generated runtime files is especially relevant.”

## 10. @shanirsh — prismodev

[Repository](https://github.com/shanirsh/prismodev) · [Instruction evidence](https://github.com/shanirsh/prismodev/blob/ee89d6637fbcab3cd489639d4eabca6063441548/AGENTS.md) · Last push: 2026-07-02

Its guide references generated context summaries and guardrails, keeps terminal output concise, and lists a validation command. This offers a context-management perspective. Recheck current activity before approaching; dated working agreements are not treated here as confirmed defects.

**Draft:** “Where do you draw the line between useful context checks and warnings about deliberately generated files? I'm Amerigo, and I built [amigolint](https://github.com/Amerigo2020/amigolint). If you're interested, could you try `npx amigolint` in prismodev and tell me which findings are useful or false positives? Your generated context summaries would be a helpful perspective on that boundary.”

## Record feedback

After someone opts in, record the tested amigolint version, their repository commit, the rule and finding they discuss, and their judgment: useful, false positive, or uncertain. Ask separately before quoting a person or publishing their result. Start with the three priority candidates; adapt later drafts to what the first conversations teach us.
