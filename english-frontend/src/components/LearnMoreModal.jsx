import React, { useState, useEffect } from 'react';

const LearnMoreModal = ({ isOpen, onClose, selectedItem, title }) => {
  const [learnMoreData, setLearnMoreData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && selectedItem) {
      loadLearnMoreData();
    }
  }, [isOpen, selectedItem]);

  const loadLearnMoreData = async () => {
    setLoading(true);

    try {
      // Fetch from backend API - correct port is 4000
      const response = await fetch(`http://localhost:4000/api/grammar/types/${selectedItem.id}/learn-more`);
      
      if (!response.ok) {
        throw new Error('Learn More content not available');
      }
      
      const data = await response.json();
      setLearnMoreData(data.content);
    } catch (error) {
      console.error('Error fetching learn more data:', error);
      // Fallback to mock data
      setLearnMoreData(generateMockData(selectedItem));
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (item) => {
    return {
      overview: {
        title: item.type,
        definition: item.definition,
        rules: [
          `Always identify ${item.type.toLowerCase()} by their specific characteristics`,
          `Use appropriate context with ${item.type.toLowerCase()}`,
          `Practice recognizing ${item.type.toLowerCase()} in sentences`
        ],
        keyPoints: [
          `${item.type} are essential for clear communication`,
          `They help specify exactly what you're expressing`,
          `Master these to improve your English fluency`
        ]
      },
      exercises: {
        writing: [
          {
            title: 'Sentence Construction',
            instruction: `Write 5 sentences using different ${item.type.toLowerCase()}`,
            examples: item.sampleWords ? item.sampleWords.slice(0, 3) : []
          },
          {
            title: 'Creative Writing',
            instruction: `Write a short paragraph (50 words) incorporating at least 5 ${item.type.toLowerCase()}`,
            prompt: 'Describe your favorite activity or experience'
          }
        ],
        speaking: [
          {
            activity: 'Describe and Explain',
            instruction: `Choose 3 examples and explain them in 30 seconds each`,
            tips: 'Speak clearly and use complete sentences'
          }
        ],
        grammar: [
          {
            type: 'Fill in the blanks',
            questions: [
              `The ___ is very important.`,
              `I saw a beautiful ___ yesterday.`,
              `They ___ to the park.`
            ]
          }
        ]
      },
      videos: [
        {
          title: `Understanding ${item.type}`,
          duration: '5:30',
          thumbnail: '🎥',
          description: `Complete guide to ${item.type.toLowerCase()} with examples`
        },
        {
          title: `${item.type} in Real Life`,
          duration: '8:15',
          thumbnail: '📺',
          description: 'See how native speakers use these in conversation'
        }
      ],
      listening: [
        {
          title: 'Audio Exercise 1',
          instruction: `Listen and identify ${item.type.toLowerCase()} in the conversation`,
          duration: '2:00',
          level: 'Intermediate'
        }
      ],
      pronunciation: {
        guide: `Common ${item.type.toLowerCase()} and how to pronounce them`,
        words: (item.sampleWords || []).slice(0, 6).map(word => ({
          word: word,
          phonetic: `/${word.toLowerCase()}/`,
          audio: '🔊'
        }))
      },
      vocabulary: {
        words: (item.sampleWords || []).map(word => ({
          word: word,
          definition: `A type of ${item.type.toLowerCase()}`,
          example: `The ${word.toLowerCase()} is commonly used.`,
          synonyms: ['similar word 1', 'similar word 2']
        }))
      },
      reading: {
        passages: [
          {
            title: `${item.type} in Context`,
            text: `This passage contains multiple examples of ${item.type.toLowerCase()}. ${item.examples ? item.examples[0] : ''} Practice identifying them as you read.`,
            questions: [
              `How many ${item.type.toLowerCase()} can you find?`,
              'What role do they play in the sentences?'
            ]
          }
        ]
      },
      quiz: {
        questions: [
          {
            question: `Which of these is a ${item.type.toLowerCase()}?`,
            options: item.sampleWords ? [item.sampleWords[0], 'running', 'quickly', 'beautiful'] : ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correct: 0
          },
          {
            question: `Identify the ${item.type.toLowerCase()} in the sentence`,
            type: 'text'
          }
        ]
      },
      resources: {
        downloadable: [
          {
            title: `${item.type} Worksheet`,
            type: 'PDF',
            description: 'Printable exercises and activities'
          },
          {
            title: `${item.type} Flashcards`,
            type: 'PDF',
            description: '50 flashcards for practice'
          }
        ],
        links: [
          {
            title: 'External Grammar Guide',
            url: '#',
            description: 'Additional resources and examples'
          }
        ]
      }
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex flex-col animate-fadeIn">
      <div className="flex-1 flex flex-col max-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Enhanced Header with Gradient and Animation */}
        <div className="bg-white text-gray-800 shadow-2xl border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl border border-gray-200">
                <span className="text-3xl md:text-4xl">{selectedItem?.icon}</span>
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">{selectedItem?.type}</h2>
                <p className="text-sm text-teal-600 font-medium mt-1">
                  <span className="inline-flex items-center gap-1">
                    <span>📚</span> Comprehensive Learning Module • {title}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 hover:rotate-90 transform group"
              title="Close"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Navigation Links */}
          <div className="border-t border-white border-opacity-25 bg-gradient-to-r from-teal-600 via-cyan-600 to-rose-500 bg-opacity-80 backdrop-blur-md shadow-inner">
            <div className="container mx-auto px-4 md:px-6 py-2">
              <div className="flex items-center justify-center gap-2 text-teal-600 text-sm font-medium">
                <span>📜 Scroll to:</span>
                <a href="#overview" className="hover:bg-teal-50 px-3 py-1 rounded-full transition-all">Overview</a>
                <span>•</span>
                <a href="#examples" className="hover:bg-teal-50 px-3 py-1 rounded-full transition-all">Examples</a>
                <span>•</span>
                <a href="#grammar" className="hover:bg-teal-50 px-3 py-1 rounded-full transition-all">Grammar</a>
                <span>•</span>
                <a href="#practice" className="hover:bg-teal-50 px-3 py-1 rounded-full transition-all">Practice</a>
                <span>•</span>
                <a href="#resources" className="hover:bg-teal-50 px-3 py-1 rounded-full transition-all">Resources</a>
              </div>
            </div>
          </div>
        </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-6xl">
          {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg font-medium">Loading comprehensive materials...</p>
              </div>
            </div>
          ) : learnMoreData && (
            <div className="animate-fade-in space-y-12">
              {/* 📋 OVERVIEW SECTION */}
              {learnMoreData?.overview && (
                <section id="overview" className="space-y-8 animate-slideUp">
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-white p-2 rounded-2xl border border-gray-200">
                        <span className="text-2xl md:text-3xl">{selectedItem?.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">
                          {learnMoreData.overview.title || `What are ${selectedItem?.type}?`}
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed font-normal">
                          {learnMoreData.overview.description}
                        </p>
                      </div>
                    </div>
                    {learnMoreData.overview.importance && (
                      <div className="mt-6 bg-white rounded-xl p-4 border border-teal-200">
                        <p className="text-base text-gray-800 font-medium">
                          <strong className="text-teal-600">💡 Why it matters:</strong> {learnMoreData.overview.importance}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {learnMoreData.overview.key_points && learnMoreData.overview.key_points.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-4 border border-teal-200">
                      <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-lg text-yellow-500">📌</span>
                        <span>Key Points to Remember</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {learnMoreData.overview.key_points.map((point, idx) => (
                          <div key={idx} className="bg-teal-50 rounded p-3 border border-teal-100">
                            <div className="flex items-start gap-2">
                              <span className="text-teal-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full shadow flex-shrink-0">
                                {idx + 1}
                              </span>
                              <p className="text-sm text-gray-700 leading-relaxed flex-1 font-normal">{point}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {learnMoreData.overview.common_words && learnMoreData.overview.common_words.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-t-4 border-rose-400">
                      <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="text-4xl bg-gradient-to-r from-rose-400 to-pink-400 p-3 rounded-2xl shadow-md">📝</span>
                        <span>Common {selectedItem?.type} Examples</span>
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {learnMoreData.overview.common_words.map((word, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-teal-100 via-cyan-100 to-rose-100 text-gray-800 px-6 py-3 rounded-full text-base font-bold border-2 border-teal-300 hover:shadow-xl hover:scale-110 hover:border-teal-500 transition-all duration-300 cursor-pointer">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* 📚 DETAILED EXPLANATION SECTION */}
              {learnMoreData?.detailed_explanation && (
                <section id="detailed" className="space-y-6 animate-slideUp">
                  <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-2xl shadow-2xl p-4 md:p-5 border-l-4 border-indigo-500 card-hover">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <span className="gradient-text">Detailed Explanation</span>
                    </h3>
                    <p className="text-gray-600 text-xs">Deep dive into understanding {selectedItem?.type}</p>
                  </div>
                  <div className="space-y-3">
                    {learnMoreData.detailed_explanation.sections?.map((section, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow p-3 border-t-4 border-indigo-400 hover:shadow-xl transition-all card-hover">
                        <h4 className="text-xs font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                          <span className="text-base">🔍</span>
                          {section.title}
                        </h4>
                        <p className="text-xs text-gray-700 mb-2 leading-relaxed">{section.content}</p>
                        {section.subsections?.map((sub, subIdx) => (
                          <div key={subIdx} className="mb-2 last:mb-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded p-2 border-l-4 border-indigo-400">
                            <h5 className="text-xs font-bold text-indigo-700 mb-2 flex items-center gap-1">
                              <span className="bg-indigo-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{subIdx + 1}</span>
                              {sub.subtitle}
                            </h5>
                            <p className="text-xs text-gray-700 mb-2 leading-relaxed">{sub.text}</p>
                            {sub.examples && sub.examples.length > 0 && (
                              <div className="bg-white rounded p-2 border-l-4 border-indigo-400">
                                <p className="text-xs font-semibold text-gray-600 mb-1">Examples:</p>
                                <div className="flex flex-wrap gap-1">
                                  {sub.examples.map((ex, i) => (
                                    <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                      {ex}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 🎥 VIDEO RESOURCES SECTION */}
              {learnMoreData?.video_resources && (
                <section id="videos" className="space-y-6">
                  <div className="bg-white rounded-2xl shadow p-4 border-l-4 border-red-500">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Video Lessons</h3>
                    <p className="text-gray-600 text-xs">Watch and learn {selectedItem?.type} through engaging video content</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {learnMoreData.video_resources.map((video, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-all group border border-gray-200">
                        <div className="bg-gradient-to-br from-red-500 to-pink-500 h-32 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                          🎥
                        </div>
                        <div className="p-3">
                          <h4 className="text-xs font-semibold text-gray-800 mb-1">{video.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{video.description}</p>
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="flex items-center gap-1">
                              <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">⏱️ {video.duration}</span>
                              <span className="bg-blue-100 px-2 py-0.5 rounded-full text-xs text-blue-600">{video.level}</span>
                            </div>
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-teal-500 to-rose-400 text-white px-3 py-1 rounded-full font-bold text-xs hover:shadow-lg transition-all flex items-center gap-1"
                            >
                              <span>▶</span> Watch
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 📖 GRAMMAR RULES SECTION */}
              {learnMoreData?.grammar_rules && (
                <section id="grammar" className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-teal-500">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Grammar Rules</h3>
                    <p className="text-gray-600">Essential rules for using {selectedItem?.type} correctly</p>
                  </div>
                  
                  <div className="space-y-4">
                    {learnMoreData.grammar_rules.map((rule, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-400 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <span className="bg-teal-100 text-teal-600 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                            {rule.rule_number}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">{rule.title}</h4>
                            <p className="text-gray-700 mb-4">{rule.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                            <h5 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                              <span>✓</span> Correct Examples
                            </h5>
                            <ul className="space-y-2">
                              {rule.correct_examples.map((ex, i) => (
                                <li key={i} className="text-sm text-gray-700">{ex}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                            <h5 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                              <span>✗</span> Incorrect Examples
                            </h5>
                            <ul className="space-y-2">
                              {rule.incorrect_examples.map((ex, i) => (
                                <li key={i} className="text-sm text-gray-700 line-through">{ex}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                          <p className="text-sm text-gray-700">
                            <strong className="text-blue-700">💡 Tip:</strong> {rule.tip}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 💡 EXAMPLES SECTION */}
              {learnMoreData?.examples && (
                <section id="examples" className="space-y-6 animate-slideUp">
                  <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-2xl shadow-2xl p-4 md:p-5 border-l-4 border-purple-500 card-hover">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      <span className="gradient-text">Examples & Usage</span>
                    </h3>
                    <p className="text-gray-600 text-xs">See how {selectedItem?.type} are used in real sentences</p>
                  </div>
                  <div className="space-y-3">
                    {learnMoreData.examples.categories?.map((category, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow p-3 border-t-4 border-purple-400 hover:shadow-xl transition-all card-hover">
                        <h4 className="text-xs font-semibold text-purple-800 mb-2 flex items-center gap-2">
                          <span className="text-base bg-gradient-to-r from-purple-400 to-pink-400 p-1 rounded-xl shadow-md">{category.icon}</span>
                          <span>{category.category}</span>
                        </h4>
                        <div className="space-y-2">
                          {category.examples.map((ex, i) => (
                            <div key={i} className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-xl p-2 border-l-4 border-purple-400">
                              <p className="text-xs text-gray-800 font-normal mb-1">{ex.sentence}</p>
                              <div className="bg-white rounded p-2 border-l-2 border-purple-300">
                                <p className="text-xs text-gray-700 italic">💬 {ex.analysis}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ⚠️ COMMON MISTAKES SECTION */}
              {learnMoreData?.common_mistakes && (
                <section id="mistakes" className="space-y-8 animate-slideUp">
                  <div className="bg-gradient-to-br from-orange-100 via-red-50 to-white rounded-3xl shadow-2xl p-8 md:p-10 border-l-4 border-orange-500 card-hover">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 flex items-center gap-3">
                      <span className="text-5xl">⚠️</span>
                      <span className="gradient-text">Common Mistakes to Avoid</span>
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">Learn from these common errors and avoid them</p>
                  </div>
                  
                  <div className="space-y-4">
                    {learnMoreData.common_mistakes.map((mistake, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-400 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-3 mb-4">
                          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                            #{mistake.mistake_number}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-800 mb-1">{mistake.error_type}</h4>
                            <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                              {mistake.frequency}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-400">
                            <p className="text-sm text-gray-600 mb-1 font-semibold">❌ Wrong:</p>
                            <p className="text-gray-800">{mistake.wrong}</p>
                          </div>
                          
                          <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
                            <p className="text-sm text-gray-600 mb-1 font-semibold">✅ Correct:</p>
                            <p className="text-gray-800">{mistake.correct}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{mistake.explanation}</p>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                          <p className="text-sm text-gray-700">
                            <strong className="text-blue-700">💡 Tip:</strong> {mistake.tip}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ✍️ PRACTICE EXERCISES SECTION */}
              {learnMoreData?.practice_exercises && (
                <section id="practice" className="space-y-8 animate-slideUp">
                  <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-white rounded-3xl shadow-2xl p-8 md:p-10 border-l-4 border-green-500 card-hover">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 flex items-center gap-3">
                      <span className="text-5xl">✍️</span>
                      <span className="gradient-text">Practice Exercises</span>
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">Test your understanding with these exercises</p>
                  </div>
                  
                  {learnMoreData.practice_exercises.identification && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-green-400 hover:shadow-2xl transition-all duration-300">
                      <h4 className="text-2xl md:text-3xl font-extrabold text-green-800 mb-5 flex items-center gap-3">
                        <span className="text-4xl bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-2xl shadow-md">🎯</span>
                        {learnMoreData.practice_exercises.identification.title}
                      </h4>
                      <p className="text-gray-700 mb-8 text-lg font-medium bg-green-50 p-4 rounded-xl border-l-4 border-green-400">
                        📝 {learnMoreData.practice_exercises.identification.instructions}
                      </p>
                      
                      <div className="space-y-5">
                        {learnMoreData.practice_exercises.identification.questions.map((q, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl p-6 border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:scale-102">
                            <p className="text-gray-800 font-bold mb-4 text-lg flex items-start gap-3">
                              <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">{q.id}</span>
                              <span className="flex-1">{q.sentence}</span>
                            </p>
                            <div className="bg-white rounded-lg p-4 mb-3 border-l-4 border-green-500">
                              <p className="text-base text-green-700 font-bold">
                                ✓ Answer: <span className="text-green-800">{q.answer.join(', ')}</span>
                              </p>
                            </div>
                            <p className="text-base text-gray-700 bg-emerald-50 p-4 rounded-lg italic font-medium">💡 {q.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* 🎯 QUIZ SECTION */}
              {learnMoreData?.quiz_questions && (
                <section id="quiz" className="space-y-8 animate-slideUp">
                  <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-white rounded-3xl shadow-2xl p-8 md:p-10 border-l-4 border-blue-500 card-hover">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 flex items-center gap-3">
                      <span className="text-5xl">🎯</span>
                      <span className="gradient-text">Quiz Questions</span>
                    </h3>
                    <p className="text-gray-600 text-lg font-medium">Test your knowledge with these questions</p>
                  </div>
                  
                  {['easy', 'medium', 'hard'].map(level => (
                    learnMoreData.quiz_questions[level] && (
                      <div key={level} className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-blue-400 hover:shadow-2xl transition-all duration-300">
                        <h4 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-6 capitalize flex items-center gap-3">
                          <span className="text-4xl">{level === 'easy' ? '🟢' : level === 'medium' ? '🟡' : '🔴'}</span>
                          <span>{level} Level Questions</span>
                        </h4>
                        
                        <div className="space-y-6">
                          {learnMoreData.quiz_questions[level].map((q, idx) => (
                            <div key={idx} className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-300">
                              <p className="text-gray-800 font-semibold mb-3">{q.id}. {q.question}</p>
                              
                              <div className="space-y-2 mb-3">
                                {q.options.map((opt, i) => (
                                  <div 
                                    key={i} 
                                    className={`p-3 rounded ${i === q.correct_answer ? 'bg-green-100 border-2 border-green-400' : 'bg-white border border-gray-300'}`}
                                  >
                                    <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                                    {i === q.correct_answer && <span className="ml-2 text-green-600 font-bold">✓</span>}
                                  </div>
                                ))}
                              </div>
                              
                              <p className="text-sm text-gray-700 bg-white rounded p-3 border-l-4 border-blue-400">
                                <strong className="text-blue-700">Explanation:</strong> {q.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </section>
              )}

              {/* 📚 RESOURCES SECTION */}
              {learnMoreData?.additional_resources && (
                <section id="resources" className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-indigo-500">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Additional Resources</h3>
                    <p className="text-gray-600 text-xs">Explore more learning materials</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {learnMoreData.additional_resources.map((resource, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 border-t-4 border-indigo-400 hover:shadow-xl transition-shadow">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-base">
                            {resource.type === 'article' ? '📄' : resource.type === 'worksheet' ? '📝' : resource.type === 'interactive' ? '🎮' : '📚'}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-gray-800 mb-1">{resource.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{resource.description}</p>
                            <p className="text-xs text-indigo-600 font-semibold">{resource.source}</p>
                          </div>
                        </div>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white px-3 py-1.5 rounded-lg font-bold text-center text-xs hover:shadow-lg transition-all"
                        >
                          View Resource →
                        </a>
                      </div>
                    ))}
                  </div>
                  {learnMoreData.fun_facts && learnMoreData.fun_facts.length > 0 && (
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-md p-6 border-2 border-yellow-300">
                      <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <span>🎉</span> Fun Facts
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {learnMoreData.fun_facts.map((fact, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-400">
                            <p className="text-gray-700 text-sm">{fact.icon} {fact.fact}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
