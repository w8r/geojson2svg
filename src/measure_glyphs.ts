export interface Measurement {
  length: number;
  width: number;
  height: number;
  n: number;
  avg: number;
}

export interface Result {
  avg: number;
  height: number;
  size: number;
  measurements?: Measurement[];
}

export interface FontData {
  fontFamily: string;
  values: Result[];
}

/**
 * The reason for everything inlined is that the function has to have a
 * single body to be `eval`ed in electron context
 *
 * @param  fontFamily
 * @param  fontSizes
 * @param  detailed  More details about measurements
 * @return
 */
export function measureGlyphs(
  fontFamily: string,
  fontSizes: number[] | number,
  detailed?: boolean
) {
  function measure(
    size: number,
    details: boolean,
    ...els: SVGElement[]
  ): Result {
    let combinedWidth = 0;
    let combinedHeight = 0;
    const measurements: Measurement[] = [];
    let groups = arguments.length - 2;

    for (let i = 0, len = arguments.length; i < len; i++) {
      const el = els[i] as SVGTextContentElement;
      el.setAttribute("font-size", size.toString());
      const symbols = el.textContent!.length;
      const length = el.getComputedTextLength();
      const bbox = el.getBBox();

      combinedWidth += length / symbols;
      combinedHeight += bbox.height;

      if (details) {
        measurements.push({
          length: length,
          width: bbox.width,
          height: bbox.height,
          n: symbols,
          avg: length / symbols,
        });
      }
    }

    const res: Result = {
      avg: combinedWidth / groups,
      height: combinedHeight / groups,
      size: size,
    };

    if (details) res.measurements = measurements;

    return res;
  }

  /**
   * Generates a significant range of special HTML chars
   */
  function getSpecialChars() {
    let chars = "";
    for (var i = 160; i < 256; i++) chars += "&#" + i + ";";
    return chars;
  }

  const SVG_NS = "http://www.w3.org/2000/svg";

  /**
   * Creates text element of a specific font-family and content
   * inside of the container
   * @inlined
   */
  function createText(text: string, font: string, container: SVGSVGElement) {
    const textElement = document.createElementNS<"text">(SVG_NS, "text");
    textElement.setAttribute("font-family", font);

    const textNode = document.createTextNode(text || "");
    textElement.appendChild(textNode);
    container.appendChild(textElement);

    return textElement;
  }

  const svg = document.createElementNS<"svg">(SVG_NS, "svg");

  if (typeof fontSizes === "number") fontSizes = [fontSizes];

  const a = createText("abcdefghijklmnopqrstuvwxyz", fontFamily, svg);
  const A = createText("ABCDEFGHIJKLMNOPQRTSUVWXYZ", fontFamily, svg);
  const n = createText("0123456789", fontFamily, svg);
  const s = createText(getSpecialChars(), fontFamily, svg);

  svg.style.position = "absolute";
  svg.style.top = svg.style.left = "-9999px";
  document.body.appendChild(svg);

  const values: Result[] = [];
  for (var i = 0, len = fontSizes.length; i < len; i++) {
    values.push(measure(fontSizes[i], !!detailed, a, A, n, s));
  }

  svg.parentNode!.removeChild(svg);

  return {
    fontFamily: fontFamily,
    values: values,
  };
}
