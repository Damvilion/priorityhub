import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableCardComponent from './draggables/DraggableCardComponent';
import CardModal from './ModalComponents/CardModal';
import { UpdateModalContext } from '../useContext/Context';

const Card = ({ title, body, imgUrl, index, draggableId }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    {/* <DraggableCardComponent title={title} body={body} imgUrl={imgUrl} Snapshot={Snapshot} /> */}
                    <CardModal title={title} body={body} Snapshot={Snapshot} />
                </div>
            )}
        </Draggable>
    );
};
export default Card;
