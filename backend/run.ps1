# FastAPI Backend Startup Script for PowerShell

Write-Host "========================================"
Write-Host "  Portfolio API - Startup Script"
Write-Host "========================================"
Write-Host ""

# Set execution policy for current process
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# Check if venv exists, if not create it
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    & python -m venv venv
    Write-Host "Virtual environment created successfully"
    Write-Host ""
}

# Activate virtual environment
Write-Host "Activating virtual environment..."
& ".\venv\Scripts\Activate.ps1"
Write-Host "Virtual environment activated"
Write-Host ""

# Install/update dependencies
Write-Host "Installing dependencies..."
& python -m pip install --upgrade pip --quiet
& python -m pip install -r requirements.txt --quiet
Write-Host "Dependencies installed successfully"
Write-Host ""

# Start the server
Write-Host ""
Write-Host "========================================"
Write-Host "Starting FastAPI server..."
Write-Host "Server running on http://localhost:8000"
Write-Host "API Docs: http://localhost:8000/docs"
Write-Host "========================================"
Write-Host ""

& python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

Write-Host "Server stopped"
pause

