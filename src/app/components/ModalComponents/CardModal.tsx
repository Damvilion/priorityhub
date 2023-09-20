/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect } from 'react';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setBoard } from '@/app/redux/boardState';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../firebase-config';
import { uuid } from 'uuidv4';
import Image from 'next/image';

interface CardModalProps {
    title: string;
    Snapshot: DraggableStateSnapshot;
    body: string;
    columnIndex: number;
    cardIndex: number;
    imgUrl: string;
}

const CardModal = ({ title, Snapshot, body, columnIndex, cardIndex, imgUrl }: CardModalProps) => {
    const { currentUser } = useSelector((state: RootState) => state.user);
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
    const [imgUrlText, setImgUrlText] = useState(imgUrl);
    const [selectedFile, setSelectedFile] = useState(null);
    const [signUpModal, setSignUpModal] = useState(false);

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [loading, setLoading] = useState(false);

    const handleOffClick = () => {
        const boardCopy: DocumentEntry[] = JSON.parse(JSON.stringify(board));
        boardCopy[columnIndex].content[cardIndex].Title = titleText;
        boardCopy[columnIndex].content[cardIndex].Body = bodyText;
        boardCopy[columnIndex].content[cardIndex].imgUrl = imgUrlText;

        dispatch(setBoard(boardCopy));
    };

    const handleDelete = () => {
        closeModal();
        const boardCopy: DocumentEntry[] = JSON.parse(JSON.stringify(board));
        boardCopy[columnIndex].content.splice(cardIndex, 1);
        dispatch(setBoard(boardCopy));
    };

    const handleFileChange = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            setSignUpModal(true);
            return;
        }
        if (!selectedFile) return;
        setLoading(true);
        if (selectedFile && currentUser) {
            try {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytes(storageRef, selectedFile);

                uploadTask.then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(async (downnloadUrl) => {
                        setImgUrlText(downnloadUrl);
                        setLoading(false);
                    });
                });
            } catch (err) {
                setLoading(false);
            }
        }
    };

    return (
        <div
            className={`${
                Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
            } flex flex-col rounded-md border border-solid w-full text-center m-2 text-white hover:border-purple-400 overflow-hidden`}>
            <div onClick={openModal} className='w-full flex flex-col'>
                {imgUrl && (
                    <div className='flex justify-center h-40 overflow-hidden rounded-t-md'>
                        <img alt='picture' className='w-full object-cover' src={imgUrl} />
                        {/* <Image
                            alt='image'
                            src={imgUrl}
                            width={100}
                            height={100}
                            quality={100}
                            className='w-full object-cover'
                        /> */}
                    </div>
                )}
                <div className='p-2 my-2'>{title}</div>
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
                            <div className='flex flex-col justify-between h-full'>
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
                                    className='h-1/2 rounded-lg p-2 border border-solid border-black'
                                />
                                <div className='text-center'>
                                    <div className='flex items-center gap-2'>
                                        <p>Image Url</p>
                                        {imgUrl ? (
                                            <a href={`${imgUrl}`} target='_blank' className='cursor-pointer'>
                                                <input
                                                    className='text-black border border-solid border-black p-4'
                                                    value={imgUrlText}
                                                    readOnly
                                                    type='text'
                                                />
                                            </a>
                                        ) : (
                                            <input
                                                className='text-black border border-solid border-black p-4'
                                                value={imgUrlText}
                                                readOnly
                                                type='text'
                                            />
                                        )}
                                        {/* <input
                                            className='text-black border border-solid border-black p-4'
                                            value={imgUrlText}
                                            readOnly
                                            type='text'
                                        /> */}
                                        {imgUrlText && (
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='w-6 h-6 text-white  bg-red-700 rounded-full p-1 cursor-pointer'
                                                onClick={() => {
                                                    setImgUrlText('');
                                                    setSelectedFile(null);
                                                }}>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M6 18L18 6M6 6l12 12'
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    <form onSubmit={handleUpload}>
                                        <input type='file' id='file' className='py-3' onChange={handleFileChange}></input>
                                        <Button isLoading={loading} className='m-2' type='submit'>
                                            Upload Image
                                        </Button>
                                        {signUpModal && <p className='text-red-600 text-sm'>Sign In to Upload Images</p>}
                                    </form>
                                </div>
                                <div className='flex justify-evenly'>
                                    <Button color='danger' onClick={handleDelete}>
                                        DELETE
                                    </Button>
                                    <Button color='success' onClick={closeModal}>
                                        SAVE
                                    </Button>
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
