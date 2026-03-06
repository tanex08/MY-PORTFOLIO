@echo off
REM FastAPI Backend Startup Script for Windows

echo ========================================
echo  Portfolio API - Startup Script
echo ========================================
echo.

REM Check if venv exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Install/update dependencies
echo Installing dependencies...
pip install -r requirements.txt
echo.

REM Start the server
echo.
echo ========================================
echo Starting FastAPI server...
echo Server running on http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause
