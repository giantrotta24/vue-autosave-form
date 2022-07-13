import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: 'AIzaSyDk9xOKAbur5qFkbegMGd_NKyrq9lflHQw',
  authDomain: 'vue-autosave-form-e4420.firebaseapp.com',
  projectId: 'vue-autosave-form-e4420',
  storageBucket: 'vue-autosave-form-e4420.appspot.com',
  messagingSenderId: '1035449537835',
  appId: '1:1035449537835:web:5e405f25297c9e80a6a16e',
  measurementId: 'G-EK8F0H3067',
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db };
