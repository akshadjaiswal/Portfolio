const fs = require('fs');
const path = require('path');

// SVG content for different sizes
const generateSVG = (size, fontSize) => `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.125}" fill="#0A0A0A"/>
  <text x="${size/2}" y="${size * 0.69}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="#C0C0C0" text-anchor="middle" dominant-baseline="middle">AJ</text>
</svg>`;

// Generate SVG files for different sizes
const sizes = {
  'favicon-16x16.svg': { size: 16, fontSize: 11 },
  'favicon-32x32.svg': { size: 32, fontSize: 20 },
  'apple-touch-icon.svg': { size: 180, fontSize: 110 },
  'android-chrome-192x192.svg': { size: 192, fontSize: 120 },
  'android-chrome-512x512.svg': { size: 512, fontSize: 320 },
};

const publicDir = path.join(__dirname, '..', 'public');

Object.entries(sizes).forEach(([filename, { size, fontSize }]) => {
  const svgContent = generateSVG(size, fontSize);
  fs.writeFileSync(path.join(publicDir, filename), svgContent);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All favicon SVG files generated!');
console.log('Note: Modern browsers support SVG favicons directly.');
console.log('For legacy .ico support, you can use an online converter or keep the SVG versions.\n');
