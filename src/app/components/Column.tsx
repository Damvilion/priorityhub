import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
const Column = ({ index, id, text, renderBoard }: any) => {
    return (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided) => (
                <div className='bg-black p-5 m-2 w-[400px]' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div className='flex justify-between gap-1'>
                        <p className='text-white text-center'>{text}</p>
                        <button className='text-white text-xs'>edit</button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
