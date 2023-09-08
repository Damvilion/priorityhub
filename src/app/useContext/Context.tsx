import React, { createContext, useState } from 'react';

export const ModalContext = createContext(false);
export const UpdateModalContext = createContext<{
    openModal: () => void;
    closeModal: () => void;
}>({
    openModal: () => {},
    closeModal: () => {},
});

export function Context({ children }: { children: React.ReactNode }) {
    const [modalState, setModalState] = useState(false);

    function updateModal() {
        setModalState((prev) => !prev);
    }

    function closeModal() {
        setModalState(false);
    }
    function openModal() {
        setModalState(true);
    }
    return (
        <ModalContext.Provider value={modalState}>
            <UpdateModalContext.Provider value={{ openModal, closeModal }}>{children}</UpdateModalContext.Provider>
        </ModalContext.Provider>
    );
}
