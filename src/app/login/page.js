"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { Leaf, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/");
    });
    return () => unsub();
  }, [router]);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.replace("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f8f8] dark:bg-[#0f2320]">
      <div className="w-full max-w-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-10 shadow-xl">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#00a88c]/10 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-[#00a88c]" />
          </div>
          <h1 className="text-3xl font-black text-[#101817] dark:text-white">
            Eco-Guide
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Smart waste segregation powered by AI
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-[#00a88c] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#008f75] transition-all shadow-lg shadow-[#00a88c]/20 active:scale-95"
        >
          <LogIn className="w-4 h-4" />
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-slate-400">
          By continuing, you agree to responsible waste-handling practices 🌱
        </p>
      </div>
    </div>
  );
}
