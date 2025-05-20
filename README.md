# unicode-string-width

> [!WARNING]
>
> This is only for demo purposes, not a published package.

This is a demo replacement for [string-width] using [unicode-segmenter/grapheme].

This actually performs better than other libraries, especially on the non-alphabet characters.

## Comment on `string-width`

`string-width` is basically for the TTY environment, not general purposes.

It is implemented in a "best-effort" manner to support the widest possible range of terminal environments or typography system. It is very heuristic and there is no well-defined resolution.

If you rely on `string-width` for some other purposes, I strongly recommend reevaluating its behavior.

- If it is about a storage or transport system, you should measure it based on the byte size.
- If it is about a display system, you should measure it based on the visual segments (aka graphemes).

Consider using a Unicode-aware alternative such as `Intl.Segmenter` or `unicode-segmenter/grapheme`.

## LICENSE

MIT

[string-width]: https://github.com/sindresorhus/string-width
[unicode-segmenter/grapheme]: https://github.com/cometkim/unicode-segmenter
