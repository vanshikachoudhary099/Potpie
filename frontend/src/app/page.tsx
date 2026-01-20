"use client";

import { useState } from "react";
import AnalysisResult from "@/components/AnalysisResult";
import ResumeUploader from "@/components/ResumeUploader";
import JobInput from "@/components/JobInput";
import { analyzeApplication, JobAnalysisResult } from "@/lib/api";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
    const [step, setStep] = useState<"upload" | "input" | "analyzing" | "result">("upload");
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState<JobAnalysisResult | null>(null);
    const [error, setError] = useState("");

    const handleResumeDrop = (file: File) => {
        setResumeFile(file);
        setStep("input");
    };

    const handleAnalyze = async () => {
        if (!resumeFile || !jobDescription) return;
        setStep("analyzing");
        setError("");

        try {
            const data = await analyzeApplication(resumeFile, jobDescription);
            setResult(data);
            setStep("result");
        } catch (err: any) {
            console.error(err);
            setError("Something went wrong. Please try again. Ensure backend is running.");
            setStep("input");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 selection:bg-purple-500/30">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    JobHunt<span className="font-bold text-purple-400">AI</span>
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://potpie.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{" "}
                        <span className="font-bold">Potpie AI Agent</span>
                    </a>
                </div>
            </div>

            <div className="mt-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Land Your Dream Job.
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
                    AI-powered resume tailoring. Upload your resume, paste the JD, and get a Fit Score + Custom Cover Letter instantly.
                </p>
            </div>

            <div className="w-full max-w-3xl glass-card p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500">
                {/* Background decoration */}
                <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

                {step === "upload" && (
                    <ResumeUploader onFileSelect={handleResumeDrop} />
                )}

                {step === "input" && (
                    <JobInput
                        value={jobDescription}
                        onChange={setJobDescription}
                        onSubmit={handleAnalyze}
                        fileName={resumeFile?.name}
                        onBack={() => setStep("upload")}
                    />
                )}

                {step === "analyzing" && (
                    <div className="flex flex-col items-center animate-pulse">
                        <Sparkles className="w-16 h-16 text-purple-400 mb-4 animate-spin-slow" />
                        <h2 className="text-2xl font-bold">Analyzing fit...</h2>
                        <p className="text-gray-400 mt-2">Reading your resume and the job description.</p>
                    </div>
                )}

                {step === "result" && result && (
                    <AnalysisResult result={result} onReset={() => { setStep("upload"); setResult(null); setResumeFile(null); setJobDescription(""); }} />
                )}

                {error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                        {error}
                    </div>
                )}
            </div>
        </main>
    );
}
