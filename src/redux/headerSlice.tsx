import { createSlice } from "@reduxjs/toolkit";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     modeCelsius: boolean;
     openMobileMenu: boolean;
     openPopup: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     modeCelsius: false,
     openMobileMenu: false,
     openPopup: false,
};
const headerSlice = createSlice({
     name: "headerSlice",
     initialState,
     reducers: {
          toggleBackground(state) {
               state.renderPraimaryBackground = !state.renderPraimaryBackground;
          },
          toggleDegress(state) {
               if (state.modeCelsius === true) state.modeCelsius = false;
               else state.modeCelsius = true;
          },
          toggleMobileMenu(state) {
               state.openMobileMenu = !state.openMobileMenu;
          },
          closeMobileMenu(state) {
               state.openMobileMenu = false;
          },
          togglePopup(state) {
               state.openPopup = !state.openPopup;
          },
     },
});
export default headerSlice.reducer;
export const {
     toggleBackground,
     toggleDegress,
     toggleMobileMenu,
     closeMobileMenu,
     togglePopup,
} = headerSlice.actions;
