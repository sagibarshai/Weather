import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";

const store = configureStore({
     reducer: { headerSlice },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
