# GeoJSON2SVG [![npm version](https://badge.fury.io/js/geojson-to-svg.svg)](https://badge.fury.io/js/geojson-to-svg) [![CircleCI](https://circleci.com/gh/w8r/geojson2svg.svg?style=shield)](https://circleci.com/gh/w8r/geojson2svg)

Render geojson into SVG using inline or external stylesheet, in Node or in the browser

* [World countries in WGS, ~4Mb GeoJSON, randomized style, processed in 280ms, compressed with SVGO](https://w8r.github.io/geojson2svg/demo/lands.svg)
* [Example of non-cartographic `GeoJSON` rendered with the lib in 18ms](https://w8r.github.io/geojson2svg/demo/markup.svg) ([GeoJSON source](https://raw.githubusercontent.com/w8r/geojson2svg/master/test/fixtures/data.json))

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

Alternatively, you can use one of the pre-built versions from the `dist/` directory.

## API

<a href="#constructor" name="constructor">#</a> **new geojson2svg.Renderer(** gj, styles, extent, projection, type, fonts, transform**)**

<a href="#factory" name="factory">#</a> **geojson2svg(** gj, styles, extent, projection, type, fonts, transform **)**

 Constructor and factory. You may pass all the settings in one go to the renderer, but it's rather convenient to use the settings API:

<a href="#data" name="data">#</a> **geojson2svg().data(** FeatureCollection|Feature **)**

 Stores the data for rendering, it will also be projected right away if you specified the projection function before calling this method.

<a href="#styles" name="styles">#</a> **geojson2svg().styles(** Object | Function **)**

 Styles hashmap, you can define your own types, the type will be selected from feature properties. Also a function can be passed, which would provide styling based on the feature. The signature is `style (feature, canvasBBox, featureBBox) -> Object`

 ```js
 geojson2svg()
   .styles({ 'YourType' : { fill: 'blue', stroke: 'red' } })
   .data({ type: 'Feature', properties: { type: 'YourType' }})
   .render();
 ```

 <a href="#type" name="type">#</a> **geojson2svg().type(** String **)**

  Which field in the feature properties should be used to select the style for the feature from the stylesheet.

  ```js
  geojson2svg()
    .type('myField')
    .styles({ 'YourType' : { fill: 'blue', stroke: 'red' } })
    .data({ type: 'Feature', properties: { myField: 'YourType' }})
    .render();
  ```

 <a href="#render" name="render">#</a> **geojson.render(** GeoJSON(optional) **)**

 Main rendering pipe, returns SVG string.

 <a href="#fonts" name="fonts">#</a> **geojson2svg().fonts(** Array | Object **)**

  Fonts measurements required for correct text and multi-line text rendering.
  Must be in the same format that the CLI script provides, see
  [font measurement](#font-measurement). You can provide several measurement
  data objects at once in an array.

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

 <a href="#extent" name="extent">#</a> **geojson2svg().extent(** [xMin, yMin, xMax, yMax] **)**

 Forced canvas extent, e.g. SVG `viewBox`. It will overwrite what was calculated from the features coordinatesand styles.

 <a href="#decorator" name="decorator">#</a> **geojson2svg().decorator(** String, Function**)**

Registers a decorator for the special rendering of the `Polygon`/`LineString` path.
Basically it's a custom `<path>` renderer, it has to return a valid `SVG` path.

```js
geojson2svg()
  .decorator('YourType', function (feature, coordinates /* rings */, closed, bbox, fBounds) {
    var path = '';
    for (var i = 0, len = coords.length; i < len; i++) {
      // randomize coords a little bit
      var c = [coords[i][0] + Math.random(), coords[i][1] + Math.random()];
      path += (i === 0 ? 'M' : 'L') + c[0] + ' ' + c[1];

      // it's your responsibility to update the content bounds if you
      // don't provide the forced extent through .extent()
      geojson2svg.extendBBox(bbox,    c);   
      geojson2svg.extendBBox(fBounds, c);
    }
    if (closed) path += 'Z';
    return path;
  })
  .data({
    type: 'Feature',
    properties: { type: 'YourType'},
    geometry: {
      type: 'LineString',
      coordinates: [[0,0], [1, 1], [2,2]]
    }
  })
  .render();
// '<svg ...><path ... d="M0.23 0.121L1.445 1.54533L2.043 2.785" /></svg>'
```

<a href="#projection" name="projection">#</a> **geojson2svg().projection(** Function **)**

Projection function that will be used on every coordinate pair in every feature. See [w8r/geojson-project](https://github.com/w8r/geojson-project). Difference between this one and
`.decorator()` is that this one can be used to project the input geometries (think geographical projections),
and decorators are used to adjust the styling of the paths to apply some kind of a pattern, double-up the lines etc.

```js
geojson2svg()
  .projection(function(coord) {
    return [coord[0] + 1, coord[1] + 1];
  })
  .data({ type: 'Feature', geometry: { coordinates: [0, 0], type: 'Point' }})
  .render();

  // <svg ...><circle cx="1" cy="1" r=... /></svg>
```

<a href="#transform" name="transform">#</a> **geojson2svg.transform(** function **)**

Transform features on the run, for instance transforming a feature geometry
from one type to another. Signature of the function should be
`function (feature) -> feature`

## Supported types

* `Polygon`, `MultiPolygon`
  will be rendered into single `<path class="polygon[ className]" />` element, for `MultiPolygon`
  `fill-rule` is automatically set into `nonzero`, so that with the correct
  ring orientation it would handle the overlaps nicely
* `LineString`, `MultiLineString`
  will be rendered into single `<path class="linestring[ className]" />` element
* `Point`
  will be rendered into a `<circle class="point[ className]">` element
* `MultiPoint`
  will be rendered into a group
  ```xml
  <g class="multipoint[ className]">
    <circle class="point" />
    ...
    <circle />
  <g>
  ```
* `GeometryCollection`
  will be rendered as a group, whereas it's geometries will be rendered as
  separate features and styles for them will be selected from
  `feature.properties.geometriesTypes`, an Array, which should have a respective
  value for the geometries included into the collection. This will be assigned
  as a `type` in the properties of split features
  ```xml
  <g class="geometrycollection[ className]">
    <circle class="point" .../>
    <path class="linestring" .../>
    <path class="polygon" .../>
  </g>
  ```
  and the type values for the styles to be selected should be defined as
  `properties: { geometriesTypes: ['MyPoint', 'MyLine', 'MyPolygon'] }`

  By default, renderer will apply a geometry type as class name to the rendered
  elements and try to use `feature.properties.className` to assign individual `CSS`
  class to the element on top of that.

### Special types

Some special types (though still GeoJSON-standard compliant) are used in this
library:

 * <a href="#textbox" name="textbox">#</a> **Textbox** (`textbox`)
   Textbox is used to place text on canvas. The geometry of it can be defined by
   a rectangle (`Polygon`) or a point (`Point`). Text must be provided as a
   string in properties, or, preferably, if it's a multiline text, split it into
   an array of strings. `geojson2svg` is a pure text renderer, so it's not
   supposed to calculate the positioning and layout for text, though if used
   in the browser and not provided with enough font data, it would try to render
   the text within the given rectangle. It is **strongly** recommended to provide
   `fontFamily`, `fontSize` and `lineHeight` explicitly, if you want the renderer
   to do the text formatting for you. If geometry type is `Point`, text will
   simply be centered.
 * <a href="#symbol" name="symbol">#</a> **Symbol** (`symbol`)
   You can think of the symbol as of an icon. It provides a very basic support
   for putting icons on the canvas, symbols are rendered as a combination of
   [SVG Symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)
   and a `<use>` tag, which allows for symbols to be re-used and the file size to
   remain smaller. Symbol (icon) should be provided in the form of `SVG`
   document passed as a string. Individual symbols allow `rotation` (in radians)
   and `scale` to be passed via `properties`.

   **Example**
   ```js
   {
      "type": "Feature",
      "properties": {
        "type": "symbol",
        "rotation": 0.7853981633974483,
        "scale": 1.5,
        "symbol": {
          "src": "<svg width=\"200\" height=\"200\" viewBox=\"448 282 9 6\" xmlns=\"http://www.w3.org/2000/svg\">...</svg>"
        }
      },
      "geometry": {
        "type": "Point",
        "coordinates": [20, 20]
      }
    }
   ```



## CLI

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

**Note:** headless browser is not included in this repo as a dependency, cause
it's only necessary from time to time to calculate these values, it's not
required to perform the main task of this library. So in order to run this
script, install [nightmare headless browser](https://github.com/segmentio/nightmare)
globally or work from inside of this repo. Any suggestions are welcome as to how
to solve it differently.

## Development

```shell
npm install
npm test           # run tests once
npm run test:watch # run tests continuously
npm run build      # build dist versions
```

## Credits

[Maki icons](https://github.com/mapbox/maki) used in the examples are CC0, courtesy of Mapbox

## License

MIT License
Copyright (c) 2016 Alexander Milevski
