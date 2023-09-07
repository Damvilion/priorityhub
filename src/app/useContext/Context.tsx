import React, { createContext, useState } from 'react';

export const ModalContext = createContext(false);
export const UpdateModalContext = createContext<() => void>(() => {});

export function Context({ children }: { children: React.ReactNode }) {
    const [modalState, setModalState] = useState(false);

    function updateModal() {
        setModalState((prev) => !prev);
    }

    return (
        <ModalContext.Provider value={modalState}>
            <UpdateModalContext.Provider value={updateModal}>{children}</UpdateModalContext.Provider>
        </ModalContext.Provider>
    );
}
