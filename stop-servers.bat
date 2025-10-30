@echo off
title Stopping Dashboard Servers
echo 🛑 Stopping Dashboard Servers...
powershell -ExecutionPolicy Bypass -File "%~dp0server-manager.ps1" stop
pause