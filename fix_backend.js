const fs = require('fs');
const path = 'c:/Users/indhu/OneDrive/Desktop/vishnu/english-backend/routes/contentProvider.js';
let content = fs.readFileSync(path, 'utf8');

const target = 'resourceCount = await ClassResource.count({ where: { lesson_id: lessonIds } });';
const replacement = `const bc = await ClassResource.count({ where: { lesson_id: lessonIds } });
          const gc = await LearningGuide.count({ where: { lesson_id: lessonIds } });
          resourceCount = bc + gc;`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated contentProvider.js');
} else {
  console.error('Target not found in contentProvider.js');
  // Log the first 50 chars of the target to see if there's a match
  console.log('Target snippet:', target.substring(0, 30));
}
