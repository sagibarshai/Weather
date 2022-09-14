import { ReactEventHandler } from "react";
export type StyleProps = {
     top?: string;
     rotate?: string;
};

export type Props = {
     checked?: boolean;
     variant: "checkbox";
     LeftIcon: string | JSX.Element;
     rightIcon: string | JSX.Element;
     id: string;
     htmlFor?: string;
     onClick?: ReactEventHandler;
     top?: string;
     rotate?: string;
};
