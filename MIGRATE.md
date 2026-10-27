# cxkk 技术小站 —— 迁移到新电脑指南

本文件说明如何把本项目（Cloudflare Worker + KV 搭建的 cxkk.cc.cd 网站）迁移到另一台电脑，并在 WorkBuddy / 豆包工作台里继续使用。

## 项目结构

```
myweb/
├── index.html          # 首页（轮播/分类/近期文章/排行榜）
├── articles.html       # 全部文章
├── tutorials.html      # 教程
├── article.html        # 文章详情 + 富文本编辑
├── about.html          # 关于 + 站点设置面板（导航/轮播/网盘/图标）
├── links.html          # 链接页（编辑模式/自定义图标）
├── apps.html           # 软件页（编辑模式/自定义图标）
├── drive.html          # 网盘页
├── worker.js           # Worker 全部后端接口（登录/数据/上传）
├── wrangler.toml       # 部署配置（KV 绑定）
├── public/             # 部署目录（与根目录 HTML 同步，改完先复制再部署）
├── .env                # 本地凭证（不入库！换电脑必须手动恢复）
└── MIGRATE.md          # 本文件
```

## 一、新电脑准备

1. 安装 **Git**：https://git-scm.com/download/win （一路默认）
2. 安装 **Node.js LTS 20.x**：https://nodejs.org/ （不要装 22+，部署固定用 wrangler@3）

## 二、克隆项目

```powershell
cd D:\    # 或任意目录
git clone https://github.com/brycechenzthh/myweb.git
cd myweb
```

## 三、恢复部署凭证（关键，唯一需要手动的一步）

`.env` 被 .gitignore 排除，**不会**随仓库同步。内容只有两行：

```
CLOUDFLARE_API_TOKEN=你的API令牌
CLOUDFLARE_ACCOUNT_ID=677b3a012d22a41b482a92ccf07c74ca
```

获取方式（任选）：
- 从旧电脑直接复制 `C:\Users\1\Doubao\chats\2026-08-31\new-chat\cxkk-site\.env`
- 或去 https://dash.cloudflare.com/profile/api-tokens 重新创建一个「编辑 Cloudflare Workers」模板的令牌（区域资源选「所有区域」），按上面格式新建 .env

## 四、部署验证

```powershell
cd D:\myweb
$env:CLOUDFLARE_API_TOKEN=(Get-Content .env | Where-Object {$_ -like 'CLOUDFLARE_API_TOKEN=*'}).Replace('CLOUDFLARE_API_TOKEN=','')
$env:CLOUDFLARE_ACCOUNT_ID=(Get-Content .env | Where-Object {$_ -like 'CLOUDFLARE_ACCOUNT_ID=*'}).Replace('CLOUDFLARE_ACCOUNT_ID=','')
npx --yes wrangler@3 deploy
```

看到 `Deployed cxkk triggers` + `Current Version ID` 即成功，打开 https://cxkk.cc.cd/ 确认。

## 五、在 WorkBuddy / 豆包工作台使用

1. 打开新电脑的 WorkBuddy（豆包工作台）
2. 把 `D:\myweb` 设为项目目录（或在对话里说明项目路径）
3. 之后让豆包直接读写该目录即可

## 六、日常开发流程（每次改完）

```powershell
cd D:\myweb
# 1. 编辑根目录 HTML / worker.js
# 2. 同步到部署目录
Copy-Item index.html public\ -Force   # 改哪个就复制哪个（或 Copy-Item *.html public\ -Force）
# 3. 部署（先设好上面的两个环境变量）
npx --yes wrangler@3 deploy
# 4. 推送 GitHub（换电脑/备份）
$g="C:\Program Files\Git\cmd\git.exe"   # Git 默认安装路径
& $g add -A
& $g commit -m "描述本次改动"
& $g push
```

## 七、常见问题

| 问题 | 处理 |
|---|---|
| `Failed to fetch auth token: 400` | OAuth 过期，改用 .env 里的 API Token 部署（见第四节） |
| GitHub push 连不上 | 需要代理（git 全局代理 127.0.0.1:7897），开代理后重试 |
| 页面改动不生效 | 部署时 URL 加 `?_t=时间戳` 绕过缓存 |
| www.cxkk.cc.cd 打不开 | Worker 自定义域自动处理，一般无需手动加 DNS 记录 |

## 八、数据说明

- 网站所有内容（链接/软件/文章/站点配置/上传文件）都存在 **Cloudflare KV 云端**，换电脑不影响数据，clone 后直接可用。
- 单个上传文件限制 25MB（KV 免费额度限制）。
