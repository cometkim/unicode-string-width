# string-width

> [!WARNING]
>
> This is only for demo purposes, not a published package.

This is a demo replacement for [string-width] using [unicode-segmenter/grapheme].

## Comment on `string-width`

If you rely on `string-width`, I strongly recommend reevaluating its behavior.

- If the limitation comes from a storage or transport system, you should measure based on byte size.
- If the limitation comes from a display system, you should measure based on visual segments (graphemes).

The `string-width` library conflates these concepts due to incorrect assumptions about system constraints. As a result, any code that depends on `string-width` inherits its inconsistencies.

Instead, consider using a Unicode-aware alternative such as `Intl.Segmenter` or `unicode-segmenter/grapheme`.

## LICENSE

MIT

[string-width]: https://github.com/sindresorhus/string-width
[unicode-segmenter/grapheme]: https://github.com/cometkim/unicode-segmenter
