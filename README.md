# geojson2svg

Render geojson into SVG using inline or external stylesheet, in Node or in the browser

## Usage

via npm
```shell
npm install geojson-to-svg -S
```
CommonJS
```js
// ES5
var geojson2svg = require('geojson-to-svg'); // factory
// if you want to re-use the renderer
var Renderer    = geojson2svg.Renderer;

// ES6
import geojson2svg, { Renderer } from 'geojson-to-svg';
```

## API

<a href="#constructor" name="constructor">#</a> new geojson2svg.**Renderer(** gj, styles, extent, projection, type, fonts, transform**)**

<a href="#factory" name="factory">#</a> **geojson2svg(** gj, styles, extent, projection, type, fonts, transform **)**

 Constructor and factory. You may pass all the settings in one go to the renderer, but it's rather convenient to use the settings API:

<a href="#data" name="data">#</a> geojson2svg()**.data(** FeatureCollection|Feature **)**

 Stores the data for rendering, it will also be projected right away if you specified the projection function before calling this method.

<a href="#styles" name="styles">#</a> geojson2svg()**.styles(** Object | Function **)**

 Styles hashmap, you can define your own types, the type will be selected from feature properties. Also a function can be passed, which would provide styling based on the feature. The signature is `style (feature, canvasBBox, featureBBox) -> Object`

 ```js
 geojson2svg()
   .styles({ 'YourType' : { fill: 'blue', stroke: 'red' } })
   .data({ type: 'Feature', properties: { type: 'YourType' }})
   .render();
 ```

 <a href="#type" name="type">#</a> geojson2svg()**.type(** String **)**

  Which field in the feature properties should be used to select the style for the feature from the stylesheet.

  ```js
  geojson2svg()
    .type('myField')
    .styles({ 'YourType' : { fill: 'blue', stroke: 'red' } })
    .data({ type: 'Feature', properties: { myField: 'YourType' }})
    .render();
  ```

 <a href="#render" name="render">#</a> geojson**.render(** data(optional) **)**

 Main rendering pipe, returns SVG string.

 <a href="#fonts" name="fonts">#</a> geojson2svg()**.fonts(**fonts: Array | Object **)**

  Fonts measurements required for correct text and multi-line text rendering. Must be in the same format that the CLI script provides, see [font measurement](#font-measurement). You can provide several measurement data objects at once in an array.

  ```js
  geojson2svg()
    .fonts({
      name: '\"Custom font\", Standard-font, serif',
      values : [{
        "avg": 1.5294730846698468,
        "height": 3.5390625,
        "size": 3
      }]
    })
    .render({
      type: 'Feature',
      properties: {
        type: 'textbox',
        fontFamily: '\"Custom font\", Standard-font, serif',
        fontSize: 3
        ...
      }
    })
  ```

 <a href="#extent" name="extent">#</a> geojson2svg()**.extent(** [xMin, yMin, xMax, yMax] **)**

 Forced canvas extent, e.g. SVG `viewBox`





### CLI

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

### <a name="font-measurement">Font measurement</a>

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
