const getStyleString = (styles: any) => {
  const css = Object.entries(styles)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `{${css};}`;
};

const getCssString = (styles: any) => {
  return Object.entries(styles)
    .map(([k, v]) => `${k} ${v}`)
    .join("");
};

const getGlassHTMLString = (
  verticalSegments: number,
  imageSource: string,
  imageAlt: string,
) => {
  const glassDivs = Array.from(
    { length: verticalSegments },
    (_, i) => `<div class="glass-image-segment"></div>`,
  ).join("");
  return `<div class="wrapper"><div class="image-wrapper">${glassDivs}</div>
<img src="${imageSource}" alt="${imageAlt}" /></div>`;
};

const getWrapperStyle = (borderRadius: number) => {
  return {
    ".wrapper": getStyleString({
      position: "relative",
      "z-index": "10",
      overflow: "hidden",
      "border-radius": `${borderRadius}px`,
    }),
  };
};

const getImageStyle = () => {
  return {
    img: getStyleString({
      width: "100%",
      height: "auto",
    }),
  };
};

const getGlassWrapperStyle = (verticalSegments: number) => {
  return {
    ".image-wrapper": getStyleString({
      position: "absolute",
      width: "100%",
      height: "100%",
      "z-index": "1",
      display: "grid",
      "grid-template-columns": `repeat(${verticalSegments}, auto)`,
      "grid-template-rows": "100%",
    }),
  };
};

const getBaseImageSegmentStyle = (imageSize: number, bgImage: string) => {
  return {
    ".glass-image-segment": getStyleString({
      "background-image": `url(${bgImage})`,
      "background-size": `${imageSize}% 100%`,
      "background-repeat": "no-repeat",
      position: "relative",
    }),
  };
};

const getImageSegmentStyle = (verticalSegments: number) => {
  const verticalStep = 100 / verticalSegments;
  const result: Record<string, string> = {};
  for (const step of Array.from({ length: verticalSegments }, (_, i) => i)) {
    result[`.glass-image-segment:nth-child(${step + 1})`] = getStyleString({
      "background-position": `${step * verticalStep + verticalStep / 2}% 50%`,
    });
  }
  return result;
};

const getBaseImageSegmentAfterStyle = (
  verticalBase: number,
  reflectionWidth: number,
  reflectionSize: number,
  bgImage: string,
) => {
  return {
    ".glass-image-segment::after": getStyleString({
      content: `""`,
      position: "absolute",
      left: `${verticalBase}%`,
      "background-image": `url(${bgImage})`,
      "background-size": `${reflectionSize}% 100%`,
      "background-repeat": "no-repeat",
      transform: "scaleX(-1)",
      width: `${reflectionWidth}%`,
      height: "100%",
    }),
  };
};

const getImageSegmentAfterStyle = (
  verticalSegments: number,
  verticalOffset: number,
) => {
  const verticalStep = 100 / verticalSegments;
  const result: Record<string, string> = {};
  for (const step of Array.from({ length: verticalSegments }, (_, i) => i)) {
    result[`.glass-image-segment:nth-child(${step + 1})::after`] =
      getStyleString({
        "background-position": `${
          step * verticalStep + (verticalOffset / 100) * verticalStep
        }% 50%`,
      });
  }
  return result;
};

export {
  getCssString,
  getGlassHTMLString,
  getWrapperStyle,
  getImageStyle,
  getGlassWrapperStyle,
  getBaseImageSegmentStyle,
  getImageSegmentStyle,
  getBaseImageSegmentAfterStyle,
  getImageSegmentAfterStyle,
};
