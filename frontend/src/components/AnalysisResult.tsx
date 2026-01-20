"use client";

import { JobAnalysisResult } from "@/lib/api";
import { CheckCircle2, Copy, RefreshCw, XCircle, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
    result: JobAnalysisResult;
    onReset: () => void;
}

export default function AnalysisResultDisplay({ result, onReset }: Props) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400 border-green-500/20";
        if (score >= 50) return "text-yellow-400 border-yellow-500/20";
        return "text-red-400 border-red-500/20";
    };

    return (
        <div className="w-full h-full flex flex-col space-y-8 animate-in fade-in zoom-in duration-500 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/5 z-20">
                <h2 className="text-xl font-bold">Analysis Results</h2>
                <button onClick={onReset} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Start Over">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Score Card */}
                <div className="col-span-1 glass-card p-6 flex flex-col items-center justify-center space-y-4">
                    <div className={`relative w-32 h-32 rounded-full border-8 flex items-center justify-center ${getScoreColor(result.fit_score)}`}>
                        <span className="text-4xl font-bold text-white">{result.fit_score}%</span>
                    </div>
                    <p className="text-gray-400 font-medium">Fit Score</p>
                </div>

                {/* Missing Keywords */}
                <div className="col-span-1 glass-card p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {result.missing_keywords.length > 0 ? result.missing_keywords.map((kw, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                                {kw}
                            </span>
                        )) : (
                            <span className="text-green-500 text-sm">No major keywords missing!</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Audit Reasons */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Audit Breakdown</h3>
                <ul className="space-y-3">
                    {result.audit_reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                            <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            {reason}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cover Letter */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tailored Cover Letter</h3>
                    <button
                        onClick={() => navigator.clipboard.writeText(result.tailored_cover_letter)}
                        className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <Copy className="w-3 h-3" /> Copy
                    </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none bg-black/30 p-4 rounded-xl border border-white/5">
                    <ReactMarkdown>{result.tailored_cover_letter}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
