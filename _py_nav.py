# -*- coding: utf-8 -*-
import io, re, shutil

base = r'C:\Users\1\Doubao\chats\2026-08-31\new-chat\cxkk-site'
files = ['index.html','articles.html','tutorials.html','article.html','about.html','links.html']

# 渲染函数（插入各文件最后一个 </script> 前）
RENDER_FN = """
  const DEFAULT_NAV = [
    { label: '\u9996\u9875', url: '/' },
    { label: '\u5168\u90e8\u6587\u7ae0', url: '/articles.html' },
    { label: '\u8f6f\u4ef6', url: '/apps.html' },
    { label: '\u6559\u7a0b', url: '/tutorials.html' },
    { label: '\u5173\u4e8e', url: '/about.html' },
    { label: '\u7f51\u76d8', url: '/drive.html' },
    { label: '\u94fe\u63a5', url: '/links.html' }
  ];

  function renderNav(cfg){
    const menu = document.getElementById('navMenu');
    if (!menu) return;
    const nav = (cfg.nav && cfg.nav.length) ? cfg.nav : DEFAULT_NAV;
    const cur = (location.pathname.split('/').pop() || 'index').replace(/\\.html$/, '');
    menu.innerHTML = nav.map(n => {
      const href = n.url || '/';
      const target = (href === '/' ? '' : (href.split('?')[0].split('/').pop().replace(/\\.html$/, '') || 'index'));
      const active = (target === cur) ? ' class="active"' : '';
      const ext = n.external ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + href.replace(/"/g, '&quot;') + '"' + active + ext + '>' +
             String(n.label || '').replace(/</g, '&lt;') + '</a>';
    }).join('');
  }
"""

nav_pattern = re.compile(r'<nav class="nav-menu">.*?</nav>\s*<div class="nav-right">\s*<a class="nav-link[^>]*>.*?</a>\s*', re.DOTALL)
nav_replacement = '<nav class="nav-menu" id="navMenu"></nav>\n    <div class="nav-right">\n'
badge_marker = "badge.textContent = (cfg.logo_text || cfg.name || 'cx').slice(0, 2);"

for fn in files:
    path = base + '\\' + fn
    data = io.open(path, 'r', encoding='utf-8', newline='').read()
    NL = '\r\n' if '\r\n' in data else '\n'
    orig = data

    # 1) 导航块替换
    new_data, n1 = nav_pattern.subn(nav_replacement, data, count=1)
    # 2) badge 后加调用（用 NL 统一行尾，最后统一转换）
    if badge_marker in new_data:
        new_data = new_data.replace(badge_marker, badge_marker + NL + '    renderNav(cfg);', 1)
        n2 = 1
    else:
        n2 = 0
    # 3) 末尾插入渲染函数
    idx = new_data.rfind('</script>')
    if idx >= 0:
        new_data = new_data[:idx] + RENDER_FN + NL + new_data[idx:]
        n3 = 1
    else:
        n3 = 0

    if n1 != 1 or n2 != 1 or n3 != 1:
        print(fn, 'WARN: n1=%d n2=%d n3=%d' % (n1, n2, n3))
    else:
        # 统一行尾为原文件风格
        if NL == '\r\n':
            new_data = new_data.replace('\r\n', '\n').replace('\n', '\r\n')
        shutil.copy2(path, path + '.bak')
        with io.open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_data)
        print(fn, 'OK  n1=%d n2=%d n3=%d  size=%d' % (n1, n2, n3, len(new_data)))

print('done')
