import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoardState {
    board: any;
}

const initialState: BoardState = {
    board: null,
};

export const board = createSlice({
    name: 'board',
    initialState,
    reducers: {
        getBoard: (state, action: PayloadAction<any>) => {
            state.board = action.payload;
            // await getDataByColumn();
        },
    },
});

// Action creators are generated for each case reducer function
export const { getBoard } = board.actions;

export default board.reducer;
