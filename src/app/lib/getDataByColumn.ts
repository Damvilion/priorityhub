import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';

export const getDataByColumn = async () => {
    const docRef = doc(db, 'todos', 'todo');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const todos = docSnap.data();
        const value = JSON.stringify(todos);
        console.log(value);
        return value;
    }
};
