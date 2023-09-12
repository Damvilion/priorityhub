import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './ModalComponents/CardModal';

const Card = ({ title, body, imgUrl, cardIndex, columnIndex, draggableId }: any) => {
    return (
        <Draggable draggableId={draggableId} index={cardIndex}>
            {(provided, Snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className='flex flex-col items-center
                    '
                    onClick={() => console.log(draggableId)}>
                    <CardModal title={title} body={body} Snapshot={Snapshot} columnIndex={columnIndex} cardIndex={cardIndex} />
                </div>
            )}
        </Draggable>
    );
};
export default Card;
