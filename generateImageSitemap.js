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
  {
    name: 'The 614th Tank Destroyer Battalion',
    description:
      'Original Caption: "Members of the gun crew of a tank destroyer unit load their piece during practice firing, somewhere in England, before leaving for the real thing on the continent. Left to Right: Pfc. Aurbery Morris (Hobbsville, NC), Pfc. J. C. Heatem (Detroit, MI), Pfc. Robert B. Russell (Ashville, NC), 1st Lt. U.V. Watkins (Huntsville, TX), Pfc. Cebe Young (Ashville, NC), Pfc. James H. Mason (Williamston, NC). 614th Tank Destroyer Battalion, Burley, England." (Courtesy of the National Archives and Records Administration)',
    image: '/images/database/td61409.jpg',
    category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'Two enlisted men and an officer of the 614th Tank Destroyer Battalion. (Courtesy of the United States Army Heritage and Education Center)',
      image: '/images/database/td61402.jpg',
      category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'A soldier of the 614th Tank Destroyer Battalion poses with a round for the three-inch M5 gun. (Courtesy of the United States Army Heritage and Education Center)',
      image: '/images/database/td61403.jpg',
      category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion sitting on the ground. (Courtesy of the United States Army Heritage and Education Center)',
      image: '/images/database/td61404.jpg',
      category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion smokes a ciragette and poses for the camera. (Courtesy of the United States Army Heritage and Education Center)',
      image: '/images/database/td61405.jpg',
      category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion together with another soldier in a foxhole. (Courtesy of the United States Army Heritage and Education Center)',
      image: '/images/database/td61406.jpg',
      category: 'Tank Destroyers',
    },
    {
      name: 'The 614th Tank Destroyer Battalion',
      description:
        'A three inch M5 gun covered by camouflage netting. (Courtesy of the United States Army Heritage and Education Center)',
        image: '/images/database/td61407.jpg',
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
