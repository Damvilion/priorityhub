import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { DialogContent } from '@mui/material';

function PaperComponent(props: PaperProps) {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableColumnComponent = () => {
    const [openColumn, setOpenColumn] = useState(false);
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
                        <input className='text-center p-2' type='text' placeholder='Add Column...' />
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableColumnComponent;
