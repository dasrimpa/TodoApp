import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

export default slice.reducer;

export const isAuthSelector = (state: { auth: { user: null; }; }) => state.auth.user !== null;

export function userlogin(username: any, password: any) {
  return async function(dispatch: (arg0: { payload: any; type: string; }) => void) {
  }
}
