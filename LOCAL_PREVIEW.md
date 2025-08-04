# 本地预览指南

由于浏览器的CORS安全限制，直接双击打开 `index.html` 会遇到跨域问题。以下是几种本地预览的解决方案：

## 🚀 方案1：使用内置服务器脚本（推荐）

### Windows用户
双击运行 `serve.bat`，会自动选择可用的服务器并打开浏览器

### Python用户
```bash
python serve.py
```

### Node.js用户
```bash
node serve.js
```

## 🔧 方案2：使用系统自带工具

### Python 3.x（推荐）
```bash
python -m http.server 8000
```

### Python 2.7
```bash
python -m SimpleHTTPServer 8000
```

### Node.js + npx
```bash
npx serve .
# 或
npx http-server .
```

## 📝 方案3：VS Code Live Server

1. 安装 `Live Server` 扩展
2. 右键 `index.html` → "Open with Live Server"

## 🌐 方案4：其他编辑器

### WebStorm/PHPStorm
- 右键 `index.html` → "Open in Browser"

### Brackets
- 点击右侧的"实时预览"按钮

## 📱 方案5：在线预览

可以将项目上传到以下平台进行预览：
- GitHub Pages
- Netlify
- Vercel
- CodePen

## ⚠️ 常见问题

**Q: 为什么直接打开HTML文件不行？**
A: 现代浏览器为了安全，不允许 `file://` 协议的页面访问其他本地文件。

**Q: 端口被占用怎么办？**
A: 修改脚本中的端口号，或关闭占用端口的程序。

**Q: 我没有Python/Node.js怎么办？**
A: 使用VS Code的Live Server扩展，或者安装这些工具。

## 🎯 推荐方案

1. **开发者**：VS Code + Live Server扩展
2. **普通用户**：双击 `serve.bat`（Windows）
3. **已有Python/Node.js**：使用对应的命令行工具