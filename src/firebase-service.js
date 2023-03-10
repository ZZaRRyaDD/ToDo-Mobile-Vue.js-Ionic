import { initializeApp } from "firebase/app";
import { getFirestore, query, orderBy, doc, getDoc, getDocs, addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default () => {
    const readAll = async (collectionName) => {
        const q = query(collection(db, collectionName), orderBy("title"))
        return await getDocs(q).then(querySnapshot => {
            const tasks = []
            querySnapshot.forEach(doc => {
                tasks.push({id: doc.id, ...doc.data()})
            })
            return tasks
        });
    };
    const readById = async (collectionName, id) => {
        const querySnapshot = await getDoc(doc(collection(db, collectionName), id));
        if (querySnapshot.exists()) {
            const task = querySnapshot.data()
            task.id = querySnapshot.id
            return task
        }
    }
    const create = async (collectionName, data) => {
        const querySnapshot = await addDoc(collection(db, collectionName), data);
        const task = JSON.parse(JSON.stringify(data))
        task.id = querySnapshot.id
        return task
    }
    const remove = async (collectionName, id) => {
        await deleteDoc(doc(collection(db, collectionName), id));
    }
    const update = async (collectionName, id, updatedData) => {
        await updateDoc(doc(collection(db, collectionName), id), updatedData);
    }
    return {
        readAll,
        readById,
        remove,
        create,
        update,
    };
};