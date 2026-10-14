"use client";

// Client-side auth gate for /admin. This only controls what is rendered — the data itself
// is protected by firestore.rules, which require an admins/{uid} document for every read.

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { describeAdminError, isAuthorizedAdmin } from "@/lib/admin-service";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

type GateState =
  | { kind: "loading" }
  | { kind: "signedOut"; notice?: string }
  | { kind: "admin"; user: User };

export default function AdminApp() {
  const [state, setState] = useState<GateState>({ kind: "loading" });

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const auth = getFirebaseAuth();
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState((prev) => (prev.kind === "signedOut" ? prev : { kind: "signedOut" }));
        return;
      }
      setState({ kind: "loading" });
      try {
        const allowed = await isAuthorizedAdmin(user.uid);
        if (cancelled) return;
        if (allowed) {
          setState({ kind: "admin", user });
        } else {
          await signOut(auth);
          setState({ kind: "signedOut", notice: "This account is not authorized to access the admin dashboard." });
        }
      } catch (err) {
        if (cancelled) return;
        await signOut(auth).catch(() => undefined);
        setState({ kind: "signedOut", notice: describeAdminError(err, "verify administrator access") });
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <Shell>
        <p className="text-sm text-slate-600">
          Firebase is not configured for this build. Set the <code>NEXT_PUBLIC_FIREBASE_*</code> environment
          variables and rebuild — see <code>docs/FREE_TRAINING_REGISTRATION.md</code>.
        </p>
      </Shell>
    );
  }

  if (state.kind === "loading") {
    return (
      <Shell>
        <p className="text-sm text-slate-500" role="status">Checking your session…</p>
      </Shell>
    );
  }

  if (state.kind === "signedOut") {
    return (
      <Shell>
        <AdminLogin notice={state.notice} />
      </Shell>
    );
  }

  return (
    <AdminDashboard
      user={state.user}
      onSignOut={async () => {
        await signOut(getFirebaseAuth());
        setState({ kind: "signedOut" });
      }}
      onAccessLost={(notice) => {
        signOut(getFirebaseAuth()).catch(() => undefined);
        setState({ kind: "signedOut", notice });
      }}
    />
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black tracking-tighter">FK</span>
          </div>
          <span className="text-[#0F172A] text-lg font-bold tracking-tight">
            Fresh<span className="text-[#2563EB]">kite</span> <span className="text-slate-400 font-medium">Admin</span>
          </span>
        </div>
        {children}
      </div>
    </main>
  );
}
