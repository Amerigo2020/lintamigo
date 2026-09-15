# lintAmigo launch demo

A short, recorded terminal demonstration of a stale command in `AGENTS.md`, a
manual correction, and a clean second run. This is a **deliberately constructed
minimal reproduction**, not an audit of a real project. The recording labels it
as such. No private repository content is included.

- [MP4](lintamigo-launch.mp4) for a launch post
- [GIF](lintamigo-launch.gif) for the README or a preview
- [Before output](before.txt), [after output](after.txt), and
  [verification evidence](evidence.json)

The instruction says to run `pnpm test:e2e`, while the example package defines
only `e2e`. The first full scan finds one `stale-script` error. The visible `sed`
command changes the instruction to `pnpm e2e`; the second full scan has no
findings. The correction is manual; lintAmigo does not rewrite the file.

## Reproduce

Prerequisites: the repository's pinned pnpm, Node, VHS (including its terminal
recording dependencies), FFmpeg, and the Menlo font for the same appearance.

From the repository root:

```sh
pnpm build
node demo/launch/render.mjs
```

The runner copies `instructions.before.txt` and `package.input.json` into an
isolated temporary directory. It verifies the real built CLI's JSON reports and
exit codes before and after the exact correction shown in the recording, saves
its plain-text output and CLI SHA-256, then records the interaction using
`demo.tape`. It checks the final recorded file and requires a video duration of
20–30 seconds. The temporary project is removed afterward.

During recording, `npx lintamigo` resolves a local symlink to the freshly built
CLI. This demonstrates the command and its actual output; it does not measure
npm download or cold-start time. No package is published and no application
tests are executed by this demo. FFmpeg exports H.264/YUV420p MP4 with fast-start
metadata and an eight-frame-per-second GIF.
