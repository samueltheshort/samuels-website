// generateImageSitemap.js
const fs = require('fs');
const path = require('path');
const { imageData } = require('./imageData.js');

// Define the website URL
const websiteUrl = 'https://samueldekorte.com';

// Generate the image sitemap
const generateImageSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imageData
    .map(
      (img) => `  
  <url>
    <loc>${websiteUrl}</loc>
    <image:image>
      <image:loc>${websiteUrl}${img.image}</image:loc>
      <image:caption>${img.description}</image:caption>
    </image:image>
  </url>`
    )
    .join('')}
</urlset>`;

  // Use absolute path with path.resolve to avoid any relative path issues
  const sitemapPath = path.resolve(__dirname, 'public/sitemap-images.xml');
  console.log('Writing sitemap to:', sitemapPath); // Verify path

  // Write the sitemap to the public directory
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Image sitemap created successfully!');
};

// Call the function to generate the sitemap
generateImageSitemap();
