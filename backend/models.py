from typing import List
from pydantic import BaseModel, Field

class JobAnalysisResult(BaseModel):
    fit_score: int = Field(..., description="A score from 0 to 100 indicating how well the resume matches the job description.")
    audit_reasons: List[str] = Field(..., description="3-5 bullet points explaining the reasoning behind the score, highlighting strengths and weaknesses.")
    missing_keywords: List[str] = Field(..., description="List of important keywords or skills found in the Job Description that are missing from the resume.")
    tailored_cover_letter: str = Field(..., description="A professional, tailored cover letter in Markdown format, addressing the specific company and role.")
