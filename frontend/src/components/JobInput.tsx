"use client";

import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    fileName?: string;
    onBack: () => void;
}

export default function JobInput({ value, onChange, onSubmit, fileName, onBack }: Props) {
    return (
        <div className="w-full h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-xs text-gray-300 border border-white/10">
                    <FileText className="w-3 h-3 text-purple-400" />
                    <span className="max-w-[150px] truncate">{fileName || "resume.pdf"}</span>
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold">Paste Job Description</h2>
                <p className="text-gray-400 text-sm">Copy the full job description here.</p>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Software Engineer needed..."
                className="w-full flex-1 min-h-[200px] p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none resize-none text-sm placeholder:text-gray-600 font-mono"
            />

            <button
                onClick={onSubmit}
                disabled={!value.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
                Analyze Match
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
