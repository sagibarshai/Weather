export type PopupType = "removeFromFavorites" | "logout";
export type Props = {
     cancelFunction?: () => any;
     callback?: () => any;
     title?: string;
     message?: string;
     cancelMessage?: string;
     continueButtonText?: string;
     width?: string;
     height?: string;
     marginTop?: string;
     gap?: string;
     popupType?: PopupType;
};
