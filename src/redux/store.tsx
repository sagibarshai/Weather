import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";
const store = configureStore({
     reducer: { headerSlice },
});
export default store;
