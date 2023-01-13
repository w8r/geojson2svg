import type { Feature, BBox } from "geojson";
import { getFontData } from "./get_font_data";
import { FontData, Result } from "./measure_glyphs";
import { Style } from "./types";

/**
 * @param  {String}         text
 * @param  {Number}         fontSize
 * @param  {String}         fontFamily
 * @param  {Array.<Number>} featureBounds
 * @param  {Object}         props
 * @return {String}
 */
export function renderTextContent(
  text: string | string[],
  fontSize: number,
  fontFamily: string,
  featureBounds: BBox,
  props: Style,
  fonts: FontData[]
) {
  const accum = [];
  if (Array.isArray(text) && props.lineHeight) {
    // it's formatted
    for (let i = 0, len = text.length; i < len; i++) {
      accum.push(
        "<tspan ",
        'dy="',
        props.lineHeight,
        '" ',
        'x="',
        featureBounds[0],
        '">',
        String(text[i]),
        "</tspan>"
      );
    }
    text = accum.join("");
  } else {
    const fontData = getFontData(fontFamily, fontSize, fonts);
    text = renderMultilineText(String(text), fontData, featureBounds);
  }

  return text;
}

/**
 * @param  {String} text
 * @param  {Object} fontData
 * @param  {Array.<Number>} bbox
 * @return {String}
 */
function renderMultilineText(text: string, fontData: Result, bbox: BBox) {
  const width = bbox[2] - bbox[0];
  const length = text.length;
  const accum: string[] = [];
  let str = "";
  let i = 0,
    dy = fontData.height,
    lineLength = 0;

  if (width === 0) dy -= fontData.height * 0.68;

  while (i < length) {
    if (i === 0 || lineLength + fontData.avg > width) {
      const x = width === 0 ? bbox[0] - fontData.avg / 2 : bbox[0];
      str += ["<tspan ", 'dy="', dy, '" ', 'x="', x, '"', ">"].join("");
      lineLength = 0;
    }

    str += text[i++];
    lineLength += fontData.avg;

    if (i === length || lineLength + fontData.avg > width) {
      str += "</tspan>";
      accum.push(str);
      str = "";
    }
  }

  return accum.join("");
}
