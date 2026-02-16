@echo off
echo ===================================================
echo      Starting Samavest Project Services
echo ===================================================

echo.
echo 1. Starting Backend Server...
start "Samavest Backend" cmd /k "npm run dev"

echo.
echo 2. Starting Samavest Portal (Port 5173)...
cd samavest-portal
start "Samavest Portal" cmd /k "npm run dev -- --port 5173"
cd ..

echo.
echo 3. Starting Chalkboard Portal (Port 5174)...
cd chalkboard-portal
start "Chalkboard Portal" cmd /k "npm run dev -- --port 5174"
cd ..

echo.
echo All services are starting up. 
echo Opening Launcher in your default browser...
timeout /t 5 >nul
start launcher.html

echo.
echo ===================================================
echo      Services Running. DO NOT CLOSE THIS WINDOW.
echo ===================================================
pause
