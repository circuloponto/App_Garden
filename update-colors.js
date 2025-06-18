// Simple script to update CSS files to use CSS variables for colors
const fs = require('fs');
const path = require('path');

// Define the colors we want to replace
const firstChordColor = '#f08c00';
const secondChordColor = '#00e1ff';

// Function to replace colors in a file
function updateColorsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the first chord color with the CSS variable
    content = content.replace(new RegExp(firstChordColor, 'g'), 'var(--first-chord-color)');
    
    // Replace the second chord color with the CSS variable
    content = content.replace(new RegExp(secondChordColor, 'g'), 'var(--second-chord-color)');
    
    // Fix any incorrect variable references like var(--first-chord-color)00
    content = content.replace(/var\(--first-chord-color\)([0-9a-f]{2})/g, 'var(--first-chord-color, #f08c00)$1');
    content = content.replace(/var\(--second-chord-color\)([0-9a-f]{2})/g, 'var(--second-chord-color, #00e1ff)$1');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${filePath}`);
  } catch (error) {
    console.error(`Error updating colors in ${filePath}:`, error);
  }
}

// Function to recursively find CSS files in a directory
function findCssFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findCssFiles(filePath); // Recursively search subdirectories
    } else if (file.endsWith('.css')) {
      updateColorsInFile(filePath);
    }
  });
}

// Start the process
const srcDir = path.resolve(__dirname, 'src');
findCssFiles(srcDir);
console.log('Color update complete!');
