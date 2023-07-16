import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config';

export const getDataByColumn = async () => {
    const docRef = doc(db, 'todos', 'todo');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const todos = docSnap.data();
        // const board = todos['todo'].map((item) => {
        //     return item;
        // });
        // console.log(board);
        // return board;
        return todos['todo'];
        // return 'hello';
    }
};
