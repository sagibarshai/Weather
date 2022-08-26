import { createSlice } from "@reduxjs/toolkit";
import { DeggresType } from "../shared/utils/toggleDeggres";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     degressType: DeggresType;
     openMobileMenu: boolean;
     openPopup: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     degressType: "C",
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
               if (state.degressType === "C") state.degressType = "F";
               else state.degressType = "C";
               localStorage.setItem("degressType", state.degressType);
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
