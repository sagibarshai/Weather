import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";
import favoritesSlice from "./favoritesSlice";

const store = configureStore({
     reducer: { headerSlice, favoritesSlice },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
