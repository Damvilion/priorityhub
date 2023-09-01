import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { setBoard } from '@/app/redux/boardState';
import { useDispatch } from 'react-redux';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';

const AddButtonSheet = () => {
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    const [openColumn, setOpenColumn] = useState(false);
    const [input, setInput] = useState('');

    const doesExist = () => {
        const columns = [...board];
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
            const every = [...board];
            const newBlock: DocumentEntry = {
                columnName: input,
                content: [],
            };
            every.unshift(newBlock);
            dispatch(setBoard(every));
            setInput('');
            setOpenColumn((prev) => !prev);
        }
    };
    return (
        <div className='flex justify-center mb-2'>
            <div className=''>
                <Sheet>
                    <SheetTrigger className='text-white'>
                        <img src='/plus-img.svg' className='h-10 bg-white rounded-full opacity-90 hover:opacity-100' />
                    </SheetTrigger>
                    <SheetContent className='bg-purple-700 border-none'>
                        <SheetHeader>
                            <SheetTitle className='mx-auto'>Add Column</SheetTitle>
                            <SheetDescription className='text-white'>Filler Text</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default AddButtonSheet;
