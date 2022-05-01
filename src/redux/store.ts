import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import todoReducer from "./todo-reducer";


const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
