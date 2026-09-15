# Render through `node demo/launch/render.mjs` from the repository root.
# The runner substitutes the output path and supplies a temporary demo project.
Output launch.raw.mp4

Require npx
Require sed
Set Shell "bash"
Set FontFamily "Menlo"
Set FontSize 24
Set Width 1360
Set Height 768
Set Padding 28
Set LineHeight 1.1
Set Theme "Catppuccin Mocha"
Set WindowBar Colorful
Set Framerate 30
Set TypingSpeed 25ms
Env NPM_CONFIG_LOGLEVEL "error"
Env NPM_CONFIG_UPDATE_NOTIFIER "false"
Env NPM_CONFIG_PROGRESS "false"
Env TERM "xterm-256color"
Env NO_COLOR ""
Env FORCE_COLOR "1"

Hide
Type "export PS1='$ '"
Enter
Ctrl+L
Show
Sleep 500ms

Type "# lintAmigo: a renamed test script (minimal reproduction)"
Enter
Sleep 500ms
Type "cat AGENTS.md"
Enter
Sleep 1600ms
Type "cat package.json"
Enter
Sleep 1600ms

Type "npx lintamigo"
Enter
Wait+Screen /1 error, 0 warnings, 0 infos/
Sleep 5s

Type "sed -i.bak 's/test:e2e/e2e/' AGENTS.md"
Enter
Sleep 1s
Type "cat AGENTS.md"
Enter
Sleep 1500ms
Type "npx lintamigo"
Enter
Wait+Screen /0 errors, 0 warnings, 0 infos/
Sleep 6s
