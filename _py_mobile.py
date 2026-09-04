# -*- coding: utf-8 -*-
import io, re, shutil

base = r'C:\Users\1\Doubao\chats\2026-08-31\new-chat\cxkk-site'
files = ['index.html','articles.html','tutorials.html','article.html','about.html','links.html','apps.html','drive.html']

CSS_ADD = """
  .nav-toggle{display:none;background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-2);line-height:1;padding:4px 2px}
  @media (max-width:900px){
    .nav-toggle{display:block}
    .nav-menu{display:none;position:absolute;top:60px;left:0;right:0;background:#fff;border-bottom:1px solid var(--border);flex-direction:column;padding:8px 20px;box-shadow:0 10px 24px rgba(20,40,80,.12);z-index:99}
    .nav-menu.open{display:flex}
    .nav-menu a{padding:13px 4px;border-bottom:1px dashed var(--border);font-size:15px}
    .nav-menu a:last-child{border-bottom:none}
  }
"""

JS_ADD = """
  function toggleNav(){
    const m = document.getElementById('navMenu');
    if (m) m.classList.toggle('open');
  }
  document.addEventListener('click', e => {
    const m = document.getElementById('navMenu');
    const t = document.getElementById('navToggle');
    if (m && t && !m.contains(e.target) && !t.contains(e.target)) m.classList.remove('open');
  });
"""

for fn in files:
    path = base + '\\' + fn
    data = io.open(path, 'r', encoding='utf-8', newline='').read()
    NL = '\r\n' if '\r\n' in data else '\n'
    orig = data
    problems = []

    # 1) 删除原有的 900px nav-menu display:none 媒体查询（若有）
    data2 = re.sub(r'@media \(max-width:900px\)\{\s*\.nav-menu\{display:none\}\s*\}', '', data)
    if data2 != data:
        # 可能有换行/空格变体
        pass
    data = data2
    # 更宽松：删除任何仅含 nav-menu display:none 的 900px MQ（含内部换行）
    data = re.sub(r'@media \(max-width:900px\)\{\s*\r?\n?\s*\.nav-menu\{display:none\}\s*\r?\n?\s*\}', '', data)

    # 2) CSS 插入（在最后一个 </style> 前）
    i_style = data.rfind('</style>')
    if i_style >= 0:
        data = data[:i_style] + CSS_ADD + NL + data[i_style:]
    else:
        problems.append('no </style>')

    # 3) HTML 加汉堡按钮（nav-right 内、最前）
    old_nr = '<div class="nav-right">'
    if old_nr in data:
        data = data.replace(old_nr, '<div class="nav-right">' + NL + '      <button class="nav-toggle" id="navToggle" onclick="toggleNav()">☰</button>', 1)
    else:
        problems.append('no nav-right')

    # 4) JS 函数插入（最后一个 </script> 前）
    i_js = data.rfind('</script>')
    if i_js >= 0:
        data = data[:i_js] + JS_ADD + NL + data[i_js:]
    else:
        problems.append('no </script>')

    # 5) 统一行尾
    if NL == '\r\n':
        data = data.replace('\r\n', '\n').replace('\n', '\r\n')

    # 验证
    v = data.replace('\r\n', '\n').replace('\r', '\n')
    checks = {
        'toggle css': '.nav-toggle{display:none' in v,
        'toggle html': 'id="navToggle"' in v,
        'toggle js': 'function toggleNav' in v,
        'mq open': '.nav-menu.open{display:flex}' in v,
        'size ok': len(data) > 5000
    }
    ok = all(checks.values()) and not problems
    if ok:
        shutil.copy2(path, path + '.bak')
        with io.open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(data)
        print(fn, 'OK', {k: v for k, v in checks.items() if not v}, 'size=', len(data))
    else:
        print(fn, 'FAIL problems=', problems, checks, 'size=', len(data))

print('done')
