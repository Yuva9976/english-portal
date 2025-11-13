// Complete Grammar Topics Data
const grammarData = {
  "categories": [
    {
      "id": "parts-of-speech",
      "title": "Parts of Speech",
      "icon": "📚",
      "description": "Learn the 9 fundamental building blocks of English sentences",
      "color": "blue",
      "topics": [
        {
          "id": "verbs",
          "title": "Verbs",
          "icon": "🏃",
          "subtitle": "Action and State Verbs",
          "description": "Verbs express actions (run, write) or states (be, have, know)",
          "content": {
            "definition": "A verb is a word that expresses an action, occurrence, or state of being.",
            "types": [
              {
                "name": "Action Verbs",
                "explanation": "Express physical or mental actions",
                "examples": ["run", "jump", "think", "believe", "write", "study"]
              },
              {
                "name": "State Verbs",
                "explanation": "Express states, feelings, or conditions (not actions)",
                "examples": ["be", "have", "know", "love", "understand", "belong"]
              },
              {
                "name": "Transitive Verbs",
                "explanation": "Require an object to complete their meaning",
                "examples": ["She bought a car", "He reads books", "They love pizza"]
              },
              {
                "name": "Intransitive Verbs",
                "explanation": "Don't need an object",
                "examples": ["Birds fly", "She laughed", "The sun rises"]
              }
            ],
            "rules": [
              "Verbs change form based on tense (present, past, future)",
              "Verbs must agree with their subject in number (singular/plural)",
              "State verbs are rarely used in continuous tenses"
            ]
          },
          "exercises": [
            {
              "type": "fill-blank",
              "question": "Complete the sentences with the correct verb form:",
              "items": [
                {
                  "sentence": "She ___ (go) to school every day.",
                  "answer": "goes",
                  "options": ["go", "goes", "going", "gone"],
                  "explanation": "Use 'goes' for third person singular in present simple."
                },
                {
                  "sentence": "We ___ (have) dinner at 7pm yesterday.",
                  "answer": "had",
                  "options": ["have", "has", "had", "having"],
                  "explanation": "'Had' is the past tense of 'have'."
                },
                {
                  "sentence": "They ___ (study) right now.",
                  "answer": "are studying",
                  "options": ["study", "studies", "are studying", "studied"],
                  "explanation": "Use present continuous (are + verb+ing) for actions happening now."
                }
              ]
            }
          ]
        },
        {
          "id": "nouns",
          "title": "Nouns",
          "icon": "🏠",
          "subtitle": "People, Places, and Things",
          "description": "Nouns name people (John), places (London), things (book), or ideas (love)",
          "content": {
            "definition": "A noun is a word that names a person, place, thing, or idea.",
            "types": [
              {
                "name": "Common Nouns",
                "explanation": "General names for things",
                "examples": ["dog", "city", "teacher", "book", "car", "happiness"]
              },
              {
                "name": "Proper Nouns",
                "explanation": "Specific names (always capitalized)",
                "examples": ["London", "Sarah", "Monday", "English", "December", "Tesla"]
              },
              {
                "name": "Countable Nouns",
                "explanation": "Can be counted (have singular and plural forms)",
                "examples": ["one apple/two apples", "a car/three cars", "one child/many children"]
              },
              {
                "name": "Uncountable Nouns",
                "explanation": "Cannot be counted (no plural form)",
                "examples": ["water", "rice", "information", "advice", "furniture", "music"]
              }
            ],
            "rules": [
              "Plural nouns usually add -s or -es (book → books, box → boxes)",
              "Some nouns have irregular plurals (child → children, man → men)",
              "Uncountable nouns use singular verbs (The water is cold)",
              "Proper nouns always start with a capital letter"
            ]
          },
          "exercises": [
            {
              "type": "mcq",
              "question": "Choose the correct answer:",
              "questions": [
                {
                  "question": "Which is the correct plural form of 'child'?",
                  "options": ["childs", "children", "childes", "childrens"],
                  "answer": 1,
                  "explanation": "'Children' is the irregular plural form of 'child'."
                },
                {
                  "question": "Which word is an uncountable noun?",
                  "options": ["apple", "information", "book", "chair"],
                  "answer": 1,
                  "explanation": "'Information' is uncountable. You cannot say 'two informations'."
                },
                {
                  "question": "Which sentence is correct?",
                  "options": [
                    "The furnitures are expensive",
                    "The furniture is expensive",
                    "The furniture are expensive",
                    "The furnitures is expensive"
                  ],
                  "answer": 1,
                  "explanation": "'Furniture' is uncountable and uses a singular verb."
                }
              ]
            }
          ]
        },
        {
          "id": "adjectives",
          "title": "Adjectives",
          "icon": "🎨",
          "subtitle": "Describing Words",
          "description": "Adjectives describe or modify nouns (beautiful, large, happy)",
          "content": {
            "definition": "An adjective is a word that describes or gives more information about a noun.",
            "types": [
              {
                "name": "Descriptive Adjectives",
                "explanation": "Describe qualities or characteristics",
                "examples": ["beautiful", "tall", "intelligent", "red", "old", "expensive"]
              },
              {
                "name": "Comparative Adjectives",
                "explanation": "Compare two things",
                "examples": ["bigger", "more beautiful", "better", "faster", "happier"]
              },
              {
                "name": "Superlative Adjectives",
                "explanation": "Show the highest degree (comparing 3+ things)",
                "examples": ["biggest", "most beautiful", "best", "fastest", "happiest"]
              }
            ],
            "rules": [
              "Adjectives usually come before nouns: a red car",
              "Short adjectives add -er/-est: big → bigger → biggest",
              "Long adjectives use more/most: beautiful → more beautiful → most beautiful",
              "Some adjectives are irregular: good → better → best"
            ]
          },
          "exercises": [
            {
              "type": "fill-blank",
              "question": "Write the correct form of the adjective:",
              "items": [
                {
                  "sentence": "This book is ___ than that one. (interesting)",
                  "answer": "more interesting",
                  "options": ["interesting", "more interesting", "most interesting", "interestinger"],
                  "explanation": "Use 'more' with long adjectives for comparatives."
                },
                {
                  "sentence": "She is the ___ student in class. (good)",
                  "answer": "best",
                  "options": ["good", "better", "best", "most good"],
                  "explanation": "'Best' is the irregular superlative form of 'good'."
                },
                {
                  "sentence": "Today is ___ than yesterday. (hot)",
                  "answer": "hotter",
                  "options": ["hot", "hotter", "more hot", "hottest"],
                  "explanation": "Short adjectives add -er for comparatives."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "verb-tenses",
      "title": "Verb Tenses",
      "icon": "⏰",
      "description": "Master all 12 English tenses with examples and usage",
      "color": "green",
      "topics": [
        {
          "id": "present-simple",
          "title": "Present Simple",
          "icon": "🔄",
          "subtitle": "Habits, Facts, and Routines",
          "description": "For habits, routines, facts, and general truths",
          "content": {
            "definition": "The present simple tense expresses habits, facts, and general truths.",
            "types": [
              {
                "name": "Habits and Routines",
                "explanation": "Regular actions we do repeatedly",
                "examples": [
                  "I drink coffee every morning",
                  "She goes to the gym three times a week",
                  "They work from Monday to Friday"
                ]
              },
              {
                "name": "General Truths and Facts",
                "explanation": "Things that are always true",
                "examples": [
                  "The sun rises in the east",
                  "Water boils at 100 degrees Celsius",
                  "Dogs have four legs"
                ]
              },
              {
                "name": "Scheduled Events",
                "explanation": "Fixed timetables and schedules",
                "examples": [
                  "The train leaves at 8am",
                  "The store opens at 9am",
                  "The class starts at 10am"
                ]
              }
            ],
            "rules": [
              "Add -s or -es for he/she/it: She works, He watches",
              "Use do/does for negatives: I don't work, She doesn't work",
              "Use do/does for questions: Do you work? Does she work?",
              "Time markers: every day, always, usually, often, sometimes, never"
            ]
          },
          "exercises": [
            {
              "type": "mcq",
              "question": "Choose the correct present simple form:",
              "questions": [
                {
                  "question": "She ___ to school every day.",
                  "options": ["go", "goes", "going", "gone"],
                  "answer": 1,
                  "explanation": "Use 'goes' for third person singular (he/she/it)."
                },
                {
                  "question": "They ___ pizza very often.",
                  "options": ["doesn't eat", "don't eat", "not eat", "aren't eat"],
                  "answer": 1,
                  "explanation": "Use 'don't' with plural subjects and 'I/you'."
                },
                {
                  "question": "___ he speak English?",
                  "options": ["Do", "Does", "Is", "Are"],
                  "answer": 1,
                  "explanation": "Use 'Does' for questions with he/she/it."
                },
                {
                  "question": "Water ___ at 100 degrees.",
                  "options": ["boil", "boils", "boiling", "boiled"],
                  "answer": 1,
                  "explanation": "Use 'boils' for general facts with singular subjects."
                }
              ]
            }
          ]
        },
        {
          "id": "present-continuous",
          "title": "Present Continuous",
          "icon": "▶️",
          "subtitle": "Actions Happening Now",
          "description": "For actions happening right now or around now",
          "content": {
            "definition": "The present continuous tense expresses actions in progress now or temporary situations.",
            "types": [
              {
                "name": "Actions Happening Now",
                "explanation": "What is happening at this moment",
                "examples": [
                  "I am studying right now",
                  "She is cooking dinner",
                  "They are watching TV"
                ]
              },
              {
                "name": "Temporary Situations",
                "explanation": "Actions happening around now but not permanently",
                "examples": [
                  "She is staying with friends this week",
                  "I'm reading a great book these days",
                  "He's working on a special project this month"
                ]
              },
              {
                "name": "Future Arrangements",
                "explanation": "Planned future events",
                "examples": [
                  "We are meeting tomorrow at 5pm",
                  "I'm flying to Paris next week",
                  "They're having a party on Saturday"
                ]
              }
            ],
            "rules": [
              "Form: am/is/are + verb+ing",
              "Negative: am/is/are + not + verb+ing",
              "Question: Am/Is/Are + subject + verb+ing?",
              "Time markers: now, right now, at the moment, currently, today, this week"
            ]
          },
          "exercises": [
            {
              "type": "fill-blank",
              "question": "Complete with the present continuous form:",
              "items": [
                {
                  "sentence": "She ___ (study) for her exam right now.",
                  "answer": "is studying",
                  "options": ["study", "studies", "is studying", "studied"],
                  "explanation": "Use 'is studying' for actions happening now with she."
                },
                {
                  "sentence": "They ___ (not/watch) TV at the moment.",
                  "answer": "aren't watching",
                  "options": ["don't watch", "aren't watching", "not watch", "isn't watching"],
                  "explanation": "Use 'aren't watching' for negative present continuous with they."
                },
                {
                  "sentence": "What ___ you ___ (do) tomorrow?",
                  "answer": "are/doing",
                  "options": ["do/do", "are/doing", "do/doing", "are/do"],
                  "explanation": "Use 'are doing' for future arrangements."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sentence-structure",
      "title": "Sentence Structure",
      "icon": "🏗️",
      "description": "Learn how to build correct English sentences",
      "color": "purple",
      "topics": [
        {
          "id": "word-order",
          "title": "Word Order",
          "icon": "📝",
          "subtitle": "Subject-Verb-Object Pattern",
          "description": "The basic pattern for building English sentences",
          "content": {
            "definition": "English follows a Subject-Verb-Object (SVO) word order in most sentences.",
            "types": [
              {
                "name": "Basic SVO Pattern",
                "explanation": "Subject + Verb + Object",
                "examples": [
                  "She (S) reads (V) books (O)",
                  "They (S) play (V) football (O)",
                  "I (S) love (V) pizza (O)"
                ]
              },
              {
                "name": "With Adjectives",
                "explanation": "Adjectives come BEFORE nouns",
                "examples": [
                  "She reads interesting books",
                  "They play exciting football",
                  "I love delicious pizza"
                ]
              },
              {
                "name": "With Adverbs",
                "explanation": "Adverbs can go in different positions",
                "examples": [
                  "She always reads books",
                  "They play football well",
                  "I really love pizza"
                ]
              }
            ],
            "rules": [
              "Adjectives come BEFORE nouns: a beautiful house (not a house beautiful)",
              "Adverbs of frequency go BEFORE main verbs: She always arrives early",
              "Time expressions usually come at the END: I go to work at 8am",
              "Don't separate verb and object: I like very much pizza ✗ → I like pizza very much ✓"
            ]
          },
          "exercises": [
            {
              "type": "mcq",
              "question": "Choose the sentence with correct word order:",
              "questions": [
                {
                  "question": "Which sentence is correct?",
                  "options": [
                    "She always is late",
                    "She is always late",
                    "Always she is late",
                    "She is late always"
                  ],
                  "answer": 1,
                  "explanation": "Adverbs of frequency go after 'be': She is always late."
                },
                {
                  "question": "Which sentence is correct?",
                  "options": [
                    "He bought yesterday a car",
                    "Yesterday he bought a car",
                    "He a car bought yesterday",
                    "A car he bought yesterday"
                  ],
                  "answer": 1,
                  "explanation": "Time expressions can go at the beginning or end."
                },
                {
                  "question": "Which sentence is correct?",
                  "options": [
                    "I like very much chocolate",
                    "I very much like chocolate",
                    "I like chocolate very much",
                    "Very much I like chocolate"
                  ],
                  "answer": 2,
                  "explanation": "Don't separate verb and object: verb + object + adverb."
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "quickReference": {
    "commonMistakes": [
      {"wrong": "She go to school", "right": "She goes to school", "rule": "Add 's' for he/she/it in present simple"},
      {"wrong": "I am agree", "right": "I agree", "rule": "State verbs don't use continuous form"},
      {"wrong": "He is more tall than me", "right": "He is taller than me", "rule": "Short adjectives add -er"},
      {"wrong": "I have 25 years", "right": "I am 25 years old", "rule": "Use 'be' for age, not 'have'"},
      {"wrong": "She don't like coffee", "right": "She doesn't like coffee", "rule": "Use 'doesn't' with he/she/it"}
    ],
    "irregularVerbs": [
      {"base": "go", "past": "went", "pastParticiple": "gone"},
      {"base": "see", "past": "saw", "pastParticiple": "seen"},
      {"base": "buy", "past": "bought", "pastParticiple": "bought"},
      {"base": "write", "past": "wrote", "pastParticiple": "written"},
      {"base": "do", "past": "did", "pastParticiple": "done"},
      {"base": "have", "past": "had", "pastParticiple": "had"},
      {"base": "make", "past": "made", "pastParticiple": "made"},
      {"base": "take", "past": "took", "pastParticiple": "taken"}
    ]
  }
};

export default grammarData;
