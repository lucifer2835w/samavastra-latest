import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// Option 1: Using GOOGLE_APPLICATION_CREDENTIALS environment variable (recommended)
// Set GOOGLE_APPLICATION_CREDENTIALS to the path of your service account key JSON file
// Option 2: Using FIREBASE_PROJECT_ID for default credentials (e.g., on Cloud Run / GCF)

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    // Parse the service account key from environment variable (base64 or JSON string)
    let serviceAccount: admin.ServiceAccount;
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch {
      // Try base64 decoding
      serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Uses the file path specified in GOOGLE_APPLICATION_CREDENTIALS
    admin.initializeApp();
  } else if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    // Default initialization (works on GCP, Firebase hosting, or with gcloud auth)
    admin.initializeApp();
  }
}

export const db = admin.firestore();
export { admin };
