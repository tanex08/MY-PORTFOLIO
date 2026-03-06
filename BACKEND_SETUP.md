# FastAPI Backend Setup Guide

## Quick Start

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Choose Your Setup Method

#### **Option A: Using Batch Script (Easiest for Windows)**
```bash
run.bat
```

#### **Option B: Using PowerShell Script**
```powershell
.\run.ps1
```

#### **Option C: Manual Setup**

**Create virtual environment:**
```bash
python -m venv venv
```

**Activate virtual environment:**
- Windows (PowerShell): `.\venv\Scripts\Activate.ps1`
- Windows (CMD): `.\venv\Scripts\activate.bat`
- macOS/Linux: `source venv/bin/activate`

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Run the server:**
```bash
uvicorn main:app --reload
```

## Server Configuration

Once running, the API will be available at: **http://localhost:8000**

### API Documentation
- **Swagger UI (Interactive):** http://localhost:8000/docs
- **ReDoc (Alternative):** http://localhost:8000/redoc

## Adding Your CV

1. Prepare your CV as a PDF file
2. Place it in `backend/public/CV.pdf`
3. The download button on the portfolio will now work

### Option to Upload CV via API
```bash
curl -X POST "http://localhost:8000/api/cv/upload" \
  -F "file=@YOUR_CV.pdf"
```

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | API status |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/submissions` | View all submissions |
| DELETE | `/api/submissions/clear` | Clear submissions |
| GET | `/api/cv` | Download CV |
| POST | `/api/cv/upload` | Upload/update CV |

## Frontend Integration

The frontend is already configured to:
- Send contact form data to `/api/contact`
- Download CV from `/api/cv`
- Handle errors gracefully if backend is unavailable

## Data Storage

- **Contact Submissions:** `backend/data/contact_submissions.json`
- **CV File:** `backend/public/CV.pdf`

## Troubleshooting

### Python not found
Make sure Python is installed and added to PATH. Test with:
```bash
python --version
```

### Port 8000 already in use
Change the port in the startup script or run:
```bash
uvicorn main:app --reload --port 8001
```
Then update the frontend `script.js` to use port 8001.

### CORS errors
The CORS is configured for localhost. If deploying to a domain, update `main.py`:
```python
allow_origins=["https://yourdomain.com", "http://yourdomain.com"]
```

## Deploying to Production

When ready to deploy, change `--reload` flag:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Use a production ASGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Environment Variables

Create a `.env` file in the backend folder (copy from `.env.example`) for:
- Email settings (future enhancement)
- Database settings (future enhancement)
- Custom CORS origins

## Next Steps

1. ✅ Backend is set up
2. Add your CV to `backend/public/CV.pdf`
3. Run `run.bat` or `run.ps1`
4. Test the API at http://localhost:8000/docs
5. Test from portfolio: Contact form and CV download should work!

Enjoy your fully functional portfolio! 🚀
