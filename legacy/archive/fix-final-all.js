const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

console.log('🔧 Removing ALL UTF-8 corruption characters...\n');

let content = fs.readFileSync(filePath, 'utf8');
const originalLength = content.length;

// Remove all Latin-1 Supplement range (U+0080 to U+00FF) except valid characters
// Keep only: common punctuation, currency symbols that might be intentional
const validChars = new Set([
  '\u00a9', // © copyright
  '\u00ae', // ® registered
  '\u00b0', // ° degree
  '\u00d7', // × multiplication
  '\u00f7', // ÷ division
]);

let removedCount = 0;
let newContent = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const code = char.charCodeAt(0);
  
  // Check if it's in the Latin-1 Supplement range (0x80-0xFF)
  if (code >= 0x80 && code <= 0xFF) {
    // Only keep if it's in our valid chars list
    if (!validChars.has(char)) {
      removedCount++;
      continue; // Skip this character
    }
  }
  
  newContent += char;
}

fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`✅ Removed ${removedCount} corrupted characters!`);
console.log(`📁 File: NounsDetail.jsx`);
console.log(`📊 Original size: ${originalLength} chars`);
console.log(`📊 New size: ${newContent.length} chars`);
console.log(`📊 Lines: ${newContent.split('\n').length}`);
console.log(`\n🔄 Hard refresh browser: Ctrl + F5`);
console.log(`🌐 URL: http://localhost:3000/modules/grammar-hub/nouns`);
