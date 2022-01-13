import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "../Interface/Todo.interface";

interface AuhState {
  user: CurrentUser | null; 
}
const initialState: AuhState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: CurrentUser }) => {
      state.user = payload;
      return state;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
