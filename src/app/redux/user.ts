import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userState {
    currentUser: User | null | undefined;
}

export interface User {
    displayName: string;
    email: string;
    uid: string;
    photoURL?: string;
}

const initialState: userState = {
    currentUser: null,
};

export const currentUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = currentUser.actions;

export default currentUser.reducer;
