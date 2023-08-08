import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperCardComponent(props: PaperProps) {
    return (
        <Draggable handle='#draggable-card-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableCardComponent = ({ text, Snapshot }: any) => {
    const [openCard, setOpenCard] = useState(false);
    return (
        <div
            className={`${
                Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
            } rounded-md border border-solid w-full text-center p-5 m-2 text-white hover:border-purple-300`}
            // onClick={() => setOpenCard((prev: boolean) => !prev)}
        >
            <button className='text-white' onClick={() => setOpenCard((prev: boolean) => !prev)}>
                {text}
            </button>
            <Dialog
                open={openCard}
                onClose={() => setOpenCard((prev: boolean) => !prev)}
                PaperComponent={PaperCardComponent}
                aria-labelledby='draggable-card-title'>
                <DialogTitle className='text-black text-center flex flex-col' style={{ cursor: 'move' }} id='draggable-card-title'>
                    {text}
                    <div className='p-5'>
                        <input className='text-center p-2' type='text' placeholder='change the name' />
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableCardComponent;
