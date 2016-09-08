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
`--input, -i file.geojson` input file, if not specified stdin will be used
`--output, -o file.svg` output file, if not specified, stdout will be used
`--extent, -e [xmin, ymin, xmax, ymax]` optional, forced canvas bounds
`--styles, -s styles.json` optional, styles file, check out default_styles file
`--fonts, -f fonts.json` optional, font measurement file
`--type, -t <String>` optional, properties field to select stylesheet by
