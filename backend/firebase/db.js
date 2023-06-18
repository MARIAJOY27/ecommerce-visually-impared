const { collection, query, where, addDoc, getDocs } = require('firebase/firestore/lite')
const db = require('./config')

function addUser(username, password) {
    return new Promise(async(resolve, reject) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                username,
                password
            });
            resolve(docRef);
        } catch (e) {
            reject("error")
        }
    })
}


function getUser(username) {
    return new Promise(async(resolve, reject) => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const user = doc.data();
                resolve(user);
            } else {
                reject(false)
            }
        } catch (error) {
            reject(false)
        }
    })
}

function checkUserExists(username) {
    return new Promise(async(resolve, reject) => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
            if (!querySnapshot.empty) {
                reject(false);
            } else {
                resolve();
            }
        } catch (error) {
            reject(false);
        }
    })
}


module.exports = {
    getUser,
    addUser,
    checkUserExists
}