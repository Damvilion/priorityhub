import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './ModalComponents/CardModal';

const Card = ({ title, body, imgUrl, index, draggableId }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    <CardModal title={title} body={body} Snapshot={Snapshot} />
                </div>
            )}
        </Draggable>
    );
};
export default Card;
