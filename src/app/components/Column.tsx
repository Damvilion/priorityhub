import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Draggable as BeautifulDraggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import DraggableDialogComponent from './draggables/DraggableDialogComponent';
const Column = ({ index, content, draggableId, name }: any) => {
    const addItems = () => {};

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen((prev) => !prev);
    };

    return (
        <BeautifulDraggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                    <div
                        className={`${
                            Snapshot.draggingOver ? 'opacity-90' : ''
                        } bg-[#80008085] border p-5 m-2 md:w-[400px] w-[200px] group rounded-sm`}>
                        <div className='flex justify-between items-center gap-1'>
                            <p className='text-white'>{name}</p>
                            <div className='flex items-center gap-3'>
                                <DraggableDialogComponent open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} name={name} />
                            </div>
                        </div>
                    </div>
                    <Droppable droppableId={name}>
                        {(provided) => (
                            <div
                                className='shadow-md border border-solid w-[95%] p-5 mx-auto mb-5'
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {content.map((item: any, index: React.Key | null | undefined) => (
                                    <Card index={index} text={item} key={`${item + index}`} draggableId={`${item + index}`} />
                                ))}
                                {provided.placeholder}
                                <button
                                    className='rounded-md w-full mx-auto text-[#aaa9a6] text-center p-5 m-2 flex hover:bg-[#dfdedd] transition-all ease-in'
                                    onClick={addItems}>
                                    Add new
                                </button>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </BeautifulDraggable>
    );
};

export default Column;
