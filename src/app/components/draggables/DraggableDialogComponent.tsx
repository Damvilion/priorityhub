import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const DraggableDialogComponent = ({ open, handleClose, handleClickOpen, name }: any) => {
    return (
        <div className='text-white transition-all ease-in opacity-0 group-hover:opacity-100'>
            <button className='text-white' onClick={handleClickOpen}>
                edit
            </button>
            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby='draggable-dialog-title'>
                <DialogTitle
                    className='bg-[#80008085] border p-5 m-2 md:w-[400px] w-[200px] group rounded-sm text-center flex flex-col'
                    style={{ cursor: 'move' }}
                    id='draggable-dialog-title'>
                    {name}
                    <input type='text' />
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableDialogComponent;
