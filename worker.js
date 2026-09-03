// cxkk Worker：静态资源 + 链接数据（KV 持久化）+ 管理登录鉴权
const DEFAULT_LINKS = [
  {label:"V381", value:"https://silver.yukaidi.com/f/d/Nnwehe/1.exe"},
  {label:"驱动和激活", value:"https://silver.yukaidi.com/f/rrEjiN/2.exe"},
  {label:"XOS11", value:"https://silver.yukaidi.com/f/ad1GTb/XOS%2011%2023H2%20V013%20CN-XLST.iso"},
  {label:"WIN10", value:"https://152.136.103.177:5245/d/cm1/Win10/22H2/zh-cn_windows_10_consumer_editions_version_22h2_updated_oct_2025_x64_dvd_38efd00d.iso"},
  {label:"WIN11", value:"https://152.136.103.177:5245/d/cm1/Win11/23H2/zh-cn_windows_11_consumer_editions_version_23h2_updated_sep_2024_x64_dvd_edcefbe4.iso"},
  {label:"FirPE", value:"https://152.136.103.177:5245/d/cm1/uc/FirPE-V1.9.2.exe"},
  {label:"小南瓜PE", value:"https://silver.yukaidi.com/f/d/d30pCZ/PE%E7%BB%B4%E6%8A%A4%E7%B3%BB%E7%BB%9F_V5%E7%BD%91%E7%BB%9C%E7%89%88V5.10.06.01.zip"},
  {label:"完整版", value:"https://silver.yukaidi.com/f/1Xrzs4/X3.8.13.zip"},
  {label:"WIT", value:"https://gitcode.com/weixin_42717364/image/releases/download/0.0.1/WIT_25H2.1.0_%E5%85%AC%E4%BC%97%E7%89%88_2025-12-1_CRC32-F24FC76A.7z"},
  {label:"FluDownload", value:"https://silver.yukaidi.com/f/bG1qtP/XDown.zip"},
  {label:"激活命令", value:"irm https://get.activated.win | iex"},
  {label:"卓越性能电源计划", value:"powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61"},
  {label:"启用电源计划", value:"powercfg -setactive"}
];

// 默认软件数据（空）
const DEFAULT_APPS = [];

// 默认站点配置
const DEFAULT_CONFIG = {
  name: 'cxkk',
  logo_text: 'cx',
  logo_url: '',
  slogan: '保持热爱，折腾不止',
  intro: '本站为个人技术分享站：软件工具、装机教程、系统激活、硬件知识。',
  footer_text: '© 2023-2026 By cxkk · 保持热爱，折腾不止',
  carousel: [
    { img: '', title: '显卡驱动升级助手', desc: '一键检测并升级 NVIDIA / AMD 显卡驱动', url: '' },
    { img: '', title: 'PE 系统制作系统 U 盘', desc: '三步制作可启动 PE 维护 U 盘', url: '' },
    { img: '', title: '一键重装系统', desc: '自动下载镜像、备份驱动、无人值守重装', url: '' }
  ]
};

// 默认文章数据
const DEFAULT_ARTICLES = [
  {title:"显卡驱动升级助手", cat:"软件", tags:["NVIDIA","AMD"], desc:"一键检测并升级 NVIDIA / AMD 显卡驱动，自动匹配最新稳定版本。", url:"", date:"26/8/18", views:"173,196", comments:"235"},
  {title:"PE 系统制作系统 U 盘", cat:"PE制作", tags:["PE"], desc:"三步制作可启动 PE 维护 U 盘，装机、重装、数据救援一步到位。", url:"", date:"26/6/1", views:"6,479", comments:"0"},
  {title:"显示器 / 主机安装教程", cat:"教程", tags:["电脑安装","屏幕安装"], desc:"显示器、主机安装与接线教程合集。", url:"", date:"26/3/12", views:"4,287", comments:"4"},
  {title:"Office 正版一键安装激活", cat:"软件", tags:["Office"], desc:"Office 正版一键安装与激活工具。", url:"", date:"26/8/25", views:"5,839", comments:"2"},
  {title:"永久激活系统 · 微软产品激活脚本", cat:"软件", tags:["激活"], desc:"微软产品永久激活脚本，支持 Windows / Office。", url:"", date:"26/7/5", views:"14,001", comments:"3"},
  {title:"一键重装系统", cat:"软件", tags:["重装"], desc:"自动下载镜像、备份驱动、无人值守重装，全程可视化进度。", url:"", date:"26/6/1", views:"35,850", comments:"30"},
  {title:"快捷烤机工具 v1.3.7", cat:"软件", tags:["烤机工具"], desc:"一键多硬件压力测试工具。", url:"", date:"26/8/1", views:"3,295", comments:"8"},
  {title:"NVIDIA GPU UEFI 固件更新工具", cat:"软件", tags:["NVIDIA"], desc:"适用于 RTX 5060 系列的 UEFI 固件更新。", url:"", date:"26/7/20", views:"1,208", comments:"0"},
  {title:"昂讯 H510M 主板 · 关闭 VT-x 和 VT-d 教程", cat:"教程", tags:["VT"], desc:"H510M 主板 BIOS 中关闭虚拟化选项教程。", url:"", date:"26/8/10", views:"487", comments:"1"},
  {title:"昂讯 H610M 主板 · 开启安全启动教程", cat:"教程", tags:["Secure Boot"], desc:"H610M 主板开启 Secure Boot 教程。", url:"", date:"26/8/9", views:"433", comments:"0"},
  {title:"微星主板 H610M · XMP 教程", cat:"教程", tags:["XMP"], desc:"微星 H610M 开启内存 XMP 教程。", url:"", date:"26/8/8", views:"803", comments:"3"},
  {title:"科脑 H610 主板 · CPU 跑分低解决教程", cat:"教程", tags:["BIOS"], desc:"科脑 H610 CPU 跑分低的原因与解决方法。", url:"", date:"26/8/7", views:"1,054", comments:"2"},
  {title:"FirPE 维护系统", cat:"PE制作", tags:["PE"], desc:"FirPE 是一款功能强大的 PE 维护系统。", url:"", date:"26/7/15", views:"2,860", comments:"1"},
  {title:"XOS 11 精简系统镜像", cat:"PE制作", tags:["系统"], desc:"XOS 11 23H2 精简优化版系统镜像。", url:"", date:"26/7/10", views:"4,120", comments:"5"}
];

// 默认管理密码（可在 Cloudflare KV 中设置 admin_pass 覆盖，推荐修改）
const DEFAULT_PASS = 'cxkk#2026';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 登录接口
    if (path === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    // 登录状态检查
    if (path === '/api/check') {
      const token = getToken(request);
      const pass = await getPass(env);
      return json({ ok: token ? await verifyToken(token, pass) : false });
    }

    // 链接数据接口
    if (path === '/links.json') {
      if (request.method === 'GET') {
        const cached = await env.LINKS_KV.get('links');
        const data = cached ? JSON.parse(cached) : DEFAULT_LINKS;
        return json(data);
      }
      if (request.method === 'PUT') {
        const token = getToken(request);
        const pass = await getPass(env);
        if (!token || !(await verifyToken(token, pass))) {
          return json({ error: 'unauthorized' }, 401);
        }
        try {
          const body = await request.json();
          if (!Array.isArray(body)) return json({ error: 'invalid payload' }, 400);
          const clean = body
            .map(x => ({
              label: String(x.label || '').slice(0, 50),
              value: String(x.value || '').slice(0, 500),
              show: x.show ? 1 : 0
            }))
            .filter(x => x.value.length > 0);
          await env.LINKS_KV.put('links', JSON.stringify(clean));
          return json({ ok: true, count: clean.length });
        } catch (e) {
          return json({ error: 'bad json' }, 400);
        }
      }
      return json({ error: 'method not allowed' }, 405);
    }

    // 软件数据接口
    if (path === '/apps.json') {
      if (request.method === 'GET') {
        const cached = await env.LINKS_KV.get('apps');
        const data = cached ? JSON.parse(cached) : DEFAULT_APPS;
        return json(data);
      }
      if (request.method === 'PUT') {
        const token = getToken(request);
        const pass = await getPass(env);
        if (!token || !(await verifyToken(token, pass))) {
          return json({ error: 'unauthorized' }, 401);
        }
        try {
          const body = await request.json();
          if (!Array.isArray(body)) return json({ error: 'invalid payload' }, 400);
          const clean = body
            .map(x => ({
              name: String(x.name || '').slice(0, 60),
              icon: String(x.icon || '').slice(0, 500),
              url: String(x.url || '').slice(0, 500),
              downloads: String(x.downloads || '').slice(0, 30),
              tag: String(x.tag || '').slice(0, 20),
              desc: String(x.desc || '').slice(0, 200)
            }))
            .filter(x => x.name.length > 0 && x.url.length > 0);
          await env.LINKS_KV.put('apps', JSON.stringify(clean));
          return json({ ok: true, count: clean.length });
        } catch (e) {
          return json({ error: 'bad json' }, 400);
        }
      }
      return json({ error: 'method not allowed' }, 405);
    }

    // 文件上传（登录鉴权，KV 存储，单文件≤25MB）
    if (path === '/api/upload') {
      const token = getToken(request);
      const pass = await getPass(env);
      if (!token || !(await verifyToken(token, pass))) {
        return json({ error: 'unauthorized' }, 401);
      }
      if (request.method === 'POST') {
        try {
          const name = decodeURIComponent(url.searchParams.get('name') || '').slice(0, 100);
          if (!name) return json({ error: 'missing name' }, 400);
          const safeName = name.replace(/[\\/]/g, '_');
          const buf = await request.arrayBuffer();
          if (buf.byteLength <= 0) return json({ error: 'empty file' }, 400);
          if (buf.byteLength > 25 * 1024 * 1024) return json({ error: '文件超过 25MB 限制' }, 413);
          const mime = request.headers.get('X-File-Type') || 'application/octet-stream';
          await env.LINKS_KV.put('f:' + safeName, buf, { metadata: { type: mime } });
          return json({ ok: true, url: '/file/' + encodeURIComponent(safeName), size: buf.byteLength });
        } catch (e) {
          return json({ error: 'upload failed' }, 500);
        }
      }
      if (request.method === 'DELETE') {
        try {
          const name = decodeURIComponent(url.searchParams.get('name') || '');
          if (!name) return json({ error: 'missing name' }, 400);
          await env.LINKS_KV.delete('f:' + name);
          return json({ ok: true });
        } catch (e) {
          return json({ error: 'delete failed' }, 500);
        }
      }
      return json({ error: 'method not allowed' }, 405);
    }

    // 文件下载（公开）
    if (path.startsWith('/file/')) {
      try {
        const rawName = path.slice('/file/'.length);
        let name;
        try { name = decodeURIComponent(rawName); } catch (e) { name = rawName; }
        const result = await env.LINKS_KV.getWithMetadata('f:' + name, 'arrayBuffer');
        if (result === null || result.value === null) {
          return json({ error: '文件不存在', name: name }, 404);
        }
        const meta = result.metadata || {};
        const mime = meta.type || 'application/octet-stream';
        const safe = name.replace(/["\r\n]/g, '');
        return new Response(result.value, {
          headers: {
            'Content-Type': mime,
            'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(safe)}`,
            'Cache-Control': 'public, max-age=3600'
          }
        });
      } catch (e) {
        return json({ error: 'download failed', detail: String(e && e.message || e) }, 500);
      }
    }

    // 站点配置接口（公开读取）
    if (path === '/api/site') {
      if (request.method === 'GET') {
        const config = await getConfig(env);
        const articles = await getArticles(env);
        return json({ config, articles });
      }
      return json({ error: 'method not allowed' }, 405);
    }

    // 站点配置更新（登录鉴权）
    if (path === '/api/config' && request.method === 'PUT') {
      const token = getToken(request);
      const pass = await getPass(env);
      if (!token || !(await verifyToken(token, pass))) {
        return json({ error: 'unauthorized' }, 401);
      }
      try {
        const body = await request.json();
        const current = await getConfig(env);
        const allowed = ['name', 'logo_text', 'logo_url', 'slogan', 'intro', 'footer_text'];
        allowed.forEach(k => {
          if (typeof body[k] === 'string') current[k] = body[k].slice(0, 300);
        });
        if (Array.isArray(body.carousel)) {
          current.carousel = body.carousel.slice(0, 6).map(x => ({
            img: String(x.img || '').slice(0, 500),
            title: String(x.title || '').slice(0, 80),
            desc: String(x.desc || '').slice(0, 200),
            url: String(x.url || '').slice(0, 500)
          }));
        }
        await env.LINKS_KV.put('site_config', JSON.stringify(current));
        return json({ ok: true, config: current });
      } catch (e) {
        return json({ error: 'bad json' }, 400);
      }
    }

    // 文章数据更新（登录鉴权）
    if (path === '/api/articles' && request.method === 'PUT') {
      const token = getToken(request);
      const pass = await getPass(env);
      if (!token || !(await verifyToken(token, pass))) {
        return json({ error: 'unauthorized' }, 401);
      }
      try {
        const body = await request.json();
        if (!Array.isArray(body)) return json({ error: 'invalid payload' }, 400);
        const clean = body
          .map(x => ({
            title: String(x.title || '').slice(0, 80),
            cat: String(x.cat || '').slice(0, 20),
            tags: Array.isArray(x.tags) ? x.tags.map(t => String(t).slice(0, 20)).slice(0, 5) : [],
            desc: String(x.desc || '').slice(0, 300),
            url: String(x.url || '').slice(0, 500),
            date: String(x.date || '').slice(0, 30),
            views: String(x.views || '').slice(0, 20),
            comments: String(x.comments || '').slice(0, 20),
            content: String(x.content || '').slice(0, 100000)
          }))
          .filter(x => x.title.length > 0);
        await env.LINKS_KV.put('articles', JSON.stringify(clean));
        return json({ ok: true, count: clean.length });
      } catch (e) {
        return json({ error: 'bad json' }, 400);
      }
    }

    // 其余请求走静态资源
    return env.ASSETS.fetch(request);
  }
};

async function getConfig(env) {
  try {
    const raw = await env.LINKS_KV.get('site_config');
    return raw ? Object.assign({}, DEFAULT_CONFIG, JSON.parse(raw)) : DEFAULT_CONFIG;
  } catch (e) {
    return DEFAULT_CONFIG;
  }
}

async function getArticles(env) {
  try {
    const raw = await env.LINKS_KV.get('articles');
    return raw ? JSON.parse(raw) : DEFAULT_ARTICLES;
  } catch (e) {
    return DEFAULT_ARTICLES;
  }
}

async function getPass(env) {
  try {
    return (await env.LINKS_KV.get('admin_pass')) || DEFAULT_PASS;
  } catch (e) {
    return DEFAULT_PASS;
  }
}

async function handleLogin(request, env) {
  try {
    const body = await request.json();
    const pwd = String(body.password || '');
    const pass = await getPass(env);
    if (pwd && pass && pwd.length === pass.length && safeEqual(pwd, pass)) {
      const token = await makeToken(pass);
      return json({ ok: true, token });
    }
    return json({ error: '密码错误' }, 401);
  } catch (e) {
    return json({ error: 'bad request' }, 400);
  }
}

function safeEqual(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function makeToken(pass) {
  const payload = btoa(JSON.stringify({ exp: Date.now() + 7 * 24 * 3600 * 1000 }));
  const sig = await hmac(payload, pass);
  return payload + '.' + sig;
}

async function verifyToken(token, pass) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [payload, sig] = parts;
    const expect = await hmac(payload, pass);
    if (sig !== expect) return false;
    const data = JSON.parse(atob(payload));
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch (e) {
    return false;
  }
}

async function hmac(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function getToken(request) {
  const auth = request.headers.get('Authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
