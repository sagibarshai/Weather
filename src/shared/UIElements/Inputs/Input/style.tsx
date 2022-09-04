import styled, { css } from "styled-components";
import themes from "../../../themes/themes";
import { Variant, Props } from "./types";
import cssBreakPoints from "../../../cssBreakPoints/cssBreakPoints";
export const StyledInputsContainer = styled.div<Props>`
     position: relative;
     display: inline-block;
     border-radius: 10px;
     box-shadow: inset -6px 4px 4px 0 rgba(255, 255, 255, 0.1),
          inset 2px -3px 6px 0 rgba(0, 0, 0, 0.1);
     ${(props) =>
          props.variant === "validation" &&
          css`
               border: 1px solid ${themes.errorRed};
          `}
     margin-top: ${(props) => props.marginTop};
`;

export const StyledLabel = styled.label<Variant>`
     z-index: 1;
     position: absolute;
     top: 14px;
     left: 24px;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.fadeText};
     ${(props) =>
          props.variant === "validation"
               ? css`
                      color: ${themes.errorRed};
                 `
               : ``};
`;
export const StyledInput = styled.input<Props>`
     width: ${(props) => (props.width ? props.width : "354px")};
     height: ${(props) => props.height || "77px"};
     border-radius: 10px;
     border: none;
     padding: 4px 24px;
     line-height: 1.25;
     @media ${cssBreakPoints.laptop} {
          width: ${(props) => props.laptopWidth};
     }
     @media ${cssBreakPoints.mobile} {
          width: ${(props) =>
               props.mobileWidth ? props.mobileWidth : "354px"};
     }
     &:focus {
          outline: none;
          background-color: ${themes.white};
          color: ${themes.black};
          font-size: 1.8rem;
          line-height: 1.25;
          font-weight: ${(props) => props.fontWeight};
     }
     &::placeholder {
          font-weight: normal;
     }
     ${(props) =>
          props.variant === "inactive"
               ? css`
                      background-color: ${themes.grayBackground};
                      font-family: inherit;
                      color: ${themes.gray};
                      font-size: 1.8rem;
                 `
               : ""}
     ${(props) =>
          props.variant === "active"
               ? css`
                      background-color: ${themes.grayBackground};
                      color: #222;
                      font-size: 1.8rem;
                      &::placeholder {
                           font-size: 1.6rem;
                      }
                 `
               : ""}
          ${(props) =>
          props.variant === "validation"
               ? css`
                      position: relative;
                      background-color: ${themes.white};
                      color: ${themes.black};
                 `
               : ""};
`;

export const StyledInvalidInput = styled.span<Variant>`
     color: ${themes.errorRed};
     margin-top: 4px;
     font-family: inherit;
     font-size: 1.4rem;
     display: ${(props) =>
          props.variant === "validation"
               ? css`
                      display: flex;
                      align-self: flex-start;
                      position: absolute;
                      bottom: -20px;
                      left: 0;
                 `
               : css`
                      display: none;
                 `};
`;
