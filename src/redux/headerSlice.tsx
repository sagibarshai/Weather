import { createSlice } from "@reduxjs/toolkit";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     modeCelsius: boolean;
     openMobileMenu: boolean;
     openLogoutPopup: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     modeCelsius: false,
     openMobileMenu: false,
     openLogoutPopup: false,
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
          toggleLogoutPopup(state) {
               state.openLogoutPopup = !state.openLogoutPopup;
          },
     },
});
export default headerSlice.reducer;
export const {
     toggleBackground,
     toggleDegress,
     toggleMobileMenu,
     closeMobileMenu,
     toggleLogoutPopup,
} = headerSlice.actions;
