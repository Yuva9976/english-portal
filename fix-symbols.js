const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('Fixing symbols in NounsDetail.jsx...');

// Fix empty emoji fields
content = content.replace(/emoji: '',/g, "emoji: '📚',");

// Fix corrupted emojis in quiz questions - all variations
content = content.replace(/🏆¡/g, '💡');
content = content.replace(/🏆¢/g, '💡');
content = content.replace(/🏆¤/g, '💡');
content = content.replace(/🏆¥/g, '👥');
content = content.replace(/🏆§/g, '💧');
content = content.replace(/🏆 Concrete/g, '👁️ Concrete');
content = content.replace(/🏆 Correct!/g, '📖 Correct!');
content = content.replace(/🏆 Common/g, '⚠️ Common');
content = content.replace(/🏆/g, '💡'); // Catch any remaining trophy emojis

// Fix explanation emojis - add more patterns
content = content.replace(/  Excellent!/g, '✅ Excellent!');
content = content.replace(/\s{2,}Excellent!/g, '✅ Excellent!'); // Multiple spaces before Excellent
content = content.replace(/¥ Fantastic!/g, '✅ Fantastic!');
content = content.replace(/¸ Perfect!/g, '👃 Perfect!');
content = content.replace(/✓¦ Perfect!/g, '✅ Perfect!');
content = content.replace(/✓\S+ Perfect!/g, '✅ Perfect!'); // Any checkmark variant

// Fix link emojis
content = content.replace(/🔗 Great!/g, '🎵 Great!');
content = content.replace(/🔗­/g, '🎭');

// Fix Other at start
content = content.replace(/  Other uncountable/g, '💡 Other uncountable');

// Fix special characters after emojis - using regex with character classes
content = content.replace(/💡[\u00a0-\u00ff]/g, '💡'); // Remove any Latin-1 supplement chars after bulb
content = content.replace(/[\u00a0-\u00bf]\s*Fantastic/g, '✅ Fantastic'); // Fix Fantastic
content = content.replace(/'\s{2,}Other uncountable/g, "'💡 Other uncountable"); // Fix double space

// Fix tips array icons
content = content.replace(/{ icon: '', type: 'DO',/g, "{ icon: '✅', type: 'DO',");
content = content.replace(/{ icon: '', type: "DON'T",/g, "{ icon: '❌', type: \"DON'T\",");

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ All symbols have been fixed successfully!');
console.log('🔄 Please refresh your browser (Ctrl+F5) to see the changes.');
