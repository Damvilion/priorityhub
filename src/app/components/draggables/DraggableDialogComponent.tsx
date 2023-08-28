import React, { useEffect, useMemo, useState } from 'react';
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

interface draggableComponentProps {
    open: boolean;
    handleClose: () => void;
    handleClickOpen: () => void;
    name: string;
    entries: DocumentEntry[];
    setEntries: React.Dispatch<React.SetStateAction<DocumentEntry[]>>;
}

const DraggableDialogComponent = ({ open, handleClose, handleClickOpen, name, entries, setEntries }: draggableComponentProps) => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const updateLocalStorage = () => {
        if (!currentUser) localStorage.setItem('board', JSON.stringify(entries));
    };
    const updateBoardData = async () => {
        if (currentUser) {
            const dataRef = doc(db, 'users', currentUser.uid);
            await updateDoc(dataRef, {
                data: [...entries],
            });
        }
    };

    const updateState = (changedState: React.SetStateAction<DocumentEntry[]>) => {
        setEntries(changedState);
        console.log(changedState);
        console.log(setEntries);
    };

    const handleDelete = () => {
        const dataEntry: DocumentEntry[] = [...entries];
        dataEntry.map((item, index) => {
            if (item.columnName === name) {
                dataEntry.splice(index, 1);
            } else {
                return item;
            }
        });

        updateState(dataEntry);
        updateLocalStorage();
        updateBoardData();
    };

    return (
        <div className='text-white transition-all ease-in opacity-0 group-hover:opacity-100'>
            <button className='text-white' onClick={handleClickOpen}>
                edit
            </button>
            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby='draggable-dialog-title'>
                <DialogTitle className='text-black text-center flex flex-col' style={{ cursor: 'move' }} id='draggable-dialog-title'>
                    <div className='flex justify-evenly items-center'>
                        <p className='flex-1'>{name}</p>
                        <button
                            className='text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow'
                            onClick={handleDelete}>
                            delete
                        </button>
                    </div>
                    <div className='p-5'>
                        <input className='text-center' type='text' placeholder='change the name' />
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableDialogComponent;
