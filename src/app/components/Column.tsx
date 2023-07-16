import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
const Column = ({ index, id, text }: any) => {
    return (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided) => (
                <div className='bg-black p-5 m-2' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <p className='text-white text-center'>{text}</p>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
