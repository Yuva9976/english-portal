const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'english-frontend', 'src', 'pages', 'Modules', 'NounsDetail.jsx');

console.log(' Fixing all UTF-8 corruption characters...\n');

let content = fs.readFileSync(filePath, 'utf8');

// All UTF-8 corruption characters to remove
const corruptedChars = [
  { char: '\u00c2', name: 'Â (Latin A with circumflex)' },
  { char: '\u00a0', name: 'non-breaking space' },
  { char: '\u00a1', name: ' (inverted exclamation)' },
  { char: '\u00a2', name: ' (cent sign)' },
  { char: '\u00a4', name: ' (currency sign)' },
  { char: '\u00a5', name: ' (yen sign)' },
  { char: '\u00a7', name: '§ (section sign)' },
  { char: '\u00b8', name: ' (cedilla)' },
  { char: '\u00ad', name: 'soft hyphen' },
  { char: '\u00ba', name: 'º (masculine ordinal)' },
  { char: '\u00bd', name: ' (fraction)' },
  { char: '\u00b9', name: ' (superscript 1)' },
  { char: '\u00a6', name: ' (broken bar)' },
  { char: '\u017d', name: 'Ž (Z with caron)' }
];

let totalFixed = 0;

corruptedChars.forEach(({ char, name }) => {
  let count = 0;
  while (content.includes(char)) {
    content = content.replace(char, '');
    count++;
  }
  if (count > 0) {
    console.log(   Removed :  instances);
    totalFixed += count;
  }
});

fs.writeFileSync(filePath, content, 'utf8');

console.log(\n Fixed  corrupted characters!);
console.log( File: NounsDetail.jsx);
console.log( Lines: );
console.log(\n Hard refresh browser: Ctrl + F5);
