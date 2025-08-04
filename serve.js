#!/usr/bin/env node

/**
 * 简单的HTTP服务器，用于本地预览静态博客
 * 使用方法：node serve.js
 * 然后在浏览器访问 http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;

// MIME类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.md': 'text/markdown',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`启动本地服务器...`);
    console.log(`端口: ${PORT}`);
    console.log(`目录: ${process.cwd()}`);
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('按 Ctrl+C 停止服务器');
    
    // 自动打开浏览器
    const url = `http://localhost:${PORT}`;
    const command = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${command} ${url}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log(`端口 ${PORT} 已被占用，请尝试其他端口`);
        console.log('或者关闭占用该端口的程序');
    } else {
        console.log('启动服务器失败:', e);
    }
});