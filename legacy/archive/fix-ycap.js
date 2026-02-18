const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

console.log('🔧 Removing remaining corruption character...\n');

let content = fs.readFileSync(filePath, 'utf8');

// Remove Ÿ (U+0178 - Latin Capital Y with diaeresis)
const ycap = '\u0178';
let count = 0;

while (content.includes(ycap)) {
  content = content.replace(ycap, '');
  count++;
}

fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Removed ${count} instances of Ÿ character!`);
console.log(`📁 File: NounsDetail.jsx`);
console.log(`📊 Lines: ${content.split('\n').length}`);
console.log(`\n🔄 Hard refresh browser: Ctrl + F5`);
