const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

const app = express();
const PORT = process.env.PORT || 3000;

// 配置markdown渲染器
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {}
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

// 静态文件服务
app.use('/static', express.static('public'));

// 博客文章目录
const POSTS_DIR = path.join(__dirname, 'posts');

// 确保posts目录存在
fs.ensureDirSync(POSTS_DIR);

// 读取所有markdown文件
async function getAllPosts() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(POSTS_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const stats = await fs.stat(filePath);
        
        // 提取标题（第一行如果是#开头）
        const lines = content.split('\n');
        const title = lines[0].startsWith('#') 
          ? lines[0].replace(/^#+\s*/, '') 
          : file.replace('.md', '');
        
        return {
          filename: file,
          title,
          content,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
    );
    
    // 按修改时间倒序排列
    return posts.sort((a, b) => b.modified - a.modified);
  } catch (error) {
    console.error('读取文章失败:', error);
    return [];
  }
}

// 首页 - 显示所有文章列表
app.get('/', async (req, res) => {
  const posts = await getAllPosts();
  
  const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的博客</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }
        .post-list {
            list-style: none;
            padding: 0;
        }
        .post-item {
            margin-bottom: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: box-shadow 0.2s;
        }
        .post-item:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .post-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .post-title a {
            text-decoration: none;
            color: #2c3e50;
        }
        .post-title a:hover {
            color: #3498db;
        }
        .post-meta {
            color: #666;
            font-size: 0.9em;
        }
        .no-posts {
            text-align: center;
            color: #666;
            font-style: italic;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>我的博客</h1>
        <p>从 markdown 文件生成的静态博客</p>
    </div>
    
    ${posts.length > 0 ? `
        <ul class="post-list">
            ${posts.map(post => `
                <li class="post-item">
                    <div class="post-title">
                        <a href="/post/${encodeURIComponent(post.filename)}">${post.title}</a>
                    </div>
                    <div class="post-meta">
                        创建时间: ${post.created.toLocaleDateString('zh-CN')} | 
                        修改时间: ${post.modified.toLocaleDateString('zh-CN')}
                    </div>
                </li>
            `).join('')}
        </ul>
    ` : `
        <div class="no-posts">
            还没有文章。请在 <code>posts/</code> 目录下添加 markdown 文件。
        </div>
    `}
</body>
</html>`;
  
  res.send(html);
});

// 单篇文章页面
app.get('/post/:filename', async (req, res) => {
  try {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(POSTS_DIR, filename);
    
    // 检查文件是否存在
    if (!await fs.pathExists(filePath)) {
      return res.status(404).send(`
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文章未找到</title>
</head>
<body style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
    <h1>404 - 文章未找到</h1>
    <p>请求的文章不存在。</p>
    <a href="/">返回首页</a>
</body>
</html>`);
    }
    
    const content = await fs.readFile(filePath, 'utf-8');
    const htmlContent = marked(content);
    
    // 提取标题
    const lines = content.split('\n');
    const title = lines[0].startsWith('#') 
      ? lines[0].replace(/^#+\s*/, '') 
      : filename.replace('.md', '');
    
    const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 我的博客</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
        body {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 15px;
            color: #3498db;
            text-decoration: none;
            font-size: 0.9em;
        }
        .back-link:hover {
            text-decoration: underline;
        }
        .content {
            margin-top: 30px;
        }
        .content h1, .content h2, .content h3 {
            color: #2c3e50;
        }
        .content h1 {
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .content pre {
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
        }
        .content blockquote {
            border-left: 4px solid #dfe2e5;
            padding-left: 16px;
            margin-left: 0;
            color: #6a737d;
        }
        .content img {
            max-width: 100%;
            height: auto;
        }
        .content table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        .content th, .content td {
            border: 1px solid #dfe2e5;
            padding: 8px 12px;
            text-align: left;
        }
        .content th {
            background-color: #f6f8fa;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <a href="/" class="back-link">← 返回首页</a>
    </div>
    
    <article class="content">
        ${htmlContent}
    </article>
</body>
</html>`;
    
    res.send(html);
  } catch (error) {
    console.error('读取文章失败:', error);
    res.status(500).send('服务器错误');
  }
});

app.listen(PORT, () => {
  console.log(`博客服务器运行在 http://localhost:${PORT}`);
  console.log(`请在 ${POSTS_DIR} 目录下添加 markdown 文件`);
});