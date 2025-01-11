const fs = require('fs');
const path = require('path');
const glob = require('glob');

const websiteUrl = 'https://samueldekorte.com';

const extractImages = () => {
  const files = glob.sync('./pages/**/*.js'); // Adjust the path as needed to cover your pages
  const images = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = [...content.matchAll(/<Image\s+[^>]*src={(.*?)}/g)];

    matches.forEach((match) => {
      const srcMatch = match[1]?.replace(/['"`]/g, '').trim();
      const altMatch = content.match(/alt="([^"]*)"/);
      if (srcMatch) {
        images.push({
          loc: `${websiteUrl}${srcMatch}`, // Convert to full URL
          caption: altMatch ? altMatch[1] : '',
        });
      }
    });
  });

  return images;
};

const generateImageSitemap = () => {
  const images = extractImages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (img) => `  
  <url>
    <loc>${websiteUrl}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:caption>${img.caption}</image:caption>
    </image:image>
  </url>
  `
    )
    .join('')}
</urlset>`;

  // Write the image sitemap to the public folder
  fs.writeFileSync(path.join(__dirname, 'public/sitemap-images.xml'), sitemap, 'utf8');
  console.log('✅ Image sitemap created successfully!');
};

// Run the image sitemap generation
generateImageSitemap();
