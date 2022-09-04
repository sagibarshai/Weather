import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";
import authSlice from "./authSlice";

const store = configureStore({
     reducer: { headerSlice, authSlice },
});
export type StoreState = ReturnType<typeof store.getState>;

export default store;
