const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing all corrupted symbols in NounsDetail.jsx...\n');

let fixCount = 0;

// List of corrupted characters to remove (Latin-1 Supplement characters that shouldn't be there)
const corruptedChars = [
  { char: '\u00a1', name: 'inverted exclamation' }, // ¡
  { char: '\u00a2', name: 'cent sign' }, // ¢
  { char: '\u00a4', name: 'currency sign' }, // ¤
  { char: '\u00a5', name: 'yen sign' }, // ¥
  { char: '\u00a7', name: 'section sign' }, // §
  { char: '\u00b8', name: 'cedilla' }, // ¸
  { char: '\u00ad', name: 'soft hyphen' }, // soft hyphen
];

// Remove each corrupted character
corruptedChars.forEach(({ char, name }) => {
  const before = content.length;
  // Use split/join to remove ALL instances
  while (content.includes(char)) {
    content = content.replace(char, '');
    fixCount++;
  }
  const after = content.length;
  if (before !== after) {
    console.log(`  ✓ Removed ${name} (${before - after} characters)`);
  }
});

// Fix empty emoji fields in quiz
content = content.replace(/emoji: '',/g, "emoji: '📚',");

// Replace any remaining trophy emojis with bulb
content = content.replace(/🏆/g, '💡');

// Fix link emoji
content = content.replace(/🔗 Great!/g, '🎵 Great!');
content = content.replace(/🔗/g, '🎭');

// Fix tips array icons
content = content.replace(/{ icon: '', type: 'DO',/g, "{ icon: '✅', type: 'DO',");
content = content.replace(/{ icon: '', type: "DON'T",/g, "{ icon: '❌', type: \"DON'T\",");

fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n✅ Fixed ${fixCount} corrupted characters!`);
console.log('📁 File: NounsDetail.jsx');
console.log('📊 Lines:', content.split('\n').length);
console.log('\n🔄 Please hard refresh your browser:');
console.log('   • Windows: Ctrl + F5');
console.log('   • Mac: Cmd + Shift + R');
console.log('\n📍 URL: http://localhost:3000/modules/grammar-hub/nouns');
