import React, { useState, useMemo } from 'react';

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

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-full relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">📚</span>
            <div>
              <h2 className="text-3xl font-bold">Grammar Vocabulary</h2>
              <p className="text-teal-100 text-sm">Essential grammar terms explained</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <span className="absolute right-4 top-3 text-2xl">🔍</span>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 sticky top-[180px] z-10">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-3 py-1 rounded-lg font-semibold text-sm transition-colors ${
                selectedLetter === 'All'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-8 h-8 rounded-full font-semibold text-sm transition-colors ${
                  selectedLetter === letter
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {filteredVocabulary.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">🔍</span>
              <p className="text-gray-600 text-lg">No terms found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLetter('All');
                }}
                className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedByLetter).sort().map(letter => (
                <div key={letter}>
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                      {letter}
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-teal-200 to-transparent rounded"></div>
                  </div>
                  
                  <div className="space-y-3">
                    {groupedByLetter[letter].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-teal-400 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start">
                          <span className="text-2xl mr-3 flex-shrink-0">📖</span>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.term}</h3>
                            <p className="text-gray-700 mb-3">{item.definition}</p>
                            <div className="bg-cyan-50 border-l-4 border-cyan-400 p-3 rounded-r-lg">
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold text-cyan-700">Example:</span> {item.example}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-3">Did You Know?</h3>
            <p className="mb-4">
              Understanding grammar terminology helps you learn faster and communicate more effectively with teachers and in language resources.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm">
                <span className="font-semibold">💡 Tip:</span> Learn 2-3 new grammar terms each week and practice using them in sentences!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 sticky bottom-0">
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-teal-600">{vocabulary.length}</div>
              <div className="text-xs text-gray-600">Total Terms</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">{filteredVocabulary.length}</div>
              <div className="text-xs text-gray-600">Showing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{Object.keys(groupedByLetter).length}</div>
              <div className="text-xs text-gray-600">Letters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarVocabulary;
