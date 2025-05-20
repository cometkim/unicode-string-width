import {
  group,
  summary,
  barplot,
  bench,
  run,
  do_not_optimize,
} from 'mitata';

import stringWidth from 'string-width';
import fastStringWidth from 'fast-string-width';
import unicodeStringWidth from './src/index.js';

let testcases = [
  [
    'Basic alphabets',
    'abcdefg',
  ],
  [
    'Full-width and half-width',
    'あいう★ 안녕하세요.',
  ],
  [
    'ANSI control sequences',
    '\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007',
  ],
];

for (const [title, input] of testcases) {
  group(title, () => {
    summary(() => {
      barplot(() => {
        bench('unicode-string-width', () => {
          do_not_optimize(unicodeStringWidth(input));
        }).baseline(true);

        bench('string-width', () => {
          do_not_optimize(stringWidth(input));
        });

        bench('fast-string-width', () => {
          do_not_optimize(fastStringWidth(input));
        });
      });
    });
  });
}

run();
