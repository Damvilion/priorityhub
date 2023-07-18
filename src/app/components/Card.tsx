import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Card = ({ text, index }) => {
    return (
        <Draggable draggableId={text} index={index} key={text}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    <div className='border border-solid w-full text-center p-5 m-2'>{text}</div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
