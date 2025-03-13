import test from 'node:test';
import assert from 'node:assert/strict';
import stringWidth from './src/index.js';

test('main', () => {
  assert.strictEqual(stringWidth('⛣', { ambiguousIsNarrow: false }), 2);
  assert.strictEqual(stringWidth('abcde'), 5);
  assert.strictEqual(stringWidth('古池や'), 6);
  assert.strictEqual(stringWidth('あいうabc'), 9);
  assert.strictEqual(stringWidth('あいう★'), 7);
  assert.strictEqual(stringWidth('あいう★', { ambiguousIsNarrow: false }), 8);
  assert.strictEqual(stringWidth('±'), 1);
  assert.strictEqual(stringWidth('ノード.js'), 9);
  assert.strictEqual(stringWidth('你好'), 4);
  assert.strictEqual(stringWidth('안녕하세요'), 10);
  assert.strictEqual(stringWidth('A\uD83C\uDE00BC'), 5);
  assert.strictEqual(stringWidth('\u001B[31m\u001B[39m'), 0);
  assert.strictEqual(stringWidth('\u001B[31m\u001B[39m', { countAnsiEscapeCodes: true }), 8);
  assert.strictEqual(stringWidth('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007'), 5);
});

test('ignores control characters', () => {
  assert.strictEqual(stringWidth(String.fromCodePoint(0)), 0);
  assert.strictEqual(stringWidth(String.fromCodePoint(31)), 0);
  assert.strictEqual(stringWidth(String.fromCodePoint(127)), 0);
  assert.strictEqual(stringWidth(String.fromCodePoint(134)), 0);
  assert.strictEqual(stringWidth(String.fromCodePoint(159)), 0);
  assert.strictEqual(stringWidth('\u001B'), 0);
});

test('handles combining characters', () => {
  assert.strictEqual(stringWidth('x\u0300'), 1);
  assert.strictEqual(stringWidth('\u0300\u0301'), 0);
  assert.strictEqual(stringWidth('e\u0301e'), 2);
  assert.strictEqual(stringWidth('x\u036F'), 1);
  assert.strictEqual(stringWidth('\u036F\u036F'), 0);
});

test('handles ZWJ characters', () => {
  assert.strictEqual(stringWidth('👶'), 2);
  assert.strictEqual(stringWidth('👶🏽'), 2);
  assert.strictEqual(stringWidth('👩‍👩‍👦‍👦'), 2);
  assert.strictEqual(stringWidth('👨‍❤️‍💋‍👨'), 2);
});

test('handles zero-width characters', () => {
  assert.strictEqual(stringWidth('\u200B'), 0);
  assert.strictEqual(stringWidth('x\u200Bx'), 2);
  assert.strictEqual(stringWidth('\u200C'), 0);
  assert.strictEqual(stringWidth('x\u200Cx'), 2);
  assert.strictEqual(stringWidth('\u200D'), 0);
  assert.strictEqual(stringWidth('x\u200Dx'), 2);
});

test('handles surrogate pairs', () => {
  assert.strictEqual(stringWidth('\uD83D\uDE00'), 2);
  assert.strictEqual(stringWidth('A\uD83D\uDE00B'), 4);
});

test('handles edge cases', () => {
  assert.strictEqual(stringWidth(''), 0);
  assert.strictEqual(stringWidth('\u200B\u200B'), 0);
  assert.strictEqual(stringWidth('x\u200Bx\u200B'), 2);
  assert.strictEqual(stringWidth('x\u0300x\u0300'), 2);
  assert.strictEqual(stringWidth('\uD83D\uDE00\uFE0F'), 2);
  assert.strictEqual(stringWidth('\uD83D\uDC69\u200D\uD83C\uDF93'), 2);
});

test('ignores default ignorable code points', () => {
  assert.strictEqual(stringWidth('\u2060'), 0);
  assert.strictEqual(stringWidth('\u2061'), 0);
  assert.strictEqual(stringWidth('\u2062'), 0);
  assert.strictEqual(stringWidth('\u2063'), 0);
  assert.strictEqual(stringWidth('\u2064'), 0);
});
