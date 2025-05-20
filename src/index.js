import { graphemeSegments, GraphemeCategory } from 'unicode-segmenter/grapheme';
import { isBMP } from 'unicode-segmenter/utils';

import { ansiState } from './ansi.res.js';

const fullwidthPattern = /[\uFF01-\uFF60\u30A0-\u30FF\u3040-\u309F\u4E00-\u9FFF\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/;

export default function stringWidth(string, options = {}) {
  if (typeof string !== 'string' || string.length === 0) {
    return 0;
  }

  let {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false,
  } = options;

  let width = 0;
  let state = 0;

  let segments = graphemeSegments(string);
  for (let { segment, _hd: cp, _catBegin: cat } of segments) {
    if (cat === GraphemeCategory.Control) {
      state = ansiState(state, segment);
      continue;
    } else if (cat === GraphemeCategory.Extend || cat === GraphemeCategory.ZWJ) {
      continue;
    } else if (cat === GraphemeCategory.Extended_Pictographic) {
      if (segment.length === 1 && ambiguousIsNarrow) {
        width += 1;
      } else {
        width += 2;
      }
    } else if (cat === GraphemeCategory.Regional_Indicator) {
      width += 2;
    } else if (!(countAnsiEscapeCodes || state === 0 || state === 4)) {
      continue;
    } else {
      if (!isBMP(cp)) {
        width += 2;
      } else if (fullwidthPattern.test(segment)) {
        width += 2;
      } else {
        state = ansiState(state, segment);
        width += 1;
      }
    }
  }
  return width;
}
