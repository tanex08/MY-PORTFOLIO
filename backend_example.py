"""
FastAPI Backend Template for Portfolio
This is a template for the backend API that works with the portfolio frontend.

To use this:
1. Create a separate 'backend' directory
2. Copy this file to backend/main.py
3. Install dependencies: pip install fastapi uvicorn pydantic python-dotenv
4. Run: uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Portfolio API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactFormData(BaseModel):
    """Contact form data model"""
    name: str
    email: str
    message: str


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "Portfolio API is running"}


@app.post("/api/contact")
async def send_contact(data: ContactFormData):
    """
    Handle contact form submissions
    TODO: Add email sending logic here
    """
    print(f"New contact from {data.name} ({data.email}): {data.message}")
    
    # Here you would:
    # 1. Save to database
    # 2. Send email notification
    # 3. Return success response
    
    return {
        "status": "success",
        "message": "Your message has been received. We'll get back to you soon!",
        "data": {
            "name": data.name,
            "email": data.email,
        }
    }


@app.get("/api/portfolio")
async def get_portfolio():
    """Get portfolio data - can be customized to fetch from database"""
    return {
        "name": "James Ryan",
        "title": "QA Engineer & Test Automation Specialist",
        "email": "your.email@example.com",
        "social": {
            "github": "https://github.com/yourprofile",
            "linkedin": "https://linkedin.com/in/yourprofile",
            "twitter": "https://twitter.com/yourprofile",
        }
    }


@app.get("/api/download-cv")
async def download_cv():
    """Endpoint to download CV as PDF"""
    # TODO: Implement CV download logic
    # This should return a file from your storage
    pass


@app.post("/api/subscribe")
async def subscribe(email: str):
    """Subscribe to newsletter"""
    # TODO: Add email to database or newsletter service
    return {
        "status": "success",
        "message": f"Successfully subscribed with {email}"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
