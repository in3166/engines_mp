function randomRgba() {
  const x = Math.floor(Math.random() * 256);
  const y = 100 + Math.floor(Math.random() * 256);
  const z = 50 + Math.floor(Math.random() * 256);
  const bgColor = `rgb(${x},${y},${z})`;
  return bgColor;
}

export default randomRgba;
