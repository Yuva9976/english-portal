import os

path = r'c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend\src\pages\GrammarHub\VocabularyHub.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Soften semantic meaning label to teal
content = content.replace(
    'font-black text-slate-300 uppercase tracking-widest mb-2">Semantic Meaning',
    'font-bold text-teal-400 uppercase tracking-widest mb-2 px-1">Semantic Meaning'
)
# Soften definition text
content = content.replace(
    'text-slate-700 font-bold text-lg leading-tight line-clamp-2">',
    'text-slate-600 font-semibold text-base leading-tight line-clamp-2 px-1">'
)
# Soften card border separator
content = content.replace(
    'border-t border-slate-50">',
    'border-t border-teal-50">'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Vocabulary Hub typography updated.")
