# JobHunt AI

A full-stack AI agent application that helps candidates tailor their resumes to specific job descriptions using Pydantic AI.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Lucide React
- **Backend**: Python, FastAPI, Pydantic AI
- **AI**: GPT-4o (via OpenRouter/OpenAI)

## Setup Instructions

### 1. Backend Setup

1.  Navigate to `backend/`:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (optional but recommended) and install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Environment Variables**:
    - Rename `.env.example` to `.env` (in the root or backend folder, code expects it in root or we need to point to it).
    - Add your `OPENROUTER_API_KEY` or `OPENAI_API_KEY`.
4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    API will run at `http://localhost:8000`.

### 2. Frontend Setup

1.  Navigate to `frontend/`:
    ```bash
    cd  frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    App will run at `http://localhost:3000`.

## Features

- **Resume Parsing**: Extracts text from PDF resumes.
- **Fit Analysis**: AI Agent evaluates how well the resume matches the JD.
- **Fit Score**: 0-100 match score.
- **Audit**: Explanation of strengths and missing keywords.
- **Cover Letter**: Auto-generated, tailored cover letter.
