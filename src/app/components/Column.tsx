import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
const Column = ({ index, item, content, draggableId, name }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                    <div className='bg-black p-5 m-2 w-[400px]'>
                        <div className='flex justify-between gap-1'>
                            <p className='text-white'>{name}</p>
                            <button className='text-white text-xs'>edit</button>
                        </div>
                    </div>
                    <Droppable droppableId={`${item.columnName}`}>
                        {(provided) => (
                            <div
                                className='shadow-md border border-solid w-[95%] p-5 mx-auto mb-5'
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {content.map((item: any, index: React.Key | null | undefined) => (
                                    <Card index={index} text={item} key={index} draggableId={`${item} card`} />
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
