"""
FastAPI Backend for Portfolio
Handles contact form submissions and CV downloads
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
import os
from datetime import datetime
import json
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="API for portfolio website",
    version="1.0.0"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create data directory for storing submissions
DATA_DIR = Path(__file__).parent / "data"
DATA_DIR.mkdir(exist_ok=True)

SUBMISSIONS_FILE = DATA_DIR / "contact_submissions.json"


# Pydantic Models
class ContactFormData(BaseModel):
    """Contact form data model"""
    name: str
    email: str
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "message": "I'm interested in working together"
            }
        }


# Health check endpoint
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Portfolio API is running",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/health")
async def health_check():
    """API health check"""
    return {
        "status": "healthy",
        "service": "portfolio-api",
        "timestamp": datetime.now().isoformat()
    }


# Contact Form Endpoint
@app.post("/api/contact")
async def submit_contact(data: ContactFormData):
    """
    Handle contact form submissions
    Stores submissions in JSON file for later retrieval
    """
    try:
        # Create submission record
        submission = {
            "id": len(get_all_submissions()) + 1,
            "name": data.name,
            "email": data.email,
            "message": data.message,
            "timestamp": datetime.now().isoformat(),
            "status": "received"
        }

        # Load existing submissions
        submissions = get_all_submissions()
        submissions.append(submission)

        # Save to file
        with open(SUBMISSIONS_FILE, 'w') as f:
            json.dump(submissions, f, indent=2)

        return {
            "status": "success",
            "message": "Contact form submitted successfully",
            "submission_id": submission["id"],
            "timestamp": submission["timestamp"]
        }

    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error processing contact form submission"
        )


# Get all submissions (for admin purposes)
@app.get("/api/submissions")
async def get_submissions():
    """Get all contact form submissions"""
    try:
        submissions = get_all_submissions()
        return {
            "status": "success",
            "count": len(submissions),
            "submissions": submissions
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Error retrieving submissions"
        )


# CV Download Endpoint
@app.get("/api/cv")
async def download_cv():
    """
    Download CV file
    Place your CV.pdf in the backend/public folder
    """
    try:
        cv_path = Path(__file__).parent / "public" / "CV.pdf"

        # Check if CV file exists
        if not cv_path.exists():
            raise HTTPException(
                status_code=404,
                detail="CV file not found. Please upload CV.pdf to backend/public/"
            )

        return FileResponse(
            path=cv_path,
            filename="Tristan_Jay_GAID_CV.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=500,
            detail="Error downloading CV"
        )


# Upload CV (for admin to add/update CV)
@app.post("/api/cv/upload")
async def upload_cv(file: UploadFile = File(...)):
    """
    Upload/update CV file
    Only accepts PDF files
    """
    try:
        # Validate file type
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        # Ensure public directory exists
        public_dir = Path(__file__).parent / "public"
        public_dir.mkdir(exist_ok=True)

        # Save file
        cv_path = public_dir / "CV.pdf"
        with open(cv_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        return {
            "status": "success",
            "message": "CV uploaded successfully",
            "filename": file.filename,
            "size": len(content),
            "timestamp": datetime.now().isoformat()
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error uploading CV: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error uploading CV file"
        )


# Clear submissions (for admin - use with caution)
@app.delete("/api/submissions/clear")
async def clear_submissions():
    """Clear all submissions (admin only)"""
    try:
        with open(SUBMISSIONS_FILE, 'w') as f:
            json.dump([], f)
        return {
            "status": "success",
            "message": "All submissions cleared"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Error clearing submissions"
        )


# Helper function
def get_all_submissions() -> list:
    """Load all submissions from file"""
    try:
        if SUBMISSIONS_FILE.exists():
            with open(SUBMISSIONS_FILE, 'r') as f:
                return json.load(f)
        return []
    except:
        return []


# Root documentation
@app.get("/docs")
async def docs_redirect():
    """Redirect to API documentation"""
    return {"message": "Visit /docs for API documentation"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
