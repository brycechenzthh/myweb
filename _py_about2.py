# -*- coding: utf-8 -*-
import io, re

path = r'C:\Users\1\Doubao\chats\2026-08-31\new-chat\cxkk-site\about.html'
data = io.open(path, 'r', encoding='utf-8', newline='').read()
NL = '\r\n' if '\r\n' in data else '\n'

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

# 1) 导航替换
nav_pattern = re.compile(r'<nav class="nav-menu">.*?</nav>\s*<div class="nav-right">\s*<a class="nav-link[^>]*>.*?</a>\s*', re.DOTALL)
nav_replacement = '<nav class="nav-menu" id="navMenu"></nav>\n    <div class="nav-right">\n'
data, n1 = nav_pattern.subn(nav_replacement, data, count=1)

# 2) 调用：applyConfig 闭合前
marker = '      aboutLogo.innerHTML = \'\'; aboutLogo.textContent = logoText;' + NL + '    }' + NL + '  }'
add = '      aboutLogo.innerHTML = \'\'; aboutLogo.textContent = logoText;' + NL + '    }' + NL + '    renderNav(cfg);' + NL + '  }'
assert marker in data, 'marker not found'
data = data.replace(marker, add, 1)
n2 = 1

# 3) 函数定义插入
idx = data.rfind('</script>')
if idx >= 0:
    data = data[:idx] + RENDER_FN + NL + data[idx:]
    n3 = 1
else:
    n3 = 0

if NL == '\r\n':
    data = data.replace('\r\n', '\n').replace('\n', '\r\n')
with io.open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(data)
print('about.html OK n1=%d n2=%d n3=%d size=%d' % (n1, n2, n3, len(data)))
v = io.open(path, 'r', encoding='utf-8').read()
print('navMenu:', 'id="navMenu"' in v, '| renderNav def:', 'function renderNav' in v, '| call:', 'renderNav(cfg);' in v)
