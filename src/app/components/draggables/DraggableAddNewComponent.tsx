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

const DraggableAddNewComponent = () => {
    const [openCard, setOpenCard] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpenCard((prev: boolean) => !prev)}
                className='rounded-md w-full mx-auto text-[#aaa9a6] text-center p-5 m-2 flex hover:bg-[#dfdedd] transition-all ease-in'>
                Add New
            </button>
            <Dialog
                open={openCard}
                onClose={() => setOpenCard((prev: boolean) => !prev)}
                PaperComponent={PaperCardComponent}
                aria-labelledby='draggable-card-title'>
                <DialogTitle className='text-black text-center flex flex-col' style={{ cursor: 'move' }} id='draggable-card-title'>
                    <div className='p-5'>
                        <input className='text-center p-2' type='text' placeholder='Add New Item' />
                    </div>
                </DialogTitle>
            </Dialog>
        </div>
    );
};

export default DraggableAddNewComponent;
