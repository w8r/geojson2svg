# geojson2svg

Render geojson into SVG using inline or external stylesheet, in Node or in
the browser

**work in progress**

## Usage

### Browser

### Bin

```shell
geojson2svg --input input.geojson --styles styles.json > out.svg
# or
cat input.geojson | geojson2svg --styles styles.json > out.svg
```

**List of options:**

* `--input, -i file.geojson` input file, if not specified stdin will be used
* `--output, -o file.svg` output file, if not specified, stdout will be used
* `--extent, -e [xmin, ymin, xmax, ymax]` optional, forced canvas bounds
* `--styles, -s styles.json` optional, styles file, check out default_styles file
* `--fonts, -f fonts.json` optional, font measurement file
* `--type, -t <String>` optional, properties field to select stylesheet by

### Font measurement

To render text correctly, geojson2svg needs information about the glyph size:
average symbol width and line height. There is a script producing measurement
files for a given fontFamily. It uses headless browser to render the symbol sets
and calculate the values. Note that if further on `geojson2svg` will find the
matching `font-family` but not the size, it will try and interpolate the values.

```shell
measure-font --font '\"Times New Roman\", Georgia, serif' --sizes [3, 5, 8, 12] > fonts.json
```

* `--fontFamily, -f <String>` Font family
* `--sizes, -s [8, 10, 12, ...]` font sizes to measure glyphs for

The result file can be passed to the geojson2svg through the `fonts` option. You
might also want to check out included measurement files in `fonts/` dir.

## License

MIT License
Copyright (c) 2016 Alexander Milevski
