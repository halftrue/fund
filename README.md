# 静态博客系统

一个纯静态的博客系统，使用 GitHub Pages 托管，自动发现 `posts/` 目录下的 Markdown 文件并展示为美观的网页。

## 功能特性

- 📝 **简单易用**：只需在 `posts/` 目录下添加 Markdown 文件即可发布文章
- 🎨 **美观界面**：简洁现代的设计，支持响应式布局  
- 🔍 **代码高亮**：支持多种编程语言的语法高亮
- 📱 **移动友好**：在各种设备上都有良好的显示效果
- ⚡ **快速加载**：纯静态HTML，无服务器依赖
- 🚀 **零配置**：无需数据库，自动部署到GitHub Pages
- 🔄 **自动更新**：推送新文章后自动更新博客

## 快速开始

### 1. 本地预览

**注意**: 由于浏览器CORS限制，不能直接双击打开 `index.html`

**快速启动**（Windows）:
```bash
# 双击运行
serve.bat
```

**或使用Python**:
```bash
python serve.py
# 或
python -m http.server 8000
```

**或使用VS Code**:
安装 Live Server 扩展，右键 `index.html` → "Open with Live Server"

详细说明请查看 [LOCAL_PREVIEW.md](LOCAL_PREVIEW.md)

### 2. 部署到 GitHub Pages

1. Fork 这个仓库到你的 GitHub 账户
2. 进入仓库 Settings > Pages，Source 选择 "GitHub Actions"
3. 推送代码后会自动部署

## 使用方法

### 添加文章

1. 在 `posts/` 目录下创建新的 `.md` 文件即可
2. 可选：在文件顶部加入 [YAML Front Matter](https://jekyllrb.com/docs/front-matter/) 用于自定义标题、摘要、日期等元信息，例如：
   ```markdown
   ---
   title: 我的第一篇文章
   description: 这是文章的简介
   date: 2024-01-20
   ---
   ```
3. 推送到 GitHub 后页面会自动展示最新内容

### GitHub API 访问说明

- 页面会优先尝试直接从 `posts/` 目录加载文章列表。
- 如果托管环境（例如 GitHub Pages）不允许列出目录，则会自动回退到 GitHub 公共 API。
- 公共仓库的 API 请求无需任何 Token 或 API Key，但匿名访问存在每小时 **60 次** 的速率限制。
- 如果看到“403”或“触发速率限制”的提示，稍等片刻再刷新即可。

### 文章示例

```markdown
# 我的第一篇文章

这是文章的内容...

## 小标题

支持完整的 markdown 语法，包括：

- 列表
- **粗体** 和 *斜体*
- [链接](https://example.com)
- `代码`

\```javascript
console.log("代码块也支持语法高亮");
\```
```

## 项目结构

```
.
├── index.html                    # 博客主页
├── posts/                        # 存放 Markdown 文章的目录
│   ├── 欢迎使用博客.md
│   └── 技术分享.md
├── serve.py                      # Python本地服务器
├── serve.js                      # Node.js本地服务器  
├── serve.bat                     # Windows启动脚本
├── LOCAL_PREVIEW.md              # 本地预览指南
├── .github/workflows/deploy.yml  # GitHub Actions部署配置
└── README.md                     # 项目说明
```

## 技术栈

- **前端**：原生 HTML + JavaScript
- **Markdown 解析**：marked.js (CDN)
- **代码高亮**：highlight.js (CDN)
- **数据源**：直接扫描 `posts/` 目录（必要时回退到 GitHub API）
- **部署**：GitHub Pages + GitHub Actions

## 自定义

### 修改博客标题

编辑 `index.html` 中的标题和副标题：

```html
<h1 id="page-title">我的博客</h1>
<p id="page-subtitle">从 markdown 文件生成的静态博客</p>
```

### 自定义样式

所有的 CSS 样式都内嵌在 `index.html` 中，可以直接修改来自定义外观。

### 修改分支

如果你的默认分支不是 `main`，请修改 `index.html` 中的 `branch` 变量：

```javascript
const branch = 'master'; // 或其他分支名
```

## 部署

### GitHub Pages 部署（推荐）

本项目已配置好 GitHub Pages 自动部署：

1. **Fork 这个仓库到你的 GitHub 账户**

2. **启用 GitHub Pages**：
   - 进入仓库的 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 推送代码后会自动部署

3. **添加文章**：
   - 在 `posts/` 目录下添加 `.md` 文件
   - 推送到 GitHub 后会自动更新网站

### 本地预览

由于浏览器CORS限制，请使用以下方式预览：

- **Windows**: 双击 `serve.bat`
- **Python**: `python serve.py`
- **VS Code**: Live Server 扩展

详细说明: [LOCAL_PREVIEW.md](LOCAL_PREVIEW.md)

### 其他部署方式

#### Netlify
1. 将仓库连接到 Netlify
2. 构建设置保持默认即可

#### Vercel  
1. 将仓库连接到 Vercel
2. 构建设置保持默认即可

#### 静态文件服务器
将项目文件上传到任何静态文件服务器即可

## 许可证

MIT License