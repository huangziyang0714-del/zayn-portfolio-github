@echo off
cd /d "%~dp0"

start "ZAYN Portfolio Server" cmd /k ""C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" ".\node_modules\vite\bin\vite.js" preview --host 127.0.0.1 --port 4174 --strictPort"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4174/#work"
