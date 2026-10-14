// Centralized Firebase client initialization.
// The site is a static export, so Firebase is initialized lazily in the browser only.
// Client config values are public identifiers, not secrets — access control lives in firestore.rules.

import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  browserSessionPersistence,
  getAuth,
  initializeAuth,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const appCheckSiteKey = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY;

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super("Firebase is not configured. Set the NEXT_PUBLIC_FIREBASE_* environment variables.");
    this.name = "FirebaseNotConfiguredError";
  }
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("The Firebase client SDK can only be used in the browser.");
  }
  if (!isFirebaseConfigured) throw new FirebaseNotConfiguredError();

  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);

    if (appCheckSiteKey) {
      if (process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG === "true") {
        // Prints a debug token to the console for local development; register it in the Firebase Console.
        (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(appCheckSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}

/** Admin sessions use tab-scoped persistence: closing the tab signs the admin out. */
export function getFirebaseAuth(): Auth {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    try {
      auth = initializeAuth(firebaseApp, { persistence: browserSessionPersistence });
    } catch {
      // Already initialized (e.g. after a fast refresh in development).
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
}
