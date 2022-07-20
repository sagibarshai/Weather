import { createSlice } from "@reduxjs/toolkit";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     degreesMood: string;
     openMobileMenu: boolean;
     openLogoutPopup: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     degreesMood: "C",
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
               if (state.degreesMood === "C") state.degreesMood = "F";
               else state.degreesMood = "C";
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
