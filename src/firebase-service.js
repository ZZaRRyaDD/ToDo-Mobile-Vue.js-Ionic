import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};
const db = firebase.initializeApp(firebaseConfig).firestore();

export default () => {
    const readOperation = async (collectionName) => {
        const firebaseCollection = db.collection(collectionName);
        const querySnapshot = await firebaseCollection.get();
        const result = querySnapshot.docs.map((doc) => {
            return {...doc.data()}
        });
        return result;
    };
    const createOperation = async (collectionName, data) => {
        const firebaseCollection = db.collection(collectionName);
        const firebaseObject = await firebaseCollection.add(data);
        console.log(firebaseObject);
        return firebaseObject;
    }
    const deleteOperation = async (collectionName, username) => {
        const firebaseCollection = db.collection(collectionName);
        const querySnapshot = await firebaseCollection.where('username', "==", username).get();
        const result = querySnapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        });
        firebaseCollection.doc(`${result[0].id}`).delete();
    }
    const findIdForDoc = async (collectionName, username) => {
        const firebaseCollection = db.collection(collectionName);
        const querySnapshot = await firebaseCollection.where('username', "==", username).get();
        const result = querySnapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        });
        return result[0];
    }
    const updateOperation = async (collectionName, updatedData) => {
        const firebaseCollection = db.collection(collectionName);
        firebaseCollection.doc(updatedData.id).update(updatedData);
    }
    return {
        readOperation,
        createOperation,
        deleteOperation,
        findIdForDoc,
        updateOperation
    };
};