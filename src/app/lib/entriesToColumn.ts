import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';

export const entriesToColumn = async () => {
    const docRef = doc(db, 'todos', 'todo');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const todos = docSnap.data();
        // const board = todos['todo'].map((item) => {
        //     return item;
        // });
        // console.log(board);
        // return board;
        console.log(todos.entries);
        const obj = todos.entries;
        const keys = Object.keys(obj);

        return todos['entries'];
        // return 'hello';
    } else {
        console.log('never started');
    }
};
