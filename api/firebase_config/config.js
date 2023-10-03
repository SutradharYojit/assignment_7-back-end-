// Firebase config file to connect with firebase
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut ,} = require('firebase-admin/auth');



const serviceAccount = require('../../nodejs-firebase-30957-firebase-adminsdk-2saps-d819436429.json')
// const firebaseConfig = {
//   apiKey: "AIzaSyAPmXP4aC_WmXII_QScMzgkohZtEJB4ymo",
//   authDomain: "nodejs-firebase-30957.firebaseapp.com",
//   projectId: "nodejs-firebase-30957",
//   storageBucket: "nodejs-firebase-30957.appspot.com",
//   messagingSenderId: "1047435442719",
//   appId: "1:1047435442719:web:c192346226e54bb1ea732a",
//   measurementId: "G-79HFCYY8ZK"
// };

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://nodejs-firebase-30957-default-rtdb.firebaseio.com/', 
  storageBucket: 'gs://nodejs-firebase-30957.appspot.com/',
});

const db = getFirestore();
const auth = getAuth();

module.exports ={db,auth};