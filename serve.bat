@echo off
echo 启动本地博客预览服务器...
echo.

REM 检查Python是否可用
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用Python启动服务器...
    python serve.py
    goto :end
)

REM 检查Node.js是否可用
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用Node.js启动服务器...
    node serve.js
    goto :end
)

REM 都不可用，提示用户
echo 错误: 未找到Python或Node.js
echo.
echo 请安装以下任一工具:
echo 1. Python 3.x - https://python.org
echo 2. Node.js - https://nodejs.org
echo.
echo 或者使用VS Code的Live Server扩展
pause

:end