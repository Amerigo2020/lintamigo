import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const launchRoot = fileURLToPath(new URL('./', import.meta.url));
const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));
const cliPath = path.join(repositoryRoot, 'dist', 'cli.mjs');
const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'amigolint-launch-'));
const before = await readFile(
  path.join(launchRoot, 'instructions.before.txt'),
  'utf8',
);
const after = before.replace('test:e2e', 'e2e');

try {
  const packageInput = JSON.parse(
    await readFile(path.join(launchRoot, 'package.input.json'), 'utf8'),
  );
  await writeFile(
    path.join(temporaryRoot, 'package.json'),
    `${JSON.stringify(packageInput)}\n`,
  );
  await writeFile(path.join(temporaryRoot, 'AGENTS.md'), before);
  const beforeRun = lintReport();
  assert.equal(beforeRun.status, 1);
  assert.deepEqual(beforeRun.report.summary, {
    errors: 1,
    warnings: 0,
    infos: 0,
    suppressed: 0,
  });
  assert.equal(beforeRun.report.findings[0].rule, 'stale-script');
  assert.equal(
    beforeRun.report.findings[0].message,
    '`test:e2e` script does not exist',
  );
  const beforeText = lintText(1);

  // Apply the exact manual replacement shown in the recording.
  run('sed', ['-i.bak', 's/test:e2e/e2e/', 'AGENTS.md']);
  assert.equal(
    await readFile(path.join(temporaryRoot, 'AGENTS.md'), 'utf8'),
    after,
  );
  const afterRun = lintReport();
  assert.equal(afterRun.status, 0);
  assert.deepEqual(afterRun.report.findings, []);
  const afterText = lintText(0);

  const evidence = {
    provenance:
      'Deliberately constructed minimal reproduction, not a repo audit',
    version: beforeRun.report.version,
    cliSha256: createHash('sha256')
      .update(await readFile(cliPath))
      .digest('hex'),
    before: beforeRun,
    after: afterRun,
  };
  await writeFile(
    path.join(launchRoot, 'evidence.json'),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  await writeFile(path.join(launchRoot, 'before.txt'), beforeText);
  await writeFile(path.join(launchRoot, 'after.txt'), afterText);

  // Record the same real CLI in an isolated project; npx resolves this local bin.
  await writeFile(path.join(temporaryRoot, 'AGENTS.md'), before);
  const binDirectory = path.join(temporaryRoot, 'node_modules', '.bin');
  await mkdir(binDirectory, { recursive: true });
  await symlink(cliPath, path.join(binDirectory, 'amigolint'));
  const rawVideo = path.join(temporaryRoot, 'launch.raw.mp4');
  const sourceTape = await readFile(path.join(launchRoot, 'demo.tape'), 'utf8');
  const tapePath = path.join(temporaryRoot, 'demo.tape');
  await writeFile(
    tapePath,
    sourceTape.replace(
      /^Output launch\.raw\.mp4$/m,
      `Output ${JSON.stringify(rawVideo)}`,
    ),
  );
  run('vhs', [tapePath], { stdio: 'inherit' });
  assert.equal(
    await readFile(path.join(temporaryRoot, 'AGENTS.md'), 'utf8'),
    after,
  );
  assert.equal(lintReport().status, 0);

  const videoPath = path.join(launchRoot, 'amigolint-launch.mp4');
  run('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    rawVideo,
    '-c:v',
    'libx264',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-an',
    videoPath,
  ]);
  run('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    videoPath,
    '-vf',
    'fps=8,scale=1088:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer:bayer_scale=4',
    '-loop',
    '0',
    path.join(launchRoot, 'amigolint-launch.gif'),
  ]);
  const duration = Number(
    run('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      videoPath,
    ]).stdout.trim(),
  );
  assert(duration >= 20 && duration <= 30, `Unexpected duration: ${duration}s`);
  process.stdout.write(
    `Verified and recorded demo: ${duration.toFixed(1)} seconds\n`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

function lintReport() {
  const result = run(
    process.execPath,
    [cliPath, '--format', 'json', '--no-color'],
    {
      allowedStatuses: [0, 1],
    },
  );
  const report = JSON.parse(result.stdout);
  report.root = '<temporary-demo-project>';
  return { status: result.status, report };
}

function lintText(status) {
  return run(process.execPath, [cliPath, '--no-color'], {
    allowedStatuses: [status],
  }).stdout;
}

function run(command, args, options = {}) {
  const { allowedStatuses = [0], stdio = 'pipe' } = options;
  const result = spawnSync(command, args, {
    cwd: temporaryRoot,
    encoding: 'utf8',
    stdio,
    env: process.env,
  });
  if (result.error) throw result.error;
  if (!allowedStatuses.includes(result.status)) {
    throw new Error(
      `${command} exited ${result.status}: ${result.stderr ?? ''}`,
    );
  }
  return result;
}
