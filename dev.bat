@echo off
echo Just Code Works - Development Commands
echo =====================================
echo.
echo 1. Start Development Server
echo 2. Build Production
echo 3. Start Production Server
echo 4. Run Type Check
echo 5. Run Linting
echo 6. Clean Build Cache
echo 7. Install Dependencies
echo 8. Exit
echo.
set /p choice=Enter your choice (1-8): 

if %choice%==1 (
    echo Starting development server...
    npm run dev
) else if %choice%==2 (
    echo Building for production...
    npm run build
) else if %choice%==3 (
    echo Starting production server...
    npm run start
) else if %choice%==4 (
    echo Running TypeScript checks...
    npm run type-check
) else if %choice%==5 (
    echo Running ESLint...
    npm run lint
) else if %choice%==6 (
    echo Cleaning build cache...
    rmdir /s /q .next 2>nul
    echo Cache cleared!
    pause
) else if %choice%==7 (
    echo Installing dependencies...
    npm install
) else if %choice%==8 (
    echo Goodbye!
    exit
) else (
    echo Invalid choice. Please try again.
    pause
    goto :eof
)

pause