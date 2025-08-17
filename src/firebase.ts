import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyA_MlcNaupmISJ_8lEJHYSCLzCr5jmoDXA",
  authDomain: "cooldown-terminal.firebaseapp.com",
  databaseURL: "https://cooldown-terminal-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "cooldown-terminal",
  storageBucket: "cooldown-terminal.firebasestorage.app",
  messagingSenderId: "753177940178",
  appId: "1:753177940178:web:e2dcc2892c7efc77b9dd0b",
  measurementId: "G-WZN4CN14GP"
}

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