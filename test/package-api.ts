import { type LintOptions, lint, type Report } from 'lintamigo';

const lintFunction: (options: LintOptions) => Promise<Report> = lint;
void lintFunction;
