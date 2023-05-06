import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAMRMrmhFQYbjWCFZpDRMx4GgcJDMsGglA',
  authDomain: 'disneyplus1-clone.firebaseapp.com',
  projectId: 'disneyplus1-clone',
  storageBucket: 'disneyplus1-clone.appspot.com',
  messagingSenderId: '1042146851851',
  appId: '1:1042146851851:web:3a30f63b2a580b77eb1b0e',
  measurementId: 'G-WR45HCNHE1',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
