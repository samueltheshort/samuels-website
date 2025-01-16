const fs = require('fs');
const path = require('path');

// Import imageData from the imageData.js file
const { imageData } = require('./imageData');

// This ensures the sitemap is written in the 'public' folder within the same project directory.
const sitemapPath = path.resolve(__dirname, 'public', 'sitemap-images.xml');

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
        <loc>${imageUrl}</loc>
        <image:image>
          <image:loc>${imageUrl}</image:loc>
          <image:title>${image.name}</image:title>
          <image:caption>${image.description}</image:caption>
        </image:image>
      </url>`;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    ${imageUrls.join('')}
  </urlset>`;

  console.log('Generated XML content:', xmlContent); // Debugging line

  // Write the XML to the public directory
  try {
    // Write the sitemap XML content to the correct location
    fs.writeFileSync(sitemapPath, xmlContent, 'utf8');    
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

// Run the function to generate the sitemap
generateImageSitemap();
