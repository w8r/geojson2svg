import { FontData, measureGlyphs, Result } from "./measure_glyphs";

const LINE_RATIO = 1.01567;
const WIDTH_RATIO = 1 / 1.946;

/**
 * @param  {String} fontFamily
 * @param  {Number} fontSize
 * @param  {Array.<Object>} fontData
 * @return {Object}
 */
export function getFontData(
  fontFamily: string,
  fontSize: number,
  fontData: FontData[]
) {
  let data: Result | null = null;
  let prev: Result | null = null;
  let next: Result | null = null;

  // try and select from available
  for (let i = 0, len = fontData.length; i < len; i++) {
    const font = fontData[i];
    prev = next = null;

    if (font.fontFamily === fontFamily) {
      for (let j = 0, jj = font.values.length; j < jj; j++) {
        const values = font.values[j];
        if (values.size === fontSize) {
          data = values;
          break;
        } else if (values.size < fontSize) {
          prev = values;
        } else if (!next && values.size > fontSize) {
          next = values;
        }
      }
      break;
    }
  }

  if (data === null) {
    // none available
    let ratio;
    if (typeof window !== "undefined") {
      // if in browser - calculate
      data = measureGlyphs(fontFamily, fontSize).values[0];
    } else if (prev) {
      // else interpolate
      if (next) {
        // between two values
        ratio = (fontSize - prev.size) / (next.size - prev.size);
        data = {
          avg: prev.avg + (next.avg - prev.avg) * ratio,
          height: prev.height + (next.height - prev.height) * ratio,
          size: fontSize,
        };
      } else {
        // larger than the largest
        data = fromOtherValue(fontSize, prev);
      }
    } else if (next) {
      // smaller than smallest
      data = fromOtherValue(fontSize, next);
    } else {
      // not enough data at all, roughly calculate
      data = {
        avg: fontSize * WIDTH_RATIO,
        height: fontSize * LINE_RATIO,
        size: fontSize,
      };
    }
  }

  return data;
}

/**
 * @param  fontSize
 * @param  value
 * @return font data
 */
function fromOtherValue(fontSize: number, value: Result): Result {
  const ratio = fontSize / value.size;
  return {
    avg: value.avg * ratio,
    size: fontSize,
    height: value.height * ratio,
  };
}
