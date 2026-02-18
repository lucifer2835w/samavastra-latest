import * as admin from 'firebase-admin';
import { db } from './src/config/firebase';

async function checkUsers() {
    try {
        const snapshot = await db.collection('users').get();
        console.log(`Found ${snapshot.size} users.`);
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    } catch (error) {
        console.error('Error getting users:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }
}

checkUsers();
