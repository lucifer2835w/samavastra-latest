import * as admin from 'firebase-admin';

// Initialize similar to src/config/firebase.ts but with more logging
console.log('--- DEFAULT CREDENTIALS CHECK ---');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('FIREBASE_SERVICE_ACCOUNT_KEY exists:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

try {
    if (!admin.apps.length) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            console.log('Initializing with FIREBASE_SERVICE_ACCOUNT_KEY...');
            let serviceAccount;
            try {
                serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            } catch {
                serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString());
            }
            admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            console.log('Initializing with GOOGLE_APPLICATION_CREDENTIALS file...');
            admin.initializeApp();
        } else if (process.env.FIREBASE_PROJECT_ID) {
            console.log('Initializing with FIREBASE_PROJECT_ID (ADC)...');
            admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
        } else {
            console.log('Initializing with default options...');
            admin.initializeApp();
        }
    }

    const db = admin.firestore();
    console.log('Firestore initialized. Attempting read...');

    db.collection('users').limit(1).get()
        .then(snap => {
            console.log('Read Success! Docs found:', snap.size);
            if (snap.empty) {
                console.log('No users found. Database might be empty.');
            }
        })
        .catch(err => {
            console.error('Read Failed!');
            console.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        });

} catch (e) {
    console.error('Initialization Error:', e);
}
