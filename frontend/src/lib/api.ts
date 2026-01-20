export interface JobAnalysisResult {
    fit_score: number;
    audit_reasons: string[];
    missing_keywords: string[];
    tailored_cover_letter: string;
}

export async function analyzeApplication(resume: File, jobDescription: string): Promise<JobAnalysisResult> {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to analyze");
    }

    return res.json();
}
