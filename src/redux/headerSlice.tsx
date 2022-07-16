import { createSlice } from "@reduxjs/toolkit";
import themes from "../shared/themes/themes";
const backgroundPraimary = themes.backgroundPraimary;
const darkBackground = themes.darkBackground;
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     degreesMood: string;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     degreesMood: "C",
};
const headerSlice = createSlice({
     name: "headerSlice",
     initialState,
     reducers: {
          toggleBackground(state) {
               state.renderPraimaryBackground = !state.renderPraimaryBackground;
          },
          toggleDegress(state) {
               if (state.degreesMood === "C") state.degreesMood = "F";
               else state.degreesMood = "C";
          },
     },
});
export default headerSlice.reducer;
export const { toggleBackground, toggleDegress } = headerSlice.actions;
