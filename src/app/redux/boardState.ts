import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoardState {
    board: DocumentEntry[];
}

const initialState: BoardState = {
    board: [],
};

export const board = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<any>) => {
            state.board = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setBoard } = board.actions;

export default board.reducer;
