@echo off
echo Starting Both Servers...
echo.
echo Starting Django Backend...
start "Django Backend" cmd /k "cd /d C:\projects\dashboard\backend && C:\projects\dashboard\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "cd /d C:\projects\dashboard\frontend && npm run dev"

echo.
echo Both servers are starting in separate windows!
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000 (or 3000)
echo.
pause