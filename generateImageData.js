// generateImageData.js

const extractImageData = require('./extractImageData');
const fs = require('fs');
const path = require('path');

const generateImageData = () => {
  const images = extractImageData();

  let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xmlData += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  images.forEach(image => {
    xmlData += `  <url>\n`;
    xmlData += `    <loc>${image.loc}</loc>\n`;
    xmlData += `    <image:image>\n`;
    xmlData += `      <image:loc>${image.loc}</image:loc>\n`;
    xmlData += `      <image:title>${image.title}</image:title>\n`;
    xmlData += `      <image:caption>${image.description}</image:caption>\n`;
    xmlData += `    </image:image>\n`;
    xmlData += `  </url>\n`;
  });

  xmlData += '</urlset>';

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap-images.xml'), xmlData);

  console.log('Image sitemap generated successfully!');
};

generateImageData();
