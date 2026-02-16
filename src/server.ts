import * as functions from 'firebase-functions';
import app from './app';
import { env } from './config/env';

const port = env.port || 3000;

// Export as a Firebase Function
export const api = functions.https.onRequest(app);

// Keep local server functionality
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

