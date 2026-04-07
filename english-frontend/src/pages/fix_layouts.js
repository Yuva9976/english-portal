const fs = require('fs');
const path = require('path');

const files = [
  'BrowseClasses.jsx',
  'LearnerCertificates.jsx',
  'LearnerClassDetail.jsx',
  'LearnerClasses.jsx',
  'GrammarHub/VocabularyHub.jsx',
  'LearnerGrammar.jsx',
  'LearnerProgress.jsx',
  'LearnerPronunciation.jsx',
  'LearnerTasks.jsx',
  'LearnerVocabulary.jsx',
  'TaskDetail.jsx'
];

const basePath = 'c:/Users/indhu/OneDrive/Desktop/vishnu/english-frontend/src/pages/';

files.forEach(f => {
  const p = path.join(basePath, f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/import\s+LearnerLayout\s+from\s+['"].*?LearnerLayout['"];?\r?\n?/g, '');
    c = c.replace(/<LearnerLayout>/g, '<div className="w-full flex-1">');
    c = c.replace(/<\/LearnerLayout>/g, '</div>');
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed', f);
  } else {
    console.log('Missing', f);
  }
});
