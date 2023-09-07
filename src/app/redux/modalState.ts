import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
    modalIsOpen: boolean;
}

const initialState: ModalState = {
    modalIsOpen: false,
};

export const modalState = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<any>) => {
            state.modalIsOpen = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setModalState } = modalState.actions;

export default modalState.reducer;
