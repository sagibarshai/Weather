export type Variant = "error" | "success";
export type Props = {
     variant: Variant;
     width?: string;
     height?: string;
     backgroundColor?: string;
     message?: string;
     mobileWidth?: string;
     icon?: JSX.Element;
     transform?: string;
     position?: string;
     bottom?: string;
     left?: string;
     fontSize?: string;
     fontWeight?: string;
     color?: string;
     gap?: string;
     mobileHeigt?: string;
     mobileBottom?: string;
     animation?: boolean;
     mobileTransform?: string;
     positionFixiedBottom?: boolean;
     animationTime?: number;
     onClick?: (x: any) => any;
};
