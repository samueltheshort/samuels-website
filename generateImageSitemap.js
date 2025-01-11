const fs = require('fs');
const path = require('path');

// Define the website URL
const websiteUrl = 'https://samueldekorte.com';

// Manually specify image paths and descriptions, matching your `Images.jsx` file
const images = [
  {
    name: 'The 614th Tank Destroyer Battalion',
    description: 'A three-inch M5 gun with crew of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
    image: '/images/database/td61401.jpg', // Relative image path from public directory
    category: 'Tank Destroyers',
  },
  {
    name: 'The 614th Tank Destroyer Battalion',
    description: 'Soldiers of the 614th Tank Destroyer Battalion stand in front of a halftrack. (Courtesy of the United States Army Heritage and Education Center)',
    image: '/images/database/td61408.jpg', // Corrected image path
    category: 'Tank Destroyers',
  },
];

// Generate the image sitemap
const generateImageSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
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
