"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText } from "lucide-react";

interface Props {
    onFileSelect: (file: File) => void;
}

export default function ResumeUploader({ onFileSelect }: Props) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSet(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSet(e.target.files[0]);
        }
    };

    const validateAndSet = (file: File) => {
        if (file.type === "application/pdf") {
            onFileSelect(file);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    return (
        <div
            className={`relative group cursor-pointer flex flex-col items-center justify-center w-full h-80 rounded-3xl border-2 border-dashed transition-all duration-300 ${isDragging
                    ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
                    : "border-gray-700 hover:border-purple-400 hover:bg-white/5"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={handleChange}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl pointer-events-none" />

            <div className="z-10 flex flex-col items-center space-y-4">
                <div className={`p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl transition-transform duration-300 ${isDragging ? "scale-110" : "group-hover:scale-110"}`}>
                    <UploadCloud className={`w-10 h-10 ${isDragging ? "text-purple-400" : "text-gray-400"}`} />
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Upload your Resume
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Drag & Drop or Click to Browse (PDF)
                    </p>
                </div>
            </div>
        </div>
    );
}
