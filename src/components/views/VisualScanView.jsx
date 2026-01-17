// src/components/views/VisualScanView.jsx
"use client";
import React, { useRef, useState } from "react";
import {
  Camera,
  Info,
  Brain,
  Check,
  Ban,
  Flag,
  UploadCloud,
  ScanEye,
  Loader2, // Added for loading spinner
} from "lucide-react";

export default function VisualScanView({ onScanComplete }) {
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [activeInput, setActiveInput] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* ---------- IMAGE HANDLER ---------- */
  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  /* ---------- REAL AI VISION ANALYSIS ---------- */
  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      // Call your Vision API
      const res = await fetch("/api/vision", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Vision analysis failed");

      const data = await res.json();
      
      setResult(data);
      
      // 🔥 Notify parent (page.js) to switch views & update chat
      if (onScanComplete) {
         onScanComplete(data);
      }

    } catch (e) {
      console.error(e);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      {/* Page Header */}
      <header className="mb-8 flex flex-col gap-2">
        <h2 className="text-[#101817] dark:text-white text-3xl font-black tracking-tight flex items-center gap-3">
          <ScanEye className="w-8 h-8 text-[#00a88c]" />
          Visual Waste Identification
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl leading-relaxed">
          Utilizing IBM Granite Vision for high-precision urban waste categorization.
        </p>
      </header>

      {/* HIDDEN INPUTS */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Upload Area */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div
            className="flex-1 min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-white/5 p-12 transition-all hover:border-[#00a88c]/50 hover:bg-[#00a88c]/5 group cursor-pointer"
            onClick={() => {
                setActiveInput("upload");
                galleryInputRef.current.click();
            }}
          >
            <div className="flex flex-col items-center gap-6 text-center max-w-sm">
              <div className="flex gap-4">
                {/* CAMERA BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveInput("camera");
                    cameraInputRef.current.click();
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      activeInput === "camera"
                        ? "bg-[#00a88c] text-white scale-110 shadow-lg shadow-[#00a88c]/40 ring-4 ring-[#00a88c]/30"
                        : "bg-[#00a88c]/10 text-[#00a88c] opacity-60 hover:opacity-100"
                    }`}
                >
                  <Camera className="w-8 h-8" />
                </button>

                {/* UPLOAD BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveInput("upload");
                    galleryInputRef.current.click();
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      activeInput === "upload"
                        ? "bg-[#00a88c] text-white scale-110 shadow-lg shadow-[#00a88c]/40 ring-4 ring-[#00a88c]/30"
                        : "bg-[#00a88c]/10 text-[#00a88c] opacity-60 hover:opacity-100"
                    }`}
                >
                  <UploadCloud className="w-8 h-8" />
                </button>
              </div>

              <div>
                <p className="text-xl font-bold text-[#101817] dark:text-white">
                  Ready for analysis
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Click or use camera to upload an image
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveInput("upload");
                  galleryInputRef.current.click();
                }}
                className="bg-[#00a88c] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#008f75] transition-colors"
              >
                Select File
              </button>
            </div>
          </div>

          {/* Action Area (Preview & Analyze) */}
          {preview && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-2">Selected Image</p>
                  <img src={preview} alt="Selected" className="h-48 w-full object-contain rounded-lg bg-black/5 dark:bg-black/20" />
               </div>
               
               <button
                onClick={analyzeImage}
                disabled={loading}
                className="self-start w-full bg-[#00a88c] hover:bg-[#008f75] text-white px-6 py-4 rounded-xl font-bold hover:scale-[1.01] transition-all shadow-lg shadow-[#00a88c]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                    </>
                ) : (
                    <>
                        <Brain className="w-5 h-5" /> Run Analysis
                    </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (Preview / Result Placeholders) */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <p className="text-sm font-bold mb-2 text-[#101817] dark:text-white">Analysis Status</p>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-[#00a88c]/20 border-t-[#00a88c] animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ScanEye className="w-6 h-6 text-[#00a88c]" />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-[#101817] dark:text-white">Analyzing Image</p>
                            <p className="text-xs text-slate-500">Identifying waste category...</p>
                        </div>
                    </div>
                ) : result ? (
                    <div className="text-green-500 flex flex-col items-center gap-2">
                        <Check className="w-12 h-12" />
                        <p className="font-bold">Analysis Complete!</p>
                        <p className="text-xs text-slate-500">Redirecting to chat...</p>
                    </div>
                ) : preview ? (
                    <div className="text-slate-400 flex flex-col items-center gap-2">
                        <Info className="w-10 h-10 opacity-20" />
                        <p className="text-sm">Ready to analyze</p>
                    </div>
                ) : (
                    <div className="text-slate-400 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                            <UploadCloud className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-sm">No image selected</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}