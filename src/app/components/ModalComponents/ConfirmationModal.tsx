import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { setBoard } from '@/app/redux/boardState';

interface ConfirmationModalProps {
    index: number;
}

const ConfirmationModal = ({ index }: ConfirmationModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { board } = useSelector((state: RootState) => state.board);
    const dispatch = useDispatch();
    const handleDelete = () => {
        const boardCopy = [...board];
        boardCopy.splice(index, 1);
        dispatch(setBoard(boardCopy));
    };
    return (
        <>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out bg-red-700 rounded-full p-1 cursor-pointer'
                onClick={onOpen}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
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
                            <ModalHeader className='flex flex-col gap-1 text-black text-center'>ARE YOU SURE?</ModalHeader>
                            <ModalBody>
                                <Button color='secondary' variant='light' onPress={onClose}>
                                    Close
                                </Button>
                                <Button color='danger' onClick={handleDelete} onPress={onClose}>
                                    DELETE
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConfirmationModal;
