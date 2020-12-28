import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCh-dtFknBSJHTiFJGGXxF3dN9bq413JI0",
    authDomain: "nextblog-8d3fd.firebaseapp.com",
    projectId: "nextblog-8d3fd",
    storageBucket: "nextblog-8d3fd.appspot.com",
    messagingSenderId: "1044577800676",
    appId: "1:1044577800676:web:fd323f4b6a49243617b7f1"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;