const brightnessByColor = (col) => {
  const color = `${col}`;
  const isHEX = color.indexOf('#') === 0;
  const isRGB = color.indexOf('rgb') === 0;
  let r = 0;
  let g = 0;
  let b = 0;
  // let m = Array;
  if (isHEX) {
    const hasFullSpec = color.length === 7;
    const m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m) {
      r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16);
      g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16);
      b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
    }
  }
  if (isRGB) {
    const m = color.match(/(\d+){3}/g);
    if (m) {
      // eslint-disable-next-line prefer-destructuring
      r = m[0];
      // eslint-disable-next-line prefer-destructuring
      g = m[1];
      // eslint-disable-next-line prefer-destructuring
      b = m[2];
    }
  }
  if (typeof r !== 'undefined') return (r * 299 + g * 587 + b * 114) / 1000;
  return false;
};

export default brightnessByColor;
