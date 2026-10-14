"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

function describeSignInError(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";
  switch (code) {
    // One message for all credential failures so the form doesn't reveal which accounts exist.
    case "auth/invalid-credential":
    case "auth/invalid-email":
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/user-disabled":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

export default function AdminLogin({ notice }: { notice?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      // On success, AdminApp's auth listener takes over and checks admin access.
      await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    } catch (err) {
      setError(describeSignInError(err));
      setSubmitting(false);
    }
  }

  const message = error || notice;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold text-[#0F172A]">Sign in</h1>

      {message && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3" role="alert">
          {message}
        </p>
      )}

      <div>
        <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] disabled:opacity-70 disabled:cursor-not-allowed transition-colors text-sm"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-xs text-slate-500">Sessions end when you close this browser tab.</p>
    </form>
  );
}
