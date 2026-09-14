# LinkedIn launch draft

Status: ready for review; not posted.
Attach the MP4 linked from [the launch demo](../demo/launch/README.md).
The video is a controlled reproduction with real CLI output.

## Post

Im Code wird ein Test-Script umbenannt. In der CLAUDE.md steht noch der alte
Befehl. Der Coding-Agent bekommt also eine Anleitung, die nicht mehr zum
Projekt passt.

Für solche Fälle habe ich amigolint gebaut.

Das kleine Open-Source-Tool prüft CLAUDE.md, AGENTS.md, Cursor-Regeln und
Copilot-Anweisungen gegen das Repository: Existieren die referenzierten
Dateien noch? Gibt es die angegebenen Scripts? Stehen möglicherweise
Zugangsdaten in einer Anweisung?

Es läuft lokal, ohne LLM oder API-Key. Zum Ausprobieren im eigenen
Projektordner:

`npx amigolint`

Im Video zeige ich an einem kleinen Beispiel einen veralteten Befehl, die
Meldung und die anschließende Korrektur. Der Code ist unter MIT-Lizenz
verfügbar und lässt sich auch in GitHub Actions einsetzen.

Ich suche erste Rückmeldungen von Leuten, die solche Anleitungsdateien
bereits nutzen: Welche Meldung hilft euch, und wo liegt das Tool daneben?
Für einen Fehlerbericht reichen die betroffene Regel und ein kleines
Beispiel ohne Zugangsdaten oder interne Projektinhalte.

https://github.com/Amerigo2020/amigolint

Wenn es euch hilft, freue ich mich über einen Star.

## Before posting

- Publish the reviewed repository changes first, so cloning the repo includes
  the corrected default configuration and qualified study documentation.
- Attach the recorded demo, not the deliberately noisy all-rules example.
- Keep this description of the video as a small example; do not describe it
  as a finding in a third-party production repository.
- Post from Amerigo's own profile and respond personally to questions.
