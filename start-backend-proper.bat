@echo off
echo Starting Backend API Server Properly...
echo.

cd backend
echo Current directory: %CD%

echo Ensuring virtual environment is activated...
call venv\Scripts\activate.bat

echo Starting backend API server...
python main.py

pause