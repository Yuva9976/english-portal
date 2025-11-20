/**
 * Comprehensive Quiz Questions for Grammar Learning
 * Each quiz has 10 questions covering types, usage, and identification
 */

export const nounQuizzes = {
  comprehensive: [
    {
      id: 1,
      type: 'multiple-choice',
      emoji: '⭐',
      question: 'Which of the following is a PROPER noun?',
      hint: 'Proper nouns name specific people, places, or things and are capitalized.',
      options: ['school', 'Oxford University', 'building', 'teacher'],
      correct: 1,
      explanation: '🎯 Correct! "Oxford University" is a proper noun because it\'s the specific name of an institution and is capitalized.',
      funFact: '💡 All proper nouns must start with a capital letter, whether at the beginning or middle of a sentence.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      emoji: '💭',
      question: 'Identify the ABSTRACT noun: "The strength of her character impressed everyone."',
      hint: 'Abstract nouns represent ideas, qualities, or concepts - things you cannot touch.',
      options: ['character', 'strength', 'everyone', 'impressed'],
      correct: 1,
      explanation: '✨ Perfect! "Strength" is an abstract noun - it\'s a quality or characteristic you cannot physically touch or see.',
      funFact: '📚 Common abstract nouns often end in: -ness, -ment, -tion, -ity (kindness, movement, creation, ability)'
    },
    {
      id: 3,
      type: 'multiple-choice',
      emoji: '💧',
      question: 'Which noun is UNCOUNTABLE (cannot be counted)?',
      hint: 'Can you say "one, two, three" of this item? If not, it\'s uncountable.',
      options: ['chair', 'furniture', 'student', 'pencil'],
      correct: 1,
      explanation: '🏆 Excellent! "Furniture" is uncountable. We say "pieces of furniture" or "some furniture", not "three furnitures".',
      funFact: '🔢 Uncountable nouns use: much, some, a lot of - not "many". Examples: water, advice, luggage, baggage'
    },
    {
      id: 4,
      type: 'fill-in-the-blank',
      emoji: '👥',
      question: 'Fill in the blank: "A _____ of musicians performed at the concert."',
      hint: 'This word refers to a group of people working together.',
      options: ['group', 'team', 'band', 'orchestra'],
      correct: 3,
      explanation: '🎵 Great! "Orchestra" is the most specific collective noun here for musicians. "Band" (option 2) is also acceptable.',
      funFact: '🎭 Other collective nouns: cast (actors), crew (sailors), troupe (dancers), ensemble (musicians)'
    },
    {
      id: 5,
      type: 'multiple-choice',
      emoji: '🔗',
      question: 'Which word is a COMPOUND noun (made of two or more words)?',
      hint: 'Look for two smaller words combined together to make one noun.',
      options: ['beautiful', 'breakfast', 'running', 'slowly'],
      correct: 1,
      explanation: '🥐 Fantastic! "Breakfast" is a compound noun made from "break" + "fast". It names one specific thing.',
      funFact: '🔤 Compound nouns can be: one word (bedroom), two words (ice cream), or hyphenated (sister-in-law)'
    },
    {
      id: 6,
      type: 'fill-in-the-blank',
      emoji: '👁️',
      question: 'Fill in the blank: "She could smell the _____ of fresh flowers in the garden."',
      hint: 'This noun refers to something you can perceive with one of your five senses.',
      options: ['scent', 'aroma', 'fragrance', 'all of the above'],
      correct: 3,
      explanation: '🌸 Perfect! All three options (scent, aroma, fragrance) are concrete nouns - things you can physically perceive.',
      funFact: '👃 Concrete nouns appeal to the five senses: smell, taste, touch, sight, and hearing.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '📊',
      question: 'Identify the noun type: "The committee decided to postpone the meeting."',
      hint: 'This noun represents multiple people acting as one unit. What type is it?',
      options: ['Concrete', 'Collective', 'Possessive', 'Abstract'],
      correct: 1,
      explanation: '👥 Excellent! "Committee" is a collective noun because it refers to a group of people (committee members) as one single unit.',
      funFact: '🏛️ More collective nouns: jury, audience, crowd, government, parliament, congress'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      emoji: '✏️',
      question: 'Identify which is SINGULAR: "The _____ lay on the table."',
      hint: 'Singular means ONE. Look for a noun that\'s one item.',
      options: ['book', 'books', 'book\'s', 'books\''],
      correct: 0,
      explanation: '📖 Correct! "Book" is singular - it refers to one book. To make it plural, we add -s: books.',
      funFact: '1️⃣ Singular nouns: a book, this person, that dog. Plural nouns: books, people, dogs'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '🎓',
      question: 'Which sentence uses NOUNS correctly?',
      hint: 'Look for proper capitalization and correct singular/plural usage.',
      options: [
        'She bought three furnitures for her room.',
        'The Team played in london last week.',
        'He has much experience in teaching.',
        'I need some advices from you.'
      ],
      correct: 2,
      explanation: '✅ Perfect! Option 3 is correct. "Experience" is uncountable (not "experiences"), and we use "much" not "many" with uncountable nouns.',
      funFact: '🔍 Common mistake: "advices" (wrong). Advice is uncountable! "Could you give me some advice?"'
    },
    {
      id: 10,
      type: 'fill-in-the-blank',
      emoji: '🌟',
      question: 'Which classification fits "Water is essential for human survival"?',
      hint: 'Consider whether water can be counted. Can you say "one water, two waters"?',
      options: ['Countable and Concrete', 'Uncountable and Concrete', 'Countable and Abstract', 'Uncountable and Abstract'],
      correct: 1,
      explanation: '💧 Excellent! "Water" is uncountable (we don\'t say "waters" in general) AND concrete (you can see it, touch it, taste it).',
      funFact: '🌊 Other uncountable concrete nouns: air, sand, rice, oil, sugar, salt, coffee'
    }
  ]
};

export const pronounQuizzes = {
  comprehensive: [
    {
      id: 1,
      type: 'multiple-choice',
      emoji: '👤',
      question: 'Which pronoun is in the OBJECTIVE (object) form?',
      hint: 'Object pronouns receive the action: me, him, her, us, them.',
      options: ['She', 'I', 'him', 'they'],
      correct: 2,
      explanation: '🎯 Correct! "Him" is the objective form of the personal pronoun "he". Use object pronouns after verbs or prepositions.',
      funFact: '📌 Personal pronouns have two forms: Subject (I, you, he) vs. Object (me, you, him)'
    },
    {
      id: 2,
      type: 'multiple-choice',
      emoji: '🎁',
      question: 'Which sentence correctly uses a POSSESSIVE pronoun?',
      hint: 'Possessive pronouns show ownership and stand alone: mine, yours, his, hers, ours, theirs.',
      options: [
        'This pen is her.',
        'The book is mine.',
        'That car is my.',
        'This house is our.'
      ],
      correct: 1,
      explanation: '✨ Perfect! "The book is mine" is correct. Possessive pronouns stand alone - no noun follows them.',
      funFact: '🎯 Don\'t confuse: possessive pronouns (mine) vs. possessive adjectives (my). "This is my book" vs. "This book is mine"'
    },
    {
      id: 3,
      type: 'fill-in-the-blank',
      emoji: '👉',
      question: 'Fill in the blank: "_____ books on the shelf are more interesting than those on the table."',
      hint: 'Use a demonstrative pronoun to point out which books you\'re referring to.',
      options: ['This', 'These', 'That', 'Those'],
      correct: 1,
      explanation: '🎊 Excellent! "These" is correct because "books" is plural and refers to items that are nearby (opposite of "those").',
      funFact: '👉 Demonstrative pronouns: this/these (near), that/those (far). They point out specific items.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      emoji: '🪞',
      question: 'Identify the REFLEXIVE pronoun: "She taught herself to play the guitar."',
      hint: 'Reflexive pronouns show the action reflects back to the subject: -self/-selves words.',
      options: ['She', 'taught', 'herself', 'to play'],
      correct: 2,
      explanation: '🎸 Fantastic! "Herself" is a reflexive pronoun. The subject (she) performs the action on herself.',
      funFact: '🔄 All reflexive pronouns end in -self (singular) or -selves (plural): myself, yourself, himself, ourselves, themselves'
    },
    {
      id: 5,
      type: 'fill-in-the-blank',
      emoji: '🔗',
      question: 'Fill in the blank: "The athlete _____ won the race trained every day."',
      hint: 'This relative pronoun connects the clause to the noun "athlete".',
      options: ['who', 'which', 'that', 'where'],
      correct: 0,
      explanation: '🏃 Perfect! "Who" is correct because it refers to a person (the athlete). Use "that" or "which" for things.',
      funFact: '📝 Relative pronouns: who/whom (people), which (things), that (people or things), where (places), whose (possession)'
    },
    {
      id: 6,
      type: 'multiple-choice',
      emoji: '❓',
      question: 'Which interrogative pronoun correctly completes the question: "_____ of the two options do you prefer?"',
      hint: 'Interrogative pronouns ask questions and often appear at the start.',
      options: ['Who', 'Which', 'What', 'Whose'],
      correct: 1,
      explanation: '✅ Correct! "Which" is used when choosing between specific options. "Who" is for people, "what" is for things.',
      funFact: '❓ Common interrogative pronouns: who, whom, whose, what, which. Always start a question!'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '❔',
      question: 'Identify the INDEFINITE pronoun: "Someone left their umbrella at the office."',
      hint: 'Indefinite pronouns refer to non-specific or unknown people/things.',
      options: ['left', 'Someone', 'their', 'office'],
      correct: 1,
      explanation: '🎯 Great! "Someone" is indefinite because it refers to an unknown or unspecified person.',
      funFact: '🔍 Indefinite pronouns: someone, something, anyone, anything, no one, nothing, everyone, everything, anybody, somebody'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      emoji: '⭐',
      question: 'Fill in the blank: "The president _____ opened the new building."',
      hint: 'This pronoun emphasizes or intensifies the noun/pronoun before it. It has -self/-selves.',
      options: ['herself', 'self', 'oneself', 'herself'],
      correct: 0,
      explanation: '👑 Perfect! "Herself" is an intensive pronoun here, emphasizing that the president personally opened the building.',
      funFact: '⭐ Intensive and reflexive pronouns have the same form (-self/-selves), but different purposes: He hurt himself (reflexive) vs. He saw it himself (intensive)'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '🤝',
      question: 'Which sentence correctly uses a RECIPROCAL pronoun?',
      hint: 'Reciprocal pronouns show mutual action: "each other" or "one another".',
      options: [
        'They helped each other with homework.',
        'They helped themselves with homework.',
        'They helped other with homework.',
        'They helped themselves to food.'
      ],
      correct: 0,
      explanation: '💪 Excellent! "Each other" is a reciprocal pronoun showing mutual action between both people.',
      funFact: '🤝 Two reciprocal pronouns: "each other" (usually 2 people) and "one another" (groups). Both can be used interchangeably.'
    },
    {
      id: 10,
      type: 'fill-in-the-blank',
      emoji: '🌟',
      question: 'Which set of pronouns best completes: "_____ told _____ that the secret was out"?',
      hint: 'First blank needs a subject pronoun, second needs an object pronoun.',
      options: [
        'I, him',
        'Me, he',
        'I, me',
        'He, I'
      ],
      correct: 0,
      explanation: '✅ Perfect! "I" (subject) is the one doing the telling. "Him" (object) is receiving the information. Subject comes first!',
      funFact: '📌 Subject pronouns: I, you, he, she, it, we, they. Object pronouns: me, you, him, her, it, us, them.'
    }
  ]
};

export const nounQuizzesBasic = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is a noun?',
    options: ['A word that describes a noun', 'A word that names a person, place, thing, or idea', 'A word that shows action', 'A word that connects words'],
    correct: 1,
    explanation: 'A noun is a word that names a person, place, thing, or idea.'
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Which of these is a common noun?',
    options: ['Paris', 'John', 'dog', 'December'],
    correct: 2,
    explanation: 'Dog is a common noun. Paris, John, and December are proper nouns.'
  }
];

export const pronounQuizzesBasic = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is a pronoun?',
    options: ['A word that names something', 'A word that replaces a noun', 'A word that shows possession', 'All of the above'],
    correct: 3,
    explanation: 'A pronoun is a word that can replace a noun, show possession, or serve other functions.'
  }
];

export const verbQuizzes = {
  comprehensive: [
    {
      id: 1,
      type: 'multiple-choice',
      emoji: '🏃',
      question: 'Which sentence correctly shows subject-verb agreement?',
      hint: 'Match singular subjects with singular verbs and plural subjects with plural verbs.',
      options: [
        'The team are celebrating their win.',
        'She go to school every day.',
        'He runs every morning.',
        'They is happy.'
      ],
      correct: 2,
      explanation: '✅ Correct! "He runs every morning." shows correct subject-verb agreement for a singular subject.',
      funFact: 'Subject-verb agreement is one of the most common errors in English writing.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      emoji: '⏳',
      question: 'Choose the correct past tense of the verb "to go".',
      hint: 'Many common verbs are irregular and don\'t follow -ed rules.',
      options: ['goed', 'went', 'gone', 'goes'],
      correct: 1,
      explanation: '🏆 "Went" is the correct past tense. "Go" is irregular: go/went/gone.',
      funFact: 'Irregular verbs must be memorized — there is no single rule for them.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      emoji: '🔁',
      question: 'Which verb is TRANSITIVE (takes a direct object)?',
      hint: 'A transitive verb needs an object to complete its meaning.',
      options: ['Sleep', 'Arrive', 'Kick', 'Vanish'],
      correct: 2,
      explanation: '✅ "Kick" is transitive — you can kick a ball (object). "Sleep" and "arrive" are intransitive here.',
      funFact: 'Some verbs can be both transitive and intransitive depending on usage.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      emoji: '🔧',
      question: 'Which sentence correctly uses a MODAL verb for ability in the past?',
      hint: 'Think of modals that change meaning by tense or form.',
      options: ['She can swim yesterday.', 'She could swim when she was younger.', 'She may swim yesterday.', 'She must swim yesterday.'],
      correct: 1,
      explanation: '🎯 "Could" expresses ability in the past. "Can" is present-tense ability.',
      funFact: 'Modals like can/could/may/might express ability, permission, possibility, or obligation.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      emoji: '🔗',
      question: 'Identify the PHRASAL VERB in this sentence: "She gave up smoking."',
      hint: 'Phrasal verbs are a verb + particle and often change the meaning.',
      options: ['She', 'gave', 'gave up', 'smoking'],
      correct: 2,
      explanation: '👏 "Gave up" is a phrasal verb meaning "quit". The particle changes the verb\'s meaning.',
      funFact: 'Phrasal verbs are very common and often idiomatic.'
    },
    {
      id: 6,
      type: 'multiple-choice',
      emoji: '🔁',
      question: 'Which is a GERUND in this list?',
      hint: 'Gerunds are verbs used as nouns and end with -ing.',
      options: ['to swim', 'swimming', 'swim', 'swam'],
      correct: 1,
      explanation: '📝 "Swimming" functions as a noun (gerund). Gerunds end with -ing.',
      funFact: 'Gerunds and present participles look the same but have different grammatical roles.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '⚙️',
      question: 'Choose the correct passive form: "The chef (cook) the meal yesterday."',
      hint: 'Passive uses a form of "be" + past participle.',
      options: ['The meal was cooked by the chef.', 'The meal is cook by the chef.', 'The meal cooked by the chef.', 'The meal cooks by the chef.'],
      correct: 0,
      explanation: '✅ "The meal was cooked by the chef." is the correct passive sentence.',
      funFact: 'Passive voice emphasizes the object (what happened) rather than the subject (who did it).' 
    },
    {
      id: 8,
      type: 'multiple-choice',
      emoji: '🔤',
      question: 'Which verb form completes: "I enjoy _____ new languages."',
      hint: 'After enjoy, do we use gerund or infinitive?',
      options: ['to learn', 'learn', 'learning', 'learns'],
      correct: 2,
      explanation: '🎯 "Learning" (gerund) is correct. Some verbs (like enjoy) are followed by gerunds, not infinitives.',
      funFact: 'Common verbs followed by gerunds: enjoy, avoid, consider, mind, suggest.'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '🔁',
      question: 'Which is the correct present perfect form?',
      hint: 'Present perfect = have/has + past participle.',
      options: ['She has went', 'She have gone', 'She has gone', 'She had went'],
      correct: 2,
      explanation: '✅ "She has gone" is correct: "has" + past participle "gone".',
      funFact: 'Present perfect links past actions to the present.'
    },
    {
      id: 10,
      type: 'multiple-choice',
      emoji: '⚡',
      question: 'Choose the IMPERATIVE sentence (a command):',
      hint: 'Imperative sentences often omit the subject and use the base verb.',
      options: ['You should open the window.', 'Open the window.', 'The window opens.', 'He opens the window.'],
      correct: 1,
      explanation: '✅ "Open the window." is an imperative command.',
      funFact: 'Imperative verbs are used for commands, requests, and instructions.'
    }
  ]
};

export const verbQuizzesBasic = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is a verb?',
    options: ['A describing word', 'An action or state word', 'A naming word', 'A connecting word'],
    correct: 1,
    explanation: 'A verb expresses an action, occurrence, or state of being.'
  }
];

// Adjectives quizzes
export const adjectiveQuizzes = {
  comprehensive: [
    { id: 1, type: 'multiple-choice', emoji: '✨', question: 'Which word is an adjective?', options: ['run', 'happy', 'quickly', 'and'], correct: 1, explanation: 'Adjectives describe nouns; "happy" describes someone.', funFact: 'Adjectives often answer which one, what kind, or how many.' },
    { id: 2, type: 'multiple-choice', emoji: '🎨', question: 'Choose the comparative form of "big".', options: ['biggest', 'bigger', 'more big', 'most big'], correct: 1, explanation: '"Bigger" is the comparative form of "big".' },
    { id: 3, type: 'multiple-choice', emoji: '🔤', question: 'Which sentence contains an adjective?', options: ['She sings loudly.', 'The red car sped by.', 'He will arrive.', 'They run.'], correct: 1, explanation: '"Red" describes the car, so it is an adjective.' },
    { id: 4, type: 'multiple-choice', emoji: '✳️', question: 'Choose the superlative form of "good".', options: ['goodest', 'better', 'best', 'most good'], correct: 2, explanation: '"Best" is the superlative of "good".' },
    { id: 5, type: 'multiple-choice', emoji: '🔍', question: 'Which adjective compares three or more items?', options: ['big', 'bigger', 'biggest', 'more big'], correct: 2, explanation: '"Biggest" is the superlative used to compare three or more items.' },
    { id: 6, type: 'multiple-choice', emoji: '📚', question: 'Which word is a demonstrative adjective in "that book"?', options: ['that', 'book', 'is', 'the'], correct: 0, explanation: '"That" modifies the noun "book" and acts as a demonstrative adjective.' },
    { id: 7, type: 'multiple-choice', emoji: '⚖️', question: 'Which adjective shows quantity?', options: ['tall', 'several', 'blue', 'loud'], correct: 1, explanation: '"Several" indicates quantity.' },
    { id: 8, type: 'multiple-choice', emoji: '🧩', question: 'Which word is an attributive adjective?', options: ['The broken window', 'He broke the window', 'Window broke', 'Brokenly the window'], correct: 0, explanation: 'Attributive adjectives come before the noun they modify.' },
    { id: 9, type: 'multiple-choice', emoji: '🔁', question: 'Which is a predicate adjective?', options: ['The sky is blue', 'Blue sky', 'Sky-blue', 'Blueish'], correct: 0, explanation: 'A predicate adjective follows a linking verb and describes the subject.' },
    { id: 10, type: 'multiple-choice', emoji: '🏷️', question: 'Identify the adjective: "Three dogs barked."', options: ['dogs', 'barked', 'Three', 'None'], correct: 2, explanation: '"Three" describes how many dogs, so it is an adjective.' }
  ]
};

export const adjectiveQuizzesBasic = [ { id: 1, type:'multiple-choice', question:'What does an adjective do?', options:['Names a person', 'Describes a noun', 'Shows action', 'Connects words'], correct:1, explanation:'An adjective describes or modifies a noun.' } ];

// Adverbs quizzes
export const adverbQuizzes = {
  comprehensive: [
    { id: 1, type: 'multiple-choice', emoji: '⚙️', question: 'Which word is an adverb?', options: ['quick', 'quickly', 'quickness', 'quickest'], correct: 1, explanation: 'Adverbs often end in -ly and modify verbs, adjectives, or other adverbs.' },
    { id: 2, type: 'multiple-choice', emoji: '⏱️', question: 'Choose the adverb of frequency.', options: ['never', 'blue', 'four', 'tall'], correct: 0 },
    { id: 3, type: 'multiple-choice', emoji: '📍', question: 'Which adverb shows place?', options: ['here', 'quick', 'many', 'red'], correct: 0 },
    { id: 4, type: 'multiple-choice', emoji: '🕒', question: 'Which adverb shows time?', options: ['tomorrow', 'happy', 'loud', 'this'], correct: 0 },
    { id: 5, type: 'multiple-choice', emoji: '🔁', question: 'Which is a degree adverb?', options: ['very', 'run', 'book', 'city'], correct: 0 },
    { id: 6, type: 'multiple-choice', emoji: '✳️', question: 'Identify the adverb in: "She sings beautifully."', options: ['She', 'sings', 'beautifully', 'None'], correct: 2 },
    { id: 7, type: 'multiple-choice', emoji: '🔍', question: 'Which adverb modifies an adjective in "very tall"?', options: ['very', 'tall', 'taller', 'most'], correct: 0 },
    { id: 8, type: 'multiple-choice', emoji: '🔗', question: 'Choose the adverb modifying another adverb: "He ran very quickly."', options: ['very', 'quickly', 'ran', 'he'], correct: 0 },
    { id: 9, type: 'multiple-choice', emoji: '⚖️', question: 'Which sentence contains an adverb of manner?', options: ['She spoke softly.', 'She has a soft voice.', 'Soft voice', 'Speak soft'], correct: 0 },
    { id: 10, type: 'multiple-choice', emoji: '🏁', question: 'Which word is NOT an adverb?', options: ['slowly', 'silent', 'often', 'here'], correct: 1 }
  ]
};

export const adverbQuizzesBasic = [ { id:1, type:'multiple-choice', question:'What does an adverb modify?', options:['Noun', 'Verb/Adjective/Adverb', 'Preposition', 'Conjunction'], correct:1, explanation:'Adverbs modify verbs, adjectives, or other adverbs.' } ];

// Prepositions quizzes
export const prepositionQuizzes = {
  comprehensive: [
    { id:1, type:'multiple-choice', emoji:'🌉', question:'Which word is a preposition?', options:['under', 'run', 'happy', 'quickly'], correct:0, explanation:'Prepositions show relationships like place, time, or direction.' },
    { id:2, type:'multiple-choice', emoji:'📍', question:'Choose the preposition of place.', options:['on', 'will', 'big', 'blue'], correct:0 },
    { id:3, type:'multiple-choice', emoji:'🕒', question:'Which is a preposition of time?', options:['during', 'talk', 'loud', 'fast'], correct:0 },
    { id:4, type:'multiple-choice', emoji:'🔁', question:'Which sentence uses a preposition correctly?', options:['She sat on the chair.', 'She sat the chair.', 'She sat chair on.', 'She on sat the chair.'], correct:0 },
    { id:5, type:'multiple-choice', emoji:'🔗', question:'Identify the preposition in: "He walked to the park."', options:['He', 'walked', 'to', 'park'], correct:2 },
    { id:6, type:'multiple-choice', emoji:'✳️', question:'Which preposition shows direction?', options:['toward', 'red', 'quickly', 'tall'], correct:0 },
    { id:7, type:'multiple-choice', emoji:'🔍', question:'Which pair is preposition + object?', options:['in the box', 'run quickly', 'blue sky', 'she sings'], correct:0 },
    { id:8, type:'multiple-choice', emoji:'⚖️', question:'Which is NOT a preposition?', options:['between', 'under', 'because', 'above'], correct:2 },
    { id:9, type:'multiple-choice', emoji:'📚', question:'Choose the correct preposition: "She arrived ___ Monday."', options:['on', 'in', 'at', 'by'], correct:0 },
    { id:10, type:'multiple-choice', emoji:'🏷️', question:'Which sentence uses a phrasal preposition?', options:['She looked forward to the trip.', 'She looked the trip.', 'She the trip looked.', 'Looked she trip.'], correct:0 }
  ]
};

export const prepositionQuizzesBasic = [ { id:1, type:'multiple-choice', question:'What does a preposition show?', options:['Action', 'Relationship (place/time)', 'Description', 'Question'], correct:1, explanation:'Prepositions show relationships between nouns/pronouns and other words.' } ];

// Conjunctions quizzes
export const conjunctionQuizzes = {
  comprehensive: [
    { id:1, type:'multiple-choice', emoji:'🔗', question:'Which word is a coordinating conjunction?', options:['and', 'because', 'although', 'while'], correct:0, explanation:'Coordinating conjunctions join equal parts (and, but, or).'},
    { id:2, type:'multiple-choice', emoji:'⚖️', question:'Choose the subordinating conjunction.', options:['but', 'or', 'because', 'and'], correct:2 },
    { id:3, type:'multiple-choice', emoji:'🔁', question:'Which conjunction is correlative?', options:['either...or', 'and', 'but', 'so'], correct:0 },
    { id:4, type:'multiple-choice', emoji:'📍', question:'Which sentence uses a conjunction correctly?', options:['I wanted to go, but it rained.', 'I wanted to go but it rained', 'I wanted go but, it rained', 'But it rained I wanted to go'], correct:0 },
    { id:5, type:'multiple-choice', emoji:'🔍', question:'Which pair is a conjunction and its type?', options:['although - subordinating', 'and - subordinating', 'but - correlative', 'or - subordinating'], correct:0 },
    { id:6, type:'multiple-choice', emoji:'🧩', question:'Which conjunction can show contrast?', options:['but', 'and', 'or', 'so'], correct:0 },
    { id:7, type:'multiple-choice', emoji:'✳️', question:'Which is NOT a conjunction?', options:['although', 'however', 'and', 'but'], correct:1, explanation:'"However" is a conjunctive adverb, not a conjunction.' },
    { id:8, type:'multiple-choice', emoji:'📚', question:'Choose the conjunction to complete: "I will go ___ I feel better."', options:['if', 'and', 'but', 'or'], correct:0 },
    { id:9, type:'multiple-choice', emoji:'🏷️', question:'Which conjunction pairs with "neither"?', options:['nor', 'and', 'but', 'or'], correct:0 },
    { id:10, type:'multiple-choice', emoji:'⚡', question:'Which conjunction shows result?', options:['so', 'but', 'and', 'either'], correct:0 }
  ]
};

export const conjunctionQuizzesBasic = [ { id:1, type:'multiple-choice', question:'What does a conjunction do?', options:['Modifies a verb', 'Joins words/clauses', 'Shows position', 'Expresses emotion'], correct:1 } ];

// Determiners quizzes
export const determinerQuizzes = {
  comprehensive: [
    { id:1, type:'multiple-choice', emoji:'🔎', question:'Which word is a determiner?', options:['the', 'run', 'happy', 'quickly'], correct:0, explanation:'Determiners appear before nouns to show reference (the, a, this, my).' },
    { id:2, type:'multiple-choice', emoji:'📦', question:'Which determiner shows possession?', options:['my', 'the', 'and', 'but'], correct:0 },
    { id:3, type:'multiple-choice', emoji:'🔢', question:'Which determiner indicates quantity?', options:['few', 'run', 'blue', 'loud'], correct:0 },
    { id:4, type:'multiple-choice', emoji:'📍', question:'Choose the demonstrative determiner.', options:['this', 'quick', 'is', 'they'], correct:0 },
    { id:5, type:'multiple-choice', emoji:'📚', question:'Which is an indefinite determiner?', options:['some', 'the', 'this', 'my'], correct:0 },
    { id:6, type:'multiple-choice', emoji:'🔁', question:'Which sentence has a determiner?', options:['A cat slept on the mat.', 'Cat slept mat.', 'Slept cat on mat.', 'Cat the slept mat.'], correct:0 },
    { id:7, type:'multiple-choice', emoji:'🔍', question:'Which determiner is plural?', options:['these', 'this', 'a', 'an'], correct:0 },
    { id:8, type:'multiple-choice', emoji:'⚖️', question:'Which determiner is used for uncountable nouns?', options:['some', 'a', 'many', 'several'], correct:0 },
    { id:9, type:'multiple-choice', emoji:'🏷️', question:'Which determiner pairs with nouns: "___ water"', options:['some', 'a', 'an', 'many'], correct:0 },
    { id:10, type:'multiple-choice', emoji:'✳️', question:'Which is NOT a determiner?', options:['the', 'and', 'my', 'this'], correct:1 }
  ]
};

export const determinerQuizzesBasic = [ { id:1, type:'multiple-choice', question:'What is a determiner?', options:['A type of verb', 'A word that introduces a noun', 'A kind of adverb', 'A conjunction'], correct:1 } ];

// Interjections quizzes
export const interjectionQuizzes = {
  comprehensive: [
    { id:1, type:'multiple-choice', emoji:'🎉', question:'Which word is an interjection?', options:['Wow!', 'Run', 'Blue', 'Quickly'], correct:0, explanation:'Interjections express emotion and stand alone.' },
    { id:2, type:'multiple-choice', emoji:'😮', question:'Which sentence contains an interjection?', options:['Oh, I forgot!', 'I forgot', 'Forgot I', 'I oh forgot'], correct:0 },
    { id:3, type:'multiple-choice', emoji:'⚡', question:'Choose the interjection for surprise.', options:['Wow', 'But', 'And', 'If'], correct:0 },
    { id:4, type:'multiple-choice', emoji:'👏', question:'Which is a greeting interjection?', options:['Hello!', 'Run!', 'Blue!', 'Quick!'], correct:0 },
    { id:5, type:'multiple-choice', emoji:'🔔', question:'Which interjection expresses pain?', options:['Ouch!', 'Yay!', 'Hello!', 'Hmm'], correct:0 },
    { id:6, type:'multiple-choice', emoji:'🤔', question:'Which interjection shows thinking?', options:['Hmm', 'Run', 'Fast', 'Blue'], correct:0 },
    { id:7, type:'multiple-choice', emoji:'🎯', question:'Which is NOT an interjection?', options:['And', 'Wow', 'Ouch', 'Hey'], correct:0 },
    { id:8, type:'multiple-choice', emoji:'🔍', question:'Which interjection shows agreement?', options:['Yes!', 'No!', 'Maybe', 'Run'], correct:0 },
    { id:9, type:'multiple-choice', emoji:'🏷️', question:'Which interjection indicates hesitation?', options:['Um', 'Wow', 'Hey', 'Ouch'], correct:0 },
    { id:10, type:'multiple-choice', emoji:'✳️', question:'Which interjection is used to get attention?', options:['Hey!', 'Run!', 'Blue!', 'Quick!'], correct:0 }
  ]
};

export const interjectionQuizzesBasic = [ { id:1, type:'multiple-choice', question:'What do interjections express?', options:['Emotion or reaction', 'Ownership', 'Quantity', 'Time'], correct:0 } ];
