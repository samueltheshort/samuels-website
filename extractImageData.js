const fs = require('fs');
const path = require('path');

// Path to the root directory
const rootDir = path.resolve(__dirname);

// Read the `images.jsx` file
const galleryFilePath = path.resolve(rootDir, 'src', 'pages', 'images.jsx');
const galleryFileContent = fs.readFileSync(galleryFilePath, 'utf-8');

// Regular expression to match the imageData array inside the gallery file
const imageDataRegex = /export const imageData = (\[[\s\S]*?\]);/;

// Match the imageData array
const matches = galleryFileContent.match(imageDataRegex);
if (!matches) {
  console.error('Could not find imageData array in images.jsx');
  process.exit(1);
}

// Extract the imageData array from the match
const imageDataArray = matches[1];

// Path to save the new imageData.js file in the root folder
const imageDataFilePath = path.resolve(rootDir, 'imageData.js');

// The content to write to imageData.js
const imageDataFileContent = `
  // Auto-generated imageData file
  module.exports = { imageData: ${imageDataArray} };
`;

// Write the content to imageData.js
fs.writeFileSync(imageDataFilePath, imageDataFileContent, 'utf-8');
console.log('imageData.js has been successfully exported to the root folder!');
