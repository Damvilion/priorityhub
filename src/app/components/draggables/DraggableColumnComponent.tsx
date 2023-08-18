import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase-config';

function PaperComponent(props: PaperProps) {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableColumnComponent = ({ entries, setEntries }: any) => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    const [openColumn, setOpenColumn] = useState(false);
    const [input, setInput] = useState('');

    const updateBoardData = async () => {
        if (currentUser) {
            const dataRef = doc(db, 'users', currentUser.uid);
            await updateDoc(dataRef, {
                data: [...entries],
            });
        }
    };

    const updateLocalStorage = () => {
        if (!currentUser) localStorage.setItem('board', JSON.stringify(entries));
    };

    const doesExist = () => {
        const columns = [...entries];
        for (let i = 0; i < columns.length; i++) {
            console.log(columns[i].columnName);
            const name = columns[i].columnName;
            if (name === input) {
                window.alert('Column already exists');
                return true;
            }
        }

        return false;
    };

    const addEntry = (e: React.FormEvent) => {
        e.preventDefault();
        if (doesExist()) {
            return;
        } else {
            const every = [...entries];
            const newBlock: Item = {
                columnName: input,
                content: [],
            };
            every.unshift(newBlock);
            setEntries(every);
            setInput('');
            setOpenColumn((prev) => !prev);
            updateLocalStorage();
            updateBoardData();
        }
    };

    return (
        <div className=''>
            <button onClick={() => setOpenColumn((prev) => !prev)}>
                <img src='/plus-img.svg' className='h-10 bg-white rounded-full opacity-90 hover:opacity-100' />
            </button>
            <Dialog
                open={openColumn}
                onClose={() => setOpenColumn((prev) => !prev)}
                PaperComponent={PaperComponent}
                aria-labelledby='draggable-dialog-title'
                className=''>
                <DialogTitle className='text-black text-center flex flex-col' style={{ cursor: 'move' }} id='draggable-dialog-title'>
                    <span>Add Column</span>

                    <div className='p-5'>
                        <form action='' onSubmit={addEntry}>
                            <input
                                className='text-center p-2'
                                type='text'
                                placeholder='Add Column...'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </form>
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableColumnComponent;
