const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'AdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add allResources state
if (!content.includes('allResources')) {
  content = content.replace('const [rejectedCoursesList, setRejectedCoursesList] = useState([]);', 
    'const [rejectedCoursesList, setRejectedCoursesList] = useState([]);\n  const [allResources, setAllResources] = useState([]);');
}

// 2. Load allResources in summary res
content = content.replace('setRejectedCoursesList(data.rejectedCourses || []);', 
  'setRejectedCoursesList(data.rejectedCourses || []);\n          setAllResources(data.allResources || []);');

// 3. Add completeness icons to Approved courses table
const approvedRowTarget = /<td className="py-5 px-4 font-bold text-teal-900 tracking-tight">{course\.title}<\/td>/g;
content = content.replace(approvedRowTarget, 
  `<td className="py-5 px-4 font-bold text-teal-900 tracking-tight">
                                <div className="flex flex-col gap-1">
                                  <span>{course.title}</span>
                                  <div className="flex gap-1">
                                    <span title="Learning Guide" className={\`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shadow-sm border \${course.hasGuide ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>📖</span>
                                    <span title="Quiz (10+ Qs)" className={\`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shadow-sm border \${course.hasQuiz ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>❓</span>
                                    <span title="Lesson Flow" className={\`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shadow-sm border \${course.hasFlow ? 'bg-pink-500 text-white border-pink-400' : 'bg-slate-100 text-slate-400 border-slate-200'}\`}>⚡</span>
                                  </div>
                                </div>
                              </td>`);

// 4. Add Global Resource Hub section at end of Content Queue tab
const sectionEnd = '                </div>\n\n            </section>';
const resourceHub = `                </div>

                {/* GLOBAL RESOURCE HUB */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl mb-10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>
                  <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10 transition-transform group-hover:translate-x-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span> Global Resource Library
                  </h3>
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Resource</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Type</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Origin Hub</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {allResources.length === 0 ? (
                          <tr><td colSpan="4" className="py-10 text-center text-slate-400 text-sm italic">No materials discovered in system audit.</td></tr>
                        ) : (
                          allResources.map(res => (
                            <tr key={res.id} className="group hover:bg-indigo-50/30 transition-colors">
                              <td className="py-3 px-4">
                                <div className="text-sm font-bold text-slate-800">{res.title}</div>
                                <div className="text-[10px] text-slate-400 italic">Attached to: {res.lesson?.title || 'Course Main'}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={\`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border \${
                                  res.type === 'pdf' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                  res.type === 'video' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                  res.type === 'guide' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                  'bg-indigo-50 text-indigo-600 border-indigo-100'
                                }\`}>{res.type}</span>
                              </td>
                              <td className="py-3 px-4 text-slate-500 text-xs font-medium">{res.classroom?.title || 'System'}</td>
                              <td className="py-3 px-4 text-right">
                                <a href={res.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-500 hover:text-white transition-all text-[10px] font-black uppercase border border-indigo-100 shadow-sm inline-flex items-center gap-1">View Asset 🔗</a>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

            </section>`;

content = content.replace(sectionEnd, resourceHub);

fs.writeFileSync(filePath, content);
console.log('Applied Global Resource Hub and Table Icons to AdminDashboard.jsx');
