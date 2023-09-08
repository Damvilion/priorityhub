import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const CardModal = ({ title, Snapshot, body }: any) => {
    const [openCard, setOpenCard] = useState(false);

    const openModal = () => {
        setOpenCard(true);
    };
    const closeModal = () => {
        setOpenCard(false);
    };

    const [titleText, setTitleText] = useState(title);
    const [bodyText, setBodyText] = useState(body);
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
                            <div className='flex justify-center flex-col'>
                                <EditText
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    style={{
                                        textAlign: 'center',
                                        padding: '1.25rem',
                                        fontSize: '1.25rem',
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
