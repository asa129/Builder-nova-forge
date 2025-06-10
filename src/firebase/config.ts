import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Check if Firebase environment variables are configured
const isFirebaseConfigured = () => {
  return !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
  );
};

// Demo Firebase configuration for development
const demoFirebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop",
  measurementId: "G-ABCDEFGHIJ",
};

// Production Firebase configuration
const prodFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Use production config if available, otherwise use demo config
const firebaseConfig = isFirebaseConfigured()
  ? prodFirebaseConfig
  : demoFirebaseConfig;

// Initialize Firebase only if not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase services with error handling
let db: any = null;
let auth: any = null;
let analytics: any = null;

try {
  if (isFirebaseConfigured()) {
    // Production Firebase services
    db = getFirestore(app);
    auth = getAuth(app);

    // Initialize Analytics conditionally
    analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
  } else {
    // Development mode - create mock services
    console.warn("Firebase not configured. Using demo mode for development.");

    // For development, we'll create a basic mock
    db = null; // Will be handled in components
    auth = null; // Will be handled in components
    analytics = null;
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Fallback to null services
  db = null;
  auth = null;
  analytics = null;
}

// Export configuration status
export const isFirebaseEnabled = isFirebaseConfigured();

export { db, auth, analytics };
export default app;
