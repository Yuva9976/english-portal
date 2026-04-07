p = r'c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend\src\pages\GrammarHub\VocabularyHub.jsx'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

# Replace the word title h3 - add teal-pink gradient text
old_part = "font-bold text-slate-800 tracking-tighter leading-none"
new_part = "font-black tracking-tighter leading-none"

old_style = '''style={{ fontFamily: "'Outfit', sans-serif" }}>{word.word}</h3>'''
new_style = '''style={{ fontFamily: "'Outfit', sans-serif", background: 'linear-gradient(135deg, #0D9488 0%, #F43F5E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{word.word}</h3>'''

c = c.replace(old_part, new_part)
c = c.replace(old_style, new_style)

with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

print('Done! Gradient applied to word titles.')
