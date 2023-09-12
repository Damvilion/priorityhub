import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setBoard } from '@/app/redux/boardState';
import { Button } from '@nextui-org/react';

interface CardModalProps {
    title: string;
    Snapshot: DraggableStateSnapshot;
    body: string;
    columnIndex: number;
    cardIndex: number;
}

const CardModal = ({ title, Snapshot, body, columnIndex, cardIndex }: CardModalProps) => {
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();

    const [openCard, setOpenCard] = useState(false);

    const openModal = () => {
        setOpenCard(true);
    };
    const closeModal = () => {
        handleOffClick();
        setOpenCard(false);
    };

    const [titleText, setTitleText] = useState(title);
    const [bodyText, setBodyText] = useState(body);

    const handleOffClick = () => {
        const boardCopy: DocumentEntry[] = JSON.parse(JSON.stringify(board));
        boardCopy[columnIndex].content[cardIndex].Title = titleText;
        boardCopy[columnIndex].content[cardIndex].Body = bodyText;

        dispatch(setBoard(boardCopy));
    };

    const handleDelete = () => {
        closeModal();
        const boardCopy: DocumentEntry[] = JSON.parse(JSON.stringify(board));
        boardCopy[columnIndex].content.splice(cardIndex, 1);
        dispatch(setBoard(boardCopy));
    };
    // test

    return (
        <div
            className={`${
                Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
            } rounded-md border border-solid w-full text-center m-2 text-white hover:border-purple-400`}>
            <div onClick={openModal} className='w-full p-5'>
                {title}
            </div>

            <Transition
                appear
                show={openCard}
                as={Fragment}
                enter='ease-out duration-300'
                leave='transform transition ease-in-out duration-250 sm:duration-700'>
                <Dialog as='div' onClose={closeModal} className='fixed inset-0 flex items-center justify-end z-50'>
                    <Transition.Child
                        as={Fragment}
                        enter='transform transition ease-in-out duration-300 sm:duration-300'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-300 sm:duration-300'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'>
                        <Dialog.Panel className='w-full max-w-sm p-4 bg-white text-black rounded relative z-50 h-screen'>
                            <div className='flex flex-col justify-evenly h-full'>
                                <EditText
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    style={{
                                        textAlign: 'center',
                                        padding: '1.25rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        border: 'none',
                                    }}
                                    onBlur={handleOffClick}
                                    onSave={handleOffClick}
                                />

                                <textarea
                                    value={bodyText}
                                    onChange={(e) => setBodyText(e.target.value)}
                                    placeholder='Add a Description'
                                    className='h-1/2 rounded-lg p-2'
                                />
                                <div className='text-center'>
                                    <input type='file'></input>
                                </div>
                                <div className='flex justify-evenly'>
                                    {/* <button onClick={handleDelete}>DELETE</button> */}
                                    <Button color='danger' onClick={handleDelete}>
                                        DELETE
                                    </Button>
                                    <Button color='secondary' onClick={closeModal}>
                                        SAVE
                                    </Button>
                                    {/* <button onClick={closeModal}>SAVE</button> */}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CardModal;
