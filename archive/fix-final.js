const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Final comprehensive fix for all corrupted symbols...\n');

// Remove specific corrupted characters that appear after emojis
const corruptedChars = [
  '\u00a1', // ¡
  '\u00a2', // ¢
  '\u00a4', // ¤
  '\u00a5', // ¥
  '\u00a7', // §
  '\u00b8', // ¸
];

// Fix each corrupted character pattern
corruptedChars.forEach(char => {
  const before = content.length;
  // Remove these chars when they appear after emoji or at start of words
  content = content.split(char).join('');
  const after = content.length;
  if (before !== after) {
    console.log(`  ✓ Removed ${before - after} instances of corrupted char`);
  }
});

// Clean up any double spaces that might have been created (but preserve newlines)
content = content.replace(/ {2,}/g, ' '); // Only fix multiple spaces, not newlines

// Fix empty emoji fields
content = content.replace(/emoji: '',/g, "emoji: '📚',");

// Fix specific known issues
content = content.replace(/🏆/g, '💡'); // Any remaining trophy = bulb
content = content.replace(/🔗 Great!/g, '🎵 Great!');
content = content.replace(/🔗/g, '🎭'); // Link emoji should be theater
content = content.replace(/  Excellent!/g, '✅ Excellent!');
content = content.replace(/ Fantastic!/g, '✅ Fantastic!');
content = content.replace(/ Perfect! All/g, '👃 Perfect! All');
content = content.replace(/Â Correct!/g, '📖 Correct!');

// Fix tips array
content = content.replace(/{ icon: '', type: 'DO',/g, "{ icon: '✅', type: 'DO',");
content = content.replace(/{ icon: '', type: "DON'T",/g, "{ icon: '❌', type: \"DON'T\",");

// Fix "Other uncountable" at start
content = content.replace(/'  Other uncountable/g, "'💡 Other uncountable");

fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✅ All corrupted symbols removed!');
console.log('🔄 Hard refresh your browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)');
console.log('\n📍 Navigate to: http://localhost:3000/modules/grammar-hub/nouns');
