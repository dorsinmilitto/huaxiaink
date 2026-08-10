import re, os

os.chdir(r'D:\电信星辰智能体空间\网站变现\huaxiaink')
path = 'node_modules/gray-matter/index.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'AIGC_BLOCK_REMOVAL' in content:
    print('Already patched')
else:
    old = 'function matter(str, options) {'
    new = '''function matter(str, options) {
  // AIGC_BLOCK_REMOVAL: strip AIGC watermark blocks
  str = str.replace(/\\n---[\\s\\S]*?\\nAIGC:[\\s\\S]*?(?=\\n---|$)/gi, '');
  str = str.replace(/\\n> \\[AIGC\\][\\s\\S]*?(?=\\n---|$)/gi, '');'''
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Patched successfully')
