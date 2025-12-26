import React, { useState, useMemo, useEffect } from 'react';

const GrammarVocabulary = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const vocabulary = [
    { term: 'Adjective', definition: 'A word that describes or modifies a noun', example: 'The big dog barked loudly.' },
    { term: 'Adverb', definition: 'A word that modifies a verb, adjective, or another adverb', example: 'She runs quickly.' },
    { term: 'Antecedent', definition: 'The noun that a pronoun refers to', example: 'John lost his keys. (John is the antecedent of "his")' },
    { term: 'Article', definition: 'Words that define nouns as specific or unspecific (a, an, the)', example: 'I saw a dog. The dog was friendly.' },
    { term: 'Auxiliary Verb', definition: 'A helping verb used with a main verb (be, do, have, will, etc.)', example: 'She is running. They have finished.' },
    { term: 'Clause', definition: 'A group of words containing a subject and a verb', example: 'When I arrived (dependent clause)' },
    { term: 'Conjunction', definition: 'A word that connects words, phrases, or clauses', example: 'I like tea and coffee but not juice.' },
    { term: 'Consonant', definition: 'A speech sound that is not a vowel (b, c, d, f, etc.)', example: 'The word "cat" has consonants C and T.' },
    { term: 'Contraction', definition: 'A shortened form of words using an apostrophe', example: 'I am → I\'m, do not → don\'t' },
    { term: 'Dependent Clause', definition: 'A clause that cannot stand alone as a sentence', example: 'Because I was tired (needs more)' },
    { term: 'Direct Object', definition: 'The noun or pronoun that receives the action of the verb', example: 'She kicked the ball. (ball is direct object)' },
    { term: 'Future Tense', definition: 'Verb form describing actions that will happen', example: 'I will go tomorrow.' },
    { term: 'Gerund', definition: 'A verb form ending in -ing used as a noun', example: 'Swimming is fun.' },
    { term: 'Imperative', definition: 'A sentence that gives a command or makes a request', example: 'Close the door!' },
    { term: 'Independent Clause', definition: 'A clause that can stand alone as a complete sentence', example: 'I went home.' },
    { term: 'Indirect Object', definition: 'The person or thing that receives the direct object', example: 'She gave me a gift. (me is indirect object)' },
    { term: 'Infinitive', definition: 'The base form of a verb, usually with "to"', example: 'to run, to eat, to sleep' },
    { term: 'Interjection', definition: 'A word expressing emotion or sudden feeling', example: 'Wow! Ouch! Hey!' },
    { term: 'Irregular Verb', definition: 'A verb that doesn\'t follow regular past tense patterns', example: 'go→went, eat→ate, see→saw' },
    { term: 'Modal Verb', definition: 'Verbs that express possibility, necessity, etc. (can, must, should)', example: 'You should study. I can swim.' },
    { term: 'Modifier', definition: 'A word or phrase that describes another word', example: 'The very tall building' },
    { term: 'Noun', definition: 'A person, place, thing, or idea', example: 'dog, London, happiness' },
    { term: 'Object', definition: 'A noun or pronoun affected by the verb', example: 'She reads books. (books is object)' },
    { term: 'Participle', definition: 'A verb form used as an adjective (present: -ing, past: -ed)', example: 'The running water. A broken chair.' },
    { term: 'Passive Voice', definition: 'When the subject receives the action', example: 'The ball was kicked by John.' },
    { term: 'Past Tense', definition: 'Verb form describing completed actions', example: 'I walked yesterday.' },
    { term: 'Phrase', definition: 'A group of words that function together but lack subject-verb', example: 'in the morning, very quickly' },
    { term: 'Plural', definition: 'More than one', example: 'cats, children, books' },
    { term: 'Possessive', definition: 'Shows ownership', example: 'John\'s book, my car, their house' },
    { term: 'Predicate', definition: 'The part of the sentence containing the verb and describing the subject', example: 'She [runs every day].' },
    { term: 'Prefix', definition: 'Letters added to the beginning of a word to change meaning', example: 'un-happy, pre-view, re-do' },
    { term: 'Preposition', definition: 'A word showing relationship between nouns/pronouns', example: 'in, on, at, under, between' },
    { term: 'Present Tense', definition: 'Verb form describing current or habitual actions', example: 'I walk to school every day.' },
    { term: 'Pronoun', definition: 'A word that replaces a noun', example: 'he, she, it, they, we' },
    { term: 'Proper Noun', definition: 'A specific name of a person, place, or thing (capitalized)', example: 'London, John, Microsoft' },
    { term: 'Punctuation', definition: 'Marks used to clarify meaning (. , ? ! : ; " \' -)', example: 'Hello! How are you?' },
    { term: 'Regular Verb', definition: 'A verb that forms past tense by adding -ed', example: 'walk→walked, play→played' },
    { term: 'Sentence', definition: 'A group of words expressing a complete thought', example: 'The cat sleeps.' },
    { term: 'Singular', definition: 'One', example: 'cat, child, book' },
    { term: 'Subject', definition: 'The person or thing performing the action', example: '[She] runs every day.' },
    { term: 'Suffix', definition: 'Letters added to the end of a word to change meaning', example: 'hope-less, quick-ly, teach-er' },
    { term: 'Syllable', definition: 'A unit of pronunciation with one vowel sound', example: 'cat (1 syllable), happy (2 syllables)' },
    { term: 'Tense', definition: 'Time when action occurs (past, present, future)', example: 'I walked, I walk, I will walk' },
    { term: 'Verb', definition: 'An action or state of being word', example: 'run, jump, is, seems' },
    { term: 'Vowel', definition: 'The letters a, e, i, o, u (and sometimes y)', example: 'The word "beautiful" has 5 vowels.' }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter === 'All' || item.term.startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchTerm, selectedLetter, vocabulary]);

  const groupedByLetter = useMemo(() => {
    const grouped = {};
    filteredVocabulary.forEach(item => {
      const firstLetter = item.term[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(item);
    });
    return grouped;
  }, [filteredVocabulary]);

  useEffect(() => {
    // lock body scroll while this modal is open and add padding to avoid layout shift
    const prevOverflow = document.body.style.overflow || '';
    const prevPaddingRight = document.body.style.paddingRight || '';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
    console.log('GrammarVocabulary (white-header) mounted');
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50" data-component="GrammarVocabulary-white">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-rose-50 to-amber-50 opacity-90" />
      <div className="relative inset-0 w-full h-full flex flex-col bg-white overflow-hidden">
        {/* Premium White Header (glass) */}
        <div className="bg-white/80 backdrop-blur-md px-5 py-4 border-b border-gray-100 relative" style={{backgroundColor: 'rgba(255,255,255,0.92)'}}>
          <button
            onClick={onClose}
            aria-label="Back"
            className="absolute left-4 top-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:scale-105 transition-transform"
          >
            <span className="text-lg font-bold">←</span>
          </button>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Grammar Vocabulary</h2>
            <p className="text-sm text-gray-600 mt-1">Essential grammar terms explained • Browse & practice</p>
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-teal-300 via-purple-200 to-rose-300 opacity-90" />
        </div>

        {/* Search + Filter */}
        <div className="px-5 py-4 bg-transparent">
          <div className="relative max-w-full mx-auto" style={{maxWidth: 980}}>
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 border border-gray-100 bg-white/70 backdrop-blur-sm shadow-sm"
            />
            <span className="absolute right-4 top-3 text-xl">🔍</span>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="bg-white/80 px-4 py-2 border-b border-gray-100">
          <div className="flex flex-wrap gap-1 justify-center">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-2 py-1 rounded font-semibold text-xs transition-all duration-300 ${
                selectedLetter === 'All'
                  ? 'bg-gradient-to-r from-teal-600 to-rose-400 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-full font-semibold text-xs transition-all duration-300 ${
                  selectedLetter === letter
                    ? 'bg-gradient-to-r from-teal-600 to-rose-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Scrollable Area (fills remaining space) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 hide-scrollbar bg-transparent">
          {filteredVocabulary.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-gray-600 mb-3">No terms found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLetter('All');
                }}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {Object.keys(groupedByLetter).sort().map(letter => (
                <div key={letter}>
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-teal-600 to-rose-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-3 shadow-lg">
                      {letter}
                    </div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-300 via-purple-200 to-rose-300 rounded"></div>
                  </div>

                  <div className="space-y-4">
                    {groupedByLetter[letter].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">📖</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-extrabold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent mb-1">{item.term}</h3>
                            <p className="text-gray-700 text-sm mb-3">{item.definition}</p>
                            <div className="bg-white/50 border-l-4 border-teal-400 p-3 rounded-r">
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold text-teal-700">Example:</span> {item.example}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Inline Tip */}
              <div className="mt-4 bg-white/80 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-2">
                  <span className="text-xl flex-shrink-0">💡</span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">Learning Tip</h4>
                    <p className="text-xs text-gray-700">
                      Master 2-3 new grammar terms each week and practice using them in sentences to build your vocabulary naturally!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="bg-transparent px-6 py-4 border-t border-gray-100">
          <div className="flex justify-center items-center space-x-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-700">{vocabulary.length}</div>
              <div className="text-xs text-gray-600">Total Terms</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-700">{filteredVocabulary.length}</div>
              <div className="text-xs text-gray-600">Showing</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-rose-700">{Object.keys(groupedByLetter).length}</div>
              <div className="text-xs text-gray-600">Letters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarVocabulary;
