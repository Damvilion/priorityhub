import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableCardComponent from './draggables/DraggableCardComponent';

const Card = ({ text, index, draggableId }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    <DraggableCardComponent text={text} Snapshot={Snapshot} />
                </div>
            )}
        </Draggable>
    );
};

export default Card;
