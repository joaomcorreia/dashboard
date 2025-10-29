@echo off
echo Stopping all Node.js and Python processes...
echo.
taskkill /F /IM node.exe 2>nul
taskkill /F /IM python.exe 2>nul
echo.
echo All servers stopped!
pause