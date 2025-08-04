# 静态博客系统

一个纯静态的博客系统，使用GitHub Pages托管，通过GitHub API读取markdown文件并展示为美观的网页。

## 功能特性

- 📝 **简单易用**：只需在 `posts/` 目录下添加 markdown 文件即可发布文章
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

1. 在 `posts/` 目录下创建新的 `.md` 文件
2. 在 `posts/index.json` 中添加文章信息：
   ```json
   {
     "filename": "新文章.md",
     "title": "文章标题",
     "date": "2024-01-20",
     "description": "文章简介"
   }
   ```
3. 刷新页面即可看到新文章

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
├── posts/                        # 存放 markdown 文章的目录
│   ├── index.json               # 文章索引配置
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
- **数据源**：相对路径直接访问文件
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
   - 在 `posts/index.json` 中添加文章信息
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