import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableCardComponent from './draggables/DraggableCardComponent';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';

const Card = ({ title, body, imgUrl, index, draggableId }: any) => {
    const [openCard, setOpenCard] = useState(false);

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, Snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className='flex flex-col items-center'>
                    {/* <DraggableCardComponent title={title} body={body} imgUrl={imgUrl} Snapshot={Snapshot} /> */}

                    {/* <div
                        className={`${
                            Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
                        } rounded-md border border-solid w-full text-center p-5 m-2 text-white hover:border-purple-400`}
                        onClick={() => setOpenCard((prev: boolean) => !prev)}>
                        {title}
                    </div> */}
                    <Sheet open={openCard}>
                        <div
                            className={`${
                                Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
                            } rounded-md border border-solid w-full text-center p-5 m-2 text-white hover:border-purple-400`}
                            onClick={() => setOpenCard((prev) => !prev)}>
                            {title}
                        </div>
                        <SheetContent className='bg-purple-700 border-none'>
                            <SheetHeader className=''>
                                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                                <input placeholder='TYPEE'></input>
                                <SheetDescription className='text-white'>Blah Blah Blah</SheetDescription>
                            </SheetHeader>

                            <button onClick={() => setOpenCard((prev: boolean) => !prev)}>close</button>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </Draggable>
    );
};
export default Card;
