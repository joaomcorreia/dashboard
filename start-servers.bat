@echo off
title Starting Dashboard Servers
echo 🚀 Starting Dashboard Servers...
powershell -ExecutionPolicy Bypass -File "%~dp0server-manager.ps1" start
pause