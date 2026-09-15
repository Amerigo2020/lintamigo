import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { lint } from '../src/index.js';
import { parseDoc } from '../src/parse.js';
import type { Finding } from '../src/rules/types.js';
import { applySuppressions } from '../src/suppress.js';

const fixtureDir = fileURLToPath(
  new URL('./fixtures/suppression/', import.meta.url),
);
const fixtureRepo = path.join(fixtureDir, 'repo');
const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe('inline suppression', () => {
  it('supports next-line, block, enable, and file-level directives', async () => {
    const repoRoot = await mkdtemp(path.join(tmpdir(), 'amigolint-suppress-'));
    temporaryDirectories.push(repoRoot);
    await cp(fixtureRepo, repoRoot, { recursive: true });
    await mkdir(path.join(repoRoot, '.git'), { recursive: true });
    const expected = JSON.parse(
      await readFile(path.join(fixtureDir, 'expected.json'), 'utf8'),
    ) as Array<Record<string, unknown>>;
    const report = await lint({
      root: repoRoot,
      ruleIds: ['stale-path', 'dead-link'],
    });

    expect(
      report.findings.map(({ file, line, rule }) => ({ file, line, rule })),
    ).toEqual(expected);
    expect(report.summary).toEqual({
      errors: 2,
      warnings: 1,
      infos: 0,
      suppressed: 5,
    });
  });

  it('combines next-line directives from both names across blank lines', () => {
    const doc = parseDoc(
      'AGENTS.md',
      [
        '<!-- lintamigo-disable-next-line AL001 -->',
        '',
        '<!-- amigolint-disable-next-line dead-link -->',
        '',
        'Use `missing/file.ts` and [guide](missing/guide.md).',
        'Use `missing/still-visible.ts`.',
      ].join('\n'),
    );
    const findings: Finding[] = [
      findingFor(doc.path, 5),
      {
        ...findingFor(doc.path, 5),
        rule: 'dead-link',
        code: 'AL006',
        severity: 'warn',
      },
      findingFor(doc.path, 6),
    ];

    expect(applySuppressions(findings, [doc])).toEqual({
      findings: [findings[2]],
      suppressed: 2,
    });
  });

  it('lets either alias enable a block disabled by the other alias', () => {
    const doc = parseDoc(
      'AGENTS.md',
      [
        '<!-- lintamigo-disable stale-path -->',
        'Use `missing/suppressed.ts`.',
        '<!-- amigolint-enable -->',
        'Use `missing/visible.ts`.',
        '<!-- amigolint-disable stale-path -->',
        'Use `missing/also-suppressed.ts`.',
        '<!-- lintamigo-enable -->',
        'Use `missing/also-visible.ts`.',
      ].join('\n'),
    );
    const findings = [2, 4, 6, 8].map((line) => findingFor(doc.path, line));

    expect(applySuppressions(findings, [doc])).toEqual({
      findings: [findings[1], findings[3]],
      suppressed: 2,
    });
  });

  it.each([
    'amigolint',
    'lintamigo',
  ])('ignores literal %s directives and allows file-level suppression after frontmatter', (prefix) => {
    const codeDoc = parseDoc(
      'AGENTS.md',
      [
        '```md',
        `<!-- ${prefix}-disable stale-path -->`,
        '```',
        'Use `missing/visible.ts`.',
      ].join('\n'),
    );
    const frontmatterDoc = parseDoc(
      '.cursor/rules/example.mdc',
      [
        '---',
        'alwaysApply: true',
        '---',
        `<!-- ${prefix}-disable-file -->`,
        'Use `missing/suppressed.ts`.',
      ].join('\n'),
    );
    const inlineCodeDoc = parseDoc(
      'CLAUDE.md',
      [
        `\`<!-- ${prefix}-disable stale-path -->\``,
        'Use `missing/also-visible.ts`.',
      ].join('\n'),
    );
    const nextLineLiteralDoc = parseDoc(
      'nested/AGENTS.md',
      [
        `<!-- ${prefix}-disable-next-line stale-path -->`,
        `\`<!-- ${prefix}-disable stale-path -->\``,
        'Use `missing/still-visible.ts`.',
      ].join('\n'),
    );
    const findings: Finding[] = [
      findingFor(codeDoc.path, 4),
      findingFor(frontmatterDoc.path, 5),
      findingFor(inlineCodeDoc.path, 2),
      findingFor(nextLineLiteralDoc.path, 3),
    ];

    expect(
      applySuppressions(findings, [
        codeDoc,
        frontmatterDoc,
        inlineCodeDoc,
        nextLineLiteralDoc,
      ]),
    ).toEqual({
      findings: [findings[0], findings[2], findings[3]],
      suppressed: 1,
    });
  });
});

function findingFor(file: string, line: number): Finding {
  return {
    rule: 'stale-path',
    code: 'AL001',
    severity: 'error',
    file,
    line,
    message: '`missing/file.ts` does not exist',
  };
}
