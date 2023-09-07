import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ModalContext, UpdateModalContext } from '@/app/useContext/Context';

const EditColumnModal = () => {
    const modalIsOpen = useContext(ModalContext);
    const updateModal = useContext(UpdateModalContext);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (modalIsOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [modalIsOpen]);

    return (
        <Transition show={isOpen} as={Fragment} enter='ease-out duration-300'>
            <Dialog as='div' onClose={updateModal} className='fixed inset-0 flex items-center justify-end z-50'>
                <Transition.Child
                    as={Fragment}
                    enter='transform transition ease-in-out duration-250 sm:duration-700'
                    enterFrom='translate-x-full'
                    enterTo='translate-x-0'
                    leave='transform transition ease-in-out duration-250 sm:duration-700'
                    leaveFrom='translate-x-0'
                    leaveTo='translate-x-full'>
                    <Dialog.Panel className='w-full max-w-sm p-4 bg-white text-black rounded relative z-50 h-screen'>
                        <form>
                            <label htmlFor=''>Name</label>
                            <input type='text' placeholder='CHANGE' />
                        </form>
                        <Dialog.Title>Deactivate account</Dialog.Title>
                        <Dialog.Description>This will permanently deactivate your account</Dialog.Description>

                        <p>
                            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be
                            undone.
                        </p>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default EditColumnModal;
