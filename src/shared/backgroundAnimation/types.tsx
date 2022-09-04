export type Size = "l" | "m" | "s";
export type Props = {
     top?: string | number;
     left?: string | number;
     right?: string | number;
     endLeft?: string | number;
     endRight?: string | number;
     time?: string | number;
     displayOnMobile?: boolean;
     size: Size;
};
