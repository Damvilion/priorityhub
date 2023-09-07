import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ModalContext, UpdateModalContext } from '@/app/useContext/Context';
import { text } from 'stream/consumers';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const CardModal = ({ title, Snapshot, body }: any) => {
    // const modalIsOpen = useContext(ModalContext);
    // const updateModal = useContext(UpdateModalContext);

    // const [isOpen, setIsOpen] = useState(false);

    const [openCard, setOpenCard] = useState(false);

    // useEffect(() => {
    //     if (modalIsOpen) {
    //         setIsOpen(true);
    //     } else {
    //         setIsOpen(false);
    //     }
    // }, [modalIsOpen]);

    const [titleText, setTitleText] = useState(title);
    const [bodyText, setBodyText] = useState(body);

    const myStyle = {
        textAlign: 'center',
        padding: '1.25rem', // Use Tailwind's p-5 equivalent
        fontSize: '1.25rem', // Use Tailwind's text-xl equivalent
        fontWeight: 'bold',
    };
    return (
        <div
            className={`${
                Snapshot.draggingOver ? 'border-purple-500' : 'border-solid'
            } rounded-md border border-solid w-full text-center p-5 m-2 text-white hover:border-purple-400`}
            onClick={() => setOpenCard((prev: boolean) => !prev)}>
            {title}

            <Transition show={openCard} as={Fragment} enter='ease-out duration-300'>
                <Dialog
                    as='div'
                    onClose={() => setOpenCard((prev: boolean) => !prev)}
                    onClick={() => setOpenCard((prev: boolean) => !prev)}
                    className='fixed inset-0 flex items-center justify-end z-50'>
                    <Transition.Child
                        as={Fragment}
                        enter='transform transition ease-in-out duration-250 sm:duration-700'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-250 sm:duration-700'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'>
                        <Dialog.Panel className='w-full max-w-sm p-4 bg-white text-black rounded relative z-50 h-screen'>
                            <div className='flex justify-center flex-col'>
                                {/* <input type='text' value={title} className='text-center p-5 text-xl font-bold' /> */}
                                {/* <input type='text' value={body} className='text-center p-5 text-xl font-bold flex-wrap' /> */}
                                <EditText
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    // className='text-center p-5 text-xl font-bold'
                                    style={{
                                        textAlign: 'center',
                                        padding: '1.25rem', // Use Tailwind's p-5 equivalent
                                        fontSize: '1.25rem', // Use Tailwind's text-xl equivalent
                                        fontWeight: 'bold',
                                    }}
                                />
                                <EditTextarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CardModal;
