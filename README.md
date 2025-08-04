# 静态博客系统

一个简单而优雅的静态博客系统，自动读取指定目录下的 markdown 文件并展示为美观的网页。

## 功能特性

- 📝 **简单易用**：只需在 `posts/` 目录下添加 markdown 文件即可发布文章
- 🎨 **美观界面**：简洁现代的设计，支持响应式布局  
- 🔍 **代码高亮**：支持多种编程语言的语法高亮
- 📱 **移动友好**：在各种设备上都有良好的显示效果
- ⚡ **快速加载**：基于 Node.js + Express 的轻量级架构
- 🚀 **零配置**：无需数据库，开箱即用

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
# 生产环境
npm start

# 开发环境（自动重启）
npm run dev
```

### 3. 访问博客

打开浏览器访问 `http://localhost:3000`

## 使用方法

### 添加文章

1. 在 `posts/` 目录下创建新的 `.md` 文件
2. 文件名将作为 URL 的一部分
3. 第一行如果是 `#` 开头的标题，将作为文章标题显示
4. 保存文件后刷新页面即可看到新文章

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
├── server.js          # 主服务器文件
├── package.json       # 项目配置
├── posts/             # 存放 markdown 文章的目录
│   ├── 欢迎使用博客.md
│   └── 技术分享.md
└── README.md          # 项目说明
```

## 技术栈

- **后端**：Node.js + Express
- **Markdown 解析**：marked
- **代码高亮**：highlight.js
- **文件操作**：fs-extra

## 自定义

### 修改端口

可以通过环境变量设置端口：

```bash
PORT=8080 npm start
```

### 修改文章目录

编辑 `server.js` 文件中的 `POSTS_DIR` 变量：

```javascript
const POSTS_DIR = path.join(__dirname, 'your-posts-directory');
```

### 自定义样式

所有的 CSS 样式都内嵌在 `server.js` 中，可以直接修改来自定义外观。

## 部署

### 本地部署

```bash
npm start
```

### 云服务器部署

1. 上传代码到服务器
2. 安装依赖：`npm install`
3. 使用 PM2 或其他进程管理器启动：`pm2 start server.js`

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT License