import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
const Column = ({ index, name, content }: any) => {
    return (
        <Draggable draggableId={name} index={index} key={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                    <div className='bg-black p-5 m-2 w-[400px]'>
                        <div className='flex justify-between gap-1'>
                            <p className='text-white'>{name}</p>
                            <button className='text-white text-xs'>edit</button>
                        </div>
                    </div>
                    <Droppable droppableId={`${name} column`}>
                        {(provided) => (
                            <div
                                className='shadow-md border border-solid w-[95%] p-5 mx-auto mb-5'
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {content.map((item, index) => (
                                    <Card index={index} text={item} key={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
