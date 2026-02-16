"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.db = void 0;
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
// Initialize Firebase Admin SDK
// Option 1: Using GOOGLE_APPLICATION_CREDENTIALS environment variable (recommended)
// Set GOOGLE_APPLICATION_CREDENTIALS to the path of your service account key JSON file
// Option 2: Using FIREBASE_PROJECT_ID for default credentials (e.g., on Cloud Run / GCF)
if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        // Parse the service account key from environment variable (base64 or JSON string)
        let serviceAccount;
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        }
        catch {
            // Try base64 decoding
            serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString());
        }
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Uses the file path specified in GOOGLE_APPLICATION_CREDENTIALS
        admin.initializeApp();
    }
    else if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
        });
    }
    else {
        // Default initialization (works on GCP, Firebase hosting, or with gcloud auth)
        admin.initializeApp();
    }
}
exports.db = admin.firestore();
//# sourceMappingURL=firebase.js.map