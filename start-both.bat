@echo off
echo Starting Both Servers...
echo.
echo Starting Django Backend...
start "Django Backend" cmd /k "python C:\projects\dashboard\backend\manage.py runserver 127.0.0.1:8000"

echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "cd /d C:\projects\dashboard && npm run dev --prefix C:\projects\dashboard\frontend"

echo.
echo Both servers are starting in separate windows!
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3004 (or 3000)
echo.
pause