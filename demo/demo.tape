Output demo/demo.gif

Require npx
Set Shell "bash"
Set FontSize 16
Set Width 1600
Set Height 1000
Set Theme "Catppuccin Mocha"
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
Type "npx lintamigo" Sleep 500ms Enter
Wait+Screen /tokens across agent instructions/
Sleep 4s
Type "npx lintamigo stats" Sleep 500ms Enter
Wait+Screen /Always loaded:/
Sleep 3s
