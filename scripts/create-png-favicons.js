const fs = require('fs');
const path = require('path');

// Create a simple HTML-based PNG generator
const createPNGFromSVG = (svgContent, outputPath, size) => {
  // For now, we'll create SVG files and update the layout to use them
  // Modern browsers support SVG favicons natively
  const svgPath = outputPath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✓ Created ${path.basename(svgPath)}`);
};

const generateSVG = (size, fontSize) => `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A1A1A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0A0A0A;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="none" stroke="#C0C0C0" stroke-width="${size * 0.02}"/>
  <text x="50%" y="50%" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${fontSize}" font-weight="700" fill="#C0C0C0" text-anchor="middle" dominant-baseline="central">AJ</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

// Create favicons
const favicons = [
  { name: 'favicon.svg', size: 32, fontSize: 20 },
  { name: 'favicon-16x16.svg', size: 16, fontSize: 10 },
  { name: 'favicon-32x32.svg', size: 32, fontSize: 20 },
  { name: 'apple-touch-icon.svg', size: 180, fontSize: 110 },
  { name: 'android-chrome-192x192.svg', size: 192, fontSize: 120 },
  { name: 'android-chrome-512x512.svg', size: 512, fontSize: 320 },
];

favicons.forEach(({ name, size, fontSize }) => {
  const svgContent = generateSVG(size, fontSize);
  fs.writeFileSync(path.join(publicDir, name), svgContent);
  console.log(`✓ Created ${name}`);
});

// Create a simple ICO representation (actually an SVG that works as favicon)
const icoContent = generateSVG(32, 20);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoContent);
console.log('✓ Created favicon.ico (SVG format for modern browsers)');

console.log('\n✅ All favicon files created successfully!');
console.log('📱 Includes: favicon.ico, 16x16, 32x32, Apple touch icon, Android chrome icons');
