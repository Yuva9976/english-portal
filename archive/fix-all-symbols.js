const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

// Read as buffer first to see exact bytes
const buffer = fs.readFileSync(filePath);
let content = buffer.toString('utf8');

console.log('Starting comprehensive symbol fix...');

// Phase 1: Fix empty emoji fields
content = content.replace(/emoji: '',/g, "emoji: '📚',");

// Phase 2: Fix all trophy emoji variations
const trophyHex = '\ud83c\udfc6'; // 🏆
content = content.split(trophyHex + '\u00a1').join('💡'); // ¡
content = content.split(trophyHex + '\u00a2').join('💡'); // ¢
content = content.split(trophyHex + '\u00a4').join('💡'); // ¤
content = content.split(trophyHex + '\u00a5').join('👥'); // ¥
content = content.split(trophyHex + '\u00a7').join('💧'); // §
content = content.split(trophyHex + ' Concrete').join('👁️ Concrete');
content = content.split(trophyHex + ' Correct!').join('📖 Correct!');
content = content.split(trophyHex + ' Common').join('⚠️ Common');
content = content.split(trophyHex).join('💡'); // Any remaining

// Phase 3: Fix bulb emoji with trailing chars - use regex for any non-space char after bulb
content = content.replace(/💡[^\s]/g, match => {
  // If the char after bulb is not a letter/number, remove it
  if (match.length > 2 && !/[a-zA-Z0-9]/.test(match.charAt(2))) {
    return '💡 ';
  }
  return match;
});

// Phase 4: Fix explanation emojis
content = content.split('  Excellent!').join('✅ Excellent!');
content = content.split('\u00a5 Fantastic!').join('✅ Fantastic!'); // ¥
content = content.split('\u00b8 Perfect!').join('👃 Perfect!'); // ¸
content = content.split('\u2713\u00a6 Perfect!').join('✅ Perfect!'); // ✓¦

// Phase 5: Fix link emojis
content = content.split('\ud83d\udd17 Great!').join('🎵 Great!');
content = content.split('\ud83d\udd17\u00ad').join('🎭');

// Phase 6: Fix Other at start
content = content.split("'  Other uncountable").join("'💡 Other uncountable");

// Phase 7: Fix tips array icons
content = content.split("{ icon: '', type: 'DO',").join("{ icon: '✅', type: 'DO',");
content = content.split("{ icon: '', type: \"DON'T\",").join("{ icon: '❌', type: \"DON'T\",");

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ All symbols fixed successfully!');
console.log('📊 Statistics:');
console.log(`   - File size: ${buffer.length} bytes`);
console.log(`   - Total lines: ${content.split('\n').length}`);
console.log('🔄 Please hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)');
