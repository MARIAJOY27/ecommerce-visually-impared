const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: "AIzaSyB9UHG_T33mwhIDQc9_cLCYrlcSKrpVAHE",
    authDomain: "ecommerce-1f953.firebaseapp.com",
    projectId: "ecommerce-1f953",
    storageBucket: "ecommerce-1f953.appspot.com",
    messagingSenderId: "894685619843",
    appId: "1:894685619843:web:a43f653e76146b4a23ddb6",
    measurementId: "G-N7KCBR0R4G"
};

const app = initializeApp(firebaseConfig);
db = getFirestore(app);


module.exports = db