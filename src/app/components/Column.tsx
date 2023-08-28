import React, { useState } from 'react';
import { Draggable as BeautifulDraggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import DraggableDialogComponent from './draggables/DraggableDialogComponent';
import DraggableAddNewComponent from './draggables/DraggableAddNewComponent';
const Column = ({ index, content, draggableId, name, entries, setEntries }: any) => {
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
                                <DraggableDialogComponent
                                    open={open}
                                    handleClickOpen={handleClickOpen}
                                    handleClose={handleClose}
                                    name={name}
                                    entries={entries}
                                    setEntries={setEntries}
                                />
                            </div>
                        </div>
                    </div>
                    <Droppable droppableId={name}>
                        {(provided, Snapshot) => (
                            <div
                                className={`${
                                    Snapshot.draggingOverWith ? 'bg-pink-900 transition-all ease-in' : ''
                                } shadow-md border border-solid w-[95%] p-5 mx-auto mb-5`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {content.map((item: Content, index: number) => (
                                    <Card
                                        index={index}
                                        title={item.Title}
                                        body={item.Body}
                                        imgUrl={item.imgUrl}
                                        key={item.Title}
                                        draggableId={item.Title}
                                    />
                                ))}
                                {provided.placeholder}
                                <DraggableAddNewComponent entries={entries} setEntries={setEntries} />
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </BeautifulDraggable>
    );
};

export default Column;
