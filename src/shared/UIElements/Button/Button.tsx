import styled, { css } from "styled-components";
import colors, { Colors } from "../../colors/colors";
import themes from "../../themes/themes";
type StyledButtonVariant =
     | "default"
     | "disabled"
     | "white"
     | "ghost"
     | "linkWithImg";

interface StyledButtonProps {
     variant?: StyledButtonVariant;
     colors?: Colors;
     textUnderline?: string;
     position?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
     font-family: inherit;
     width: 354px;
     height: 54px;
     padding: 16px 146px;
     border-radius: 10px;
     box-shadow: -4px 8px 50px 4px rgba(0, 0, 0, 0.16),
          inset -6px 4px 4px 0 rgba(255, 255, 255, 0.1),
          inset 2px -3px 6px 0 rgba(0, 0, 0, 0.1);
     background-image: ${themes.backgroundPraimary};
     border: none;
     color: white;
     font-size: 18px;
     cursor: pointer;
     ${(props) =>
          props.variant === "disabled"
               ? css`
                      color: rgba(255, 255, 255, 0.4);
                 `
               : ""};
     ${(props) =>
          props.variant === "white"
               ? css`
                      width: 213px;
                      height: 54px;
                      padding: 16px 24px;
                      box-shadow: inset -6px 4px 4px 0 rgba(255, 255, 255, 0.1),
                           inset 2px -3px 6px 0 rgba(0, 0, 0, 0.1);
                      background-color: white;
                      background: none;
                      color: #444e72;
                 `
               : ""}
     ${(props) =>
          props.variant === "ghost"
               ? css`
                      width: 183px;
                      height: 54px;
                      padding: 16px 24px;
                      border-radius: 10px;
                      border: solid 1px #fff;
                      background: none;
                 `
               : ""}
  ${(props) =>
          props.variant === "linkWithImg"
               ? css`
                      width: 152px;
                      height: 22px;
                      font-weight: 500;
                      line-height: 1.2;
                      color: ${props.color || "#222"};
                      background: transparent;
                      box-shadow: none;
                      padding: 0;
                      width: max-content;
                      height: max-content;
                      text-decoration: ${props.textUnderline ||
                      "underline solid 2px"};
                 `
               : ""}
`;
