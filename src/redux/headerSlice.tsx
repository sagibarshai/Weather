import { createSlice } from "@reduxjs/toolkit";
import themes from "../shared/themes/themes";
const backgroundPraimary = themes.backgroundPraimary;
const darkBackground = themes.darkBackground;

const initialState = {
     renderBackground: backgroundPraimary,
     degreesMood: "celsius",
};
const headerSlice = createSlice({
     name: "header",
     initialState,
     reducers: {
          toggleBackground(state) {
               if (state.renderBackground === backgroundPraimary) {
                    state.renderBackground = darkBackground;
               } else state.renderBackground = backgroundPraimary;
          },
          toggleDegress() {},
     },
});
export default headerSlice.reducer;
export const { toggleBackground, toggleDegress } = headerSlice.actions;
