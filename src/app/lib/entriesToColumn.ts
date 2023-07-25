import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';

export const entriesToColumn = async () => {
    const docRef = doc(db, 'todos', 'todo');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const todos = docSnap.data();

        console.log(todos['entries']);
        return todos['entries'];
    } else {
        console.log('never started');
    }
};
