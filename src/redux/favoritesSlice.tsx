import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../components/SearchBox";
export type favoriteObjType = {
     Key?: number | string | null;
     LocalizedName?: string | null;
     Country?: string | null;
};

export type FavoriteObj = {
     favoriteData?: favoriteObjType[];
};
let initialState: FavoriteObj = { favoriteData: [] };
const favoritesSlice = createSlice({
     name: "favoriteSlice",
     initialState,
     reducers: {
          addToFavorites: (state: Result) => {
               if (
                    state.Key &&
                    state.Country?.LocalizedName &&
                    state.LocalizedName
               ) {
                    initialState?.favoriteData?.push({
                         Key: state.Key,
                         LocalizedName: state.LocalizedName,
                         Country: state.Country.LocalizedName,
                    });
               }
          },
     },
});
export default favoritesSlice.reducer;
export const { addToFavorites } = favoritesSlice.actions;
