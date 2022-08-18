import { createSlice } from "@reduxjs/toolkit";
type State = {
     isLogin: boolean | null | string;
};
type Payload = {
     token?: string;
};
let initialState: State = {
     isLogin: localStorage.getItem("token"),
};
const authSlice = createSlice({
     name: "favoriteSlice",
     initialState,
     reducers: {
          login(state, payload) {
               localStorage.setItem("token", payload.payload);
               state.isLogin = true;
          },
          logout(state) {
               localStorage.removeItem("token");
               state.isLogin = false;
          },
     },
});
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
