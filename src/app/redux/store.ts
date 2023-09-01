import { configureStore } from '@reduxjs/toolkit';
import currentUser from './user';
import board from './boardState';
import sheet from './SheetState';

export const store = configureStore({
    reducer: {
        user: currentUser,
        board: board,
        sheet: sheet,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
