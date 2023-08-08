import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ text, index, draggableId }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    <div
                        className={`${
                            Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
                        } rounded-md border border-solid w-full text-center p-5 m-2 text-white`}>
                        {text}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
