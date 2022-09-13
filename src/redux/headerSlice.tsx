import { createSlice } from "@reduxjs/toolkit";
import { PopupType } from "../components/Popup/types";
import { DeggresType } from "../shared/utils/Functions/toggleDeggres";
export type HeaderSliceState = {
     renderPraimaryBackground: boolean;
     degressType: DeggresType;
     openMobileMenu: boolean;
     openPopup: boolean;
     openMap: boolean;
};

let initialState: HeaderSliceState = {
     renderPraimaryBackground: true,
     degressType: "C",
     openMobileMenu: false,
     openPopup: false,
     openMap: false,
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
          togglePopup(state, payload?: { payload: { popupType: PopupType } }) {
               if (payload?.payload?.popupType === "removeFromFavorites") {
                    state.openPopup = state.openPopup;
               } else state.openPopup = !state.openPopup;
          },
          toggleMap(state) {
               state.openMap = !state.openMap;
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
     toggleMap,
} = headerSlice.actions;
