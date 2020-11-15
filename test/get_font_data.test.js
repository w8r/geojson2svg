var tape = require('tape');
var fontData = [
  require('../fonts/arial_helvetica_sans-serif'),
  require('../fonts/helvetica_arial_sans-serif'),
  require('../fonts/georgia_times_serif'),
  require('../fonts/lucida_console_monaco_monospace'),
  require('../fonts/verdana_geneva_sans-serif')
];

var getFontData = require('../src/get_font_data');

tape('Font data', function (t) {
  t.test('> standard font size', function (t) {
    var size = 12;
    var data = getFontData('Helvetica, Arial, sans-serif', size, fontData);
    t.equals(data.avg.toFixed(3),  (6.75202338679387).toFixed(3), 'average');
    t.equals(data.height, 14, 'line height');
    t.equals(data.size, size, 'font size');

    t.end();
  });

  t.test('> non-standard font size', function (t) {
    var size = 12.33;
    var data = getFontData('Helvetica, Arial, sans-serif', size, fontData);

    t.equals(data.avg.toFixed(3),  (6.93713437799307).toFixed(3), 'average');
    t.equals(data.height.toFixed(3), (14.37189453125).toFixed(3), 'line height');
    t.equals(data.size, size, 'font size');

    t.end();
  });

  t.end();
});
