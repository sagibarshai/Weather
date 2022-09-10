import { createSlice } from "@reduxjs/toolkit";
type State = {
     isLogin: boolean | null | string;
     token: string | null;
};

let initialState: State = {
     isLogin: localStorage.getItem("token"),
     token: localStorage.getItem("token"),
};
const authSlice = createSlice({
     name: "favoriteSlice",
     initialState,
     reducers: {
          login(state, payload) {
               localStorage.setItem("token", payload.payload);
               state.isLogin = true;
               state.token = payload.payload;
          },
          logout(state) {
               localStorage.removeItem("token");
               state.isLogin = false;
               state.token = null;
          },
     },
});
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
