import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setBoard } from '@/app/redux/boardState';
import { uuid } from 'uuidv4';
const AddNewColumn = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const handleDelete = () => {};

    const addEntry = (e: React.FormEvent) => {
        const every = [...board];
        const newBlock: DocumentEntry = {
            uuid: uuid(),
            columnName: input,
            content: [],
        };
        every.unshift(newBlock);
        dispatch(setBoard(every));
        setInput('');
    };

    return (
        <div>
            {' '}
            <button onClick={onOpen}>
                <img src='/plus-img.svg' className='h-10 bg-white rounded-full opacity-90 hover:opacity-100' />
            </button>
            <Modal
                backdrop='opaque'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
                }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1 text-black text-center'>Create Task?</ModalHeader>
                            <ModalBody>
                                <div className='bg-slate-500 w-full p-4 rounded-lg'>
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        type='text'
                                        className='outline-none text-white bg-none w-full bg-slate-500'
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <Button color='secondary' variant='light' onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color='danger' onClick={addEntry} onPress={onClose}>
                                        Add
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddNewColumn;
