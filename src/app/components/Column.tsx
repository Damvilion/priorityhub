import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
const Column = ({ index, content, draggableId, name }: any) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                    <div
                        className='bg-black p-5 m-2 md:w-[400px] w-[200px]
                    '>
                        <div className='flex justify-between gap-1'>
                            <p className='text-white'>{name}</p>
                            <button className='text-white text-xs'>edit</button>
                        </div>
                    </div>
                    <Droppable droppableId={name}>
                        {(provided) => (
                            <div
                                className='shadow-md border border-solid w-[95%] p-5 mx-auto mb-5'
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {content.map((item: any, index: React.Key | null | undefined) => (
                                    <Card index={index} text={item} key={`${item + index}`} draggableId={`${item + index}`} />
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
