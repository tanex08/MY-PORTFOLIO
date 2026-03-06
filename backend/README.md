# Portfolio Backend API

FastAPI backend for handling contact form submissions and CV downloads.

## Setup Instructions

### 1. Create Python Virtual Environment

```bash
cd backend
python -m venv venv
```

**Activate virtual environment:**
- **Windows (PowerShell):** `.\venv\Scripts\Activate.ps1`
- **Windows (CMD):** `.\venv\Scripts\activate.bat`
- **macOS/Linux:** `source venv/bin/activate`

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Add Your CV

Place your CV file named `CV.pdf` in the `backend/public/` directory.

### 4. Run the Backend

```bash
uvicorn main:app --reload
```

The API will start on `http://localhost:8000`

## API Endpoints

### Health Check
- **GET** `/` - Root health check
- **GET** `/api/health` - API health status

### Contact Form
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "name": "Your Name",
    "email": "your@email.com",
    "message": "Your message here"
  }
  ```
  **Response:**
  ```json
  {
    "status": "success",
    "message": "Contact form submitted successfully",
    "submission_id": 1,
    "timestamp": "2024-03-05T12:00:00"
  }
  ```

- **GET** `/api/submissions` - Get all contact submissions
- **DELETE** `/api/submissions/clear` - Clear all submissions (admin)

### CV Downloads
- **GET** `/api/cv` - Download CV file (PDF)
- **POST** `/api/cv/upload` - Upload new CV (PDF only)
  ```
  Form Data: file (multipart/form-data)
  ```

## API Documentation

Once the server is running, visit:
- **Interactive Docs:** `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs:** `http://localhost:8000/redoc` (ReDoc)

## Data Storage

Contact form submissions are stored in `backend/data/contact_submissions.json`

## Configuration

CORS is configured to allow requests from:
- `http://localhost:8000`
- `http://localhost:3000`
- `http://localhost:5173`

Modify the `allow_origins` list in `main.py` to add your domain.

## Development

The backend automatically reloads when you modify `main.py` (due to the `--reload` flag).

## Production Deployment

For production, run without the `--reload` flag:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Or use a production server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```
