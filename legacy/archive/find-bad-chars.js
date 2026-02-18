const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

console.log('🔍 Finding ALL non-standard characters...\n');

let content = fs.readFileSync(filePath, 'utf8');

// Valid characters we want to keep:
// - Regular ASCII (0x00-0x7F)
// - Common emojis (U+1F300 and above, plus U+2000-U+2BFF for symbols)
// - Common punctuation we intentionally use

const suspiciousChars = new Map();

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const code = char.charCodeAt(0);
  
  // Flag anything in Latin Extended ranges that might be corruption
  if ((code >= 0x80 && code <= 0x024F) ||   // Latin-1 Supplement & Extended
      (code >= 0x0300 && code <= 0x036F)) {  // Combining diacritics
    
    // Skip if it's valid emoji or punctuation we use
    if (code === 0x00a9 || code === 0x00ae || code === 0x00b0) continue;
    
    const context = content.substring(Math.max(0, i-20), Math.min(content.length, i+20));
    const line = content.substring(0, i).split('\n').length;
    
    if (!suspiciousChars.has(char)) {
      suspiciousChars.set(char, []);
    }
    suspiciousChars.get(char).push({ line, context });
  }
}

console.log('Found suspicious characters:\n');
suspiciousChars.forEach((locations, char) => {
  console.log(`Character: "${char}" (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`);
  console.log(`  Occurrences: ${locations.length}`);
  console.log(`  First location: Line ${locations[0].line}`);
  console.log(`  Context: ...${locations[0].context.replace(/\n/g, ' ')}...`);
  console.log('');
});

console.log(`\nTotal suspicious characters found: ${suspiciousChars.size} types`);
