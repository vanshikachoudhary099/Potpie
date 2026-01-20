from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from models import JobAnalysisResult
from utils import extract_text_from_pdf
from agent import analyze_application

app = FastAPI(title="JobHunt AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "JobHunt AI Backend is running"}

@app.post("/analyze", response_model=JobAnalysisResult)
async def analyze_endpoint(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Read file content
    file_content = await resume.read()
    
    # Extract text
    resume_text = extract_text_from_pdf(file_content)
    if not resume_text:
         raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    # Run Agent
    try:
        print(f"Analyzing with model... Job Length: {len(job_description)}")
        result = await analyze_application(resume_text, job_description)
        print("Analysis successful!")
        return result
    except Exception as e:
        import traceback
        print("!!! AGENT ERROR !!!")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
