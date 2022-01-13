import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Interface/Todo.interface";

const initialState = {
  user: [] as User[],
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.user.push(payload);
      return state;
    },
  },
});

export const authActions = authslice.actions;

export default authslice.reducer;
