import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface sheetState {
    sheet: boolean;
}

const initialState: sheetState = {
    sheet: false,
};

export const sheet = createSlice({
    name: 'sheet',
    initialState,
    reducers: {
        setSheetState: (state, action: PayloadAction<any>) => {
            state.sheet = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSheetState } = sheet.actions;

export default sheet.reducer;
