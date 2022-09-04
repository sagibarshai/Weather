import { ChangeEvent, KeyboardEvent } from "react";

export type InputProps = "inactive" | "focus" | "active" | "validation";
export interface Variant {
     variant?: InputProps;
}
export type Props = {
     variant?: InputProps;
     label?: string;
     placeHolder?: string;
     fontWeight?: string;
     color?: string;
     errorMessage?: string | null;
     display?: string;
     width?: string;
     laptopWidth?: string;
     mobileWidth?: string;
     height?: string;
     position?: string;
     padding?: string;
     marginTop?: string;
     children?: any;
     type?: string;
     onChange?: (e: ChangeEvent) => void;
     onBlur?: () => void;
     onFocus?: () => void;
     onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
     value?: string;
};
