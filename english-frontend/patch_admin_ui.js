const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'AdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /<td className="py-5 px-4">\s*<div className="flex gap-2">\s*<span title="Lessons"[\s\S]*?<\/div>\s*<\/td>/;

const replacement = `<td className="py-5 px-4">
                                <div className="flex gap-1.5 items-center">
                                   <span title="Learning Guide" className={\`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm border \${course.hasGuide ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>📖</span>
                                   <span title="Quiz (10+ Qs)" className={\`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm border \${course.hasQuiz ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>❓</span>
                                   <span title="Lesson Flow" className={\`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-sm border \${course.hasFlow ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>⚡</span>
                                   <div className="ml-2 pl-2 border-l border-slate-100 flex flex-col justify-center">
                                      <span className="text-[9px] font-black text-slate-400 leading-none mb-1 uppercase whitespace-nowrap">{course.lessonCount || 0} Lessons</span>
                                      <span className="text-[9px] font-black text-teal-500 leading-none uppercase whitespace-nowrap">{course.resourceCount || 0} Assets</span>
                                   </div>
                                </div>
                              </td>`;

// Perform global replacement for all instances (Pending, Approved, Rejected tables)
content = content.replace(new RegExp(targetRegex, 'g'), replacement);

fs.writeFileSync(filePath, content);
console.log('Applied Admin Dashboard UI updates to AdminDashboard.jsx');
