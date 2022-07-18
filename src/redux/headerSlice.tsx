import { createSlice } from "@reduxjs/toolkit";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     degreesMood: string;
     openMobileMenu: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     degreesMood: "C",
     openMobileMenu: false,
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
          toggleMobileMenu(state) {
               state.openMobileMenu = !state.openMobileMenu;
          },
          closeMobileMenu(state) {
               state.openMobileMenu = false;
          },
     },
});
export default headerSlice.reducer;
export const {
     toggleBackground,
     toggleDegress,
     toggleMobileMenu,
     closeMobileMenu,
} = headerSlice.actions;
