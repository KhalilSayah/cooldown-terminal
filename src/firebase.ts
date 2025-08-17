import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Firebase setup steps:
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Add a web app to your project
// 3. Copy the firebaseConfig object provided and replace the above config
// 4. Enable Realtime Database in your Firebase console
// 5. Set up Realtime Database rules to allow read/write access:
//    {
//      "rules": {
//        ".read": true,
//        ".write": true
//      }
//    }
// 6. Install Firebase in your project: npm install firebase
// 7. Import and initialize Firebase in your app as shown above