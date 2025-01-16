const fs = require('fs');
const path = require('path');

const { imageData } = require('./imageData');

// Define the location to save the generated sitemap from the root folder
const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap-images.xml');

// Debugging - Check the resolved sitemap path
console.log('Sitemap Path:', sitemapPath);

// Function to generate the image sitemap
function generateImageSitemap() {
  // Ensure the public directory exists
  const publicDir = path.dirname(sitemapPath);
  if (!fs.existsSync(publicDir)) {
    console.log('Public directory does not exist. Creating it...');
    fs.mkdirSync(publicDir, { recursive: true }); // Create the directory if it doesn't exist
  }

  const imageUrls = imageData.map((image) => {
    const imageUrl = `https://www.samueldekorte.com/images/${image.image}`;
    return `
      <url>
        <loc>https://www.samueldekorte.com/images/${image.image}</loc>
        <image:image>
          <image:loc>${imageUrl}</image:loc>
          <image:title>${image.name}</image:title>
          <image:caption>${image.description}</image:caption>
          <image:license>${image.source}</image:license>
          <image:date>${image.date}</image:date>
        </image:image>
      </url>`;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${imageUrls.join('')}
  </urlset>`;

  // Write the XML to the public directory
  fs.writeFileSync(sitemapPath, xmlContent, 'utf8');
  console.log('Image sitemap generated successfully!');
}

// Run the function to generate the sitemap
generateImageSitemap();
