import { Colors } from "../../colors/types";
export type StyledButtonVariant =
     | "default"
     | "disabled"
     | "white"
     | "ghost"
     | "linkWithImg";

export interface StyledButtonProps {
     variant?: StyledButtonVariant;
     colors?: Colors;
     textUnderline?: string;
     position?: string;
     margin?: string;
     display?: string;
     gap?: string | number;
     marginRight?: string;
     width?: string;
     height?: string;
     mobileWidth?: string;
     mobileWidthWithCalc?: string;
     fontWeight?: string;
     color?: string;
     displayOnlyOnMobile?: boolean;
     border?: string;
     alignItem?: string;
     boxShadow?: string;
     bottom?: string;
     transform?: string;
     left?: string;
     padding?: string;
     flexBasis?: string;
     alignSelf?: string;
}
