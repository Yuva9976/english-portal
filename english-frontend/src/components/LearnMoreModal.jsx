import React, { useState, useEffect } from 'react';

const LearnMoreModal = ({ isOpen, onClose, selectedItem, title }) => {
  const [learnMoreData, setLearnMoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen && selectedItem) {
      loadLearnMoreData();
    }
  }, [isOpen, selectedItem]);

  const loadLearnMoreData = async () => {
    setLoading(true);
    setActiveTab('overview');

    try {
      // Try to fetch from backend API
      const response = await fetch(`http://localhost:5000/api/learn-more/${selectedItem.id}`);
      const data = await response.json();
      setLearnMoreData(data);
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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-rose-400 text-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">{selectedItem?.icon}</span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{selectedItem?.type}</h2>
              <p className="text-xs md:text-sm text-white text-opacity-90">Comprehensive Learning Module • {title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max py-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📋' },
                { id: 'exercises', label: 'Exercises', icon: '✍️' },
                { id: 'videos', label: 'Videos', icon: '🎥' },
                { id: 'listening', label: 'Listening', icon: '🎧' },
                { id: 'pronunciation', label: 'Pronunciation', icon: '🗣️' },
                { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
                { id: 'reading', label: 'Reading', icon: '📖' },
                { id: 'quiz', label: 'Quiz', icon: '🎯' },
                { id: 'resources', label: 'Resources', icon: '💾' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-teal-600 shadow-md'
                      : 'text-white bg-white bg-opacity-20 hover:bg-opacity-30'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
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
            <div className="animate-fade-in">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-teal-500">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-5xl">{selectedItem?.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">What are {selectedItem?.type}?</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">{learnMoreData.overview.definition}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-50 via-white to-rose-50 rounded-2xl shadow-md p-6 md:p-8 border border-teal-200">
                    <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                      <span>📌</span> Key Rules & Guidelines
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {learnMoreData.overview.rules.map((rule, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-teal-400 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl text-teal-500 font-bold">{idx + 1}</span>
                            <p className="text-gray-700 leading-relaxed flex-1">{rule}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
                      <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <span>✨</span> Real Examples
                      </h4>
                      <div className="space-y-3">
                        {selectedItem?.examples?.map((ex, idx) => (
                          <div key={idx} className="bg-blue-50 rounded-lg p-3 border-l-2 border-blue-400">
                            <p className="text-sm md:text-base text-gray-700" dangerouslySetInnerHTML={{ __html: ex }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
                      <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                        <span>💡</span> Key Learning Points
                      </h4>
                      <ul className="space-y-3">
                        {learnMoreData.overview.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm md:text-base">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {selectedItem?.sampleWords && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                      <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                        <span>📝</span> Common {selectedItem?.type}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedItem.sampleWords.map((word, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-teal-100 to-rose-100 text-gray-800 px-5 py-2.5 rounded-full text-base font-semibold border-2 border-teal-300 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs - similar to NounsDetail implementation */}
              {activeTab === 'exercises' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Exercises section coming soon...</p>
                </div>
              )}

              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-red-500">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Video Lessons</h3>
                    <p className="text-gray-600">Watch and learn {selectedItem?.type} through engaging video content</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {learnMoreData.videos.map((video, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border border-gray-200">
                        <div className="bg-gradient-to-br from-red-500 to-pink-500 h-48 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
                          {video.thumbnail}
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">⏱️ {video.duration}</span>
                            <button className="bg-gradient-to-r from-teal-500 to-rose-400 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2">
                              <span>▶</span> Watch
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'listening' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Listening exercises coming soon...</p>
                </div>
              )}

              {activeTab === 'pronunciation' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Pronunciation guides coming soon...</p>
                </div>
              )}

              {activeTab === 'vocabulary' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Vocabulary builder coming soon...</p>
                </div>
              )}

              {activeTab === 'reading' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Reading materials coming soon...</p>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Interactive quiz coming soon...</p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Downloadable resources coming soon...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
