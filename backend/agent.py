import os
from pydantic_ai import Agent, RunContext
# from pydantic_ai.models.gemini import GeminiModel (Not using native Gemini anymore)
from models import JobAnalysisResult
from dotenv import load_dotenv

load_dotenv()

# define the model explicitly
# define the agent
# Using OpenRouter (via OpenAI compatible client)
# Model: google/gemini-2.0-flash-001 (via OpenRouter)
agent = Agent(
    'openai:google/gemini-2.0-flash-001',
    output_type=JobAnalysisResult,
    system_prompt=(
        "You are an expert Career Coach and ATS (Applicant Tracking System) specialist. "
        "Your goal is to help candidates impress recruiters and pass automated filters. "
        "Analyze the provided Resume text against the Job Description. "
        "Be strict but constructive. "
        "Provide a concrete Fit Score, specific missing keywords, and a tailored cover letter. "
        "The Cover Letter should be professional, enthusiastic, and highlight relevant experience from the resume."
    ),
)

async def analyze_application(resume_text: str, job_description: str) -> JobAnalysisResult:
    """
    Analyzes the resume against the job description using the agent.
    """
    user_prompt = (
        f"JOB DESCRIPTION:\n{job_description}\n\n"
        f"RESUME CONTENT:\n{resume_text}\n\n"
        "Analyze the fit and generate the required output."
    )
    
    result = await agent.run(user_prompt)
    return result.output

