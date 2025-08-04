#!/usr/bin/env python3
"""
简单的HTTP服务器，用于本地预览静态博客
使用方法：python serve.py
然后在浏览器访问 http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def main():
    print(f"启动本地服务器...")
    print(f"端口: {PORT}")
    print(f"目录: {os.getcwd()}")
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"服务器运行在 http://localhost:{PORT}")
            print("按 Ctrl+C 停止服务器")
            
            # 自动打开浏览器
            webbrowser.open(f"http://localhost:{PORT}")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"端口 {PORT} 已被占用，请尝试其他端口")
            print("或者关闭占用该端口的程序")
        else:
            print(f"启动服务器失败: {e}")

if __name__ == "__main__":
    main()