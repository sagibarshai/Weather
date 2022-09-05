import styled, { css } from "styled-components";
import cssBreakPoints from "../../cssBreakPoints/cssBreakPoints";
import themes from "../../themes/themes";
import { StyledButtonProps } from "./types";

export const StyledButton = styled.button<StyledButtonProps>`
     position: relative;
     z-index: 4;
     font-family: inherit;
     width: 402px;
     height: 54px;
     border-radius: 10px;
     box-shadow: -4px 8px 50px 4px rgba(0, 0, 0, 0.16),
          inset -6px 4px 4px 0 rgba(255, 255, 255, 0.1),
          inset 2px -3px 6px 0 rgba(0, 0, 0, 0.1);
     background-image: ${themes.backgroundPraimary};
     border: none;
     color: white;
     font-size: 1.8rem;
     display: ${(props) => props.display};
     align-items: ${(props) => props.alignItem};
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
                      background: none;
                      background-color: white;
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
               : ""};
     margin: ${(props) => props.margin};
     margin-right: ${(props) => props.marginRight};
     position: ${(props) => props.position};
     width: ${(props) => props.width};
     height: ${(props) => props.height};
     font-weight: ${(props) => props.fontWeight};
     color: ${(props) => props.color};
     border: ${(props) => props.border};
     box-shadow: ${(props) => props.boxShadow};
     bottom: ${(props) => props.bottom};
     left: ${(props) => props.left};
     transform: ${(props) => props.transform};
     padding: ${(props) => props.padding};
     flex-basis: ${(props) => props.flexBasis};
     align-self: ${(props) => props.alignSelf};
     @media ${cssBreakPoints.bigDesktop} {
          ${(props) => props.displayOnlyOnMobile === true && "display:none"}
     }
     @media ${cssBreakPoints.laptop} {
          ${(props) => props.displayOnlyOnMobile === true && "display:none"}
     }
     @media ${cssBreakPoints.mobile} {
          ${(props) =>
               props.mobileWidthWithCalc &&
               css`
                    width: calc(${props.mobileWidthWithCalc} + 48px);
               `}
          width:${(props) => props.mobileWidth};
     }
`;
