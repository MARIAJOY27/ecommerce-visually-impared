const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: "AIzaSyAndfnqAdu2DnV0Mm3uZY2sJwN8eCM-13k",
    authDomain: "sanam-99575.firebaseapp.com",
    projectId: "sanam-99575",
    storageBucket: "sanam-99575.appspot.com",
    messagingSenderId: "105350559032",
    appId: "1:105350559032:web:10bcc8838ff6d3c60fbdcd",
    measurementId: "G-2L09XVWFYG"
  };

const app = initializeApp(firebaseConfig);
db = getFirestore(app);


module.exports = db