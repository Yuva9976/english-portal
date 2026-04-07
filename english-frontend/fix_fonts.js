const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'AdminDashboard.jsx',
  'TutorDashboardHome.jsx',
  'LearnerDashboard.jsx',
  'ContentProviderDashboard.jsx'
];

const basePath = path.join(__dirname, 'src', 'pages');

for (const filename of filesToUpdate) {
  const filePath = path.join(basePath, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace font-black with font-semibold
    content = content.replace(/font-black/g, 'font-semibold');
    
    // Remove font-['Outfit']
    content = content.replace(/font-\['Outfit'\] /g, '');
    content = content.replace(/ font-\['Outfit'\]/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated fonts in ${filename}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}
