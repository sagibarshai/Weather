import styled, { css } from "styled-components";
import { StyleProps } from "./types";
import themes from "../../../themes/themes";
import cssBreakPoints from "../../../cssBreakPoints/cssBreakPoints";

export const StyledLabel = styled.label<StyleProps>`
     width: 73px;
     height: 38px;
     border-radius: 100px;
     display: inline-block;
     cursor: pointer;
     border: 1px solid #444e72;
     ${(props) =>
          props.rotate === "true" &&
          css`
               transform: rotate(-180deg);
          `}
`;
export const StyledDivToggle = styled.div<StyleProps>`
     position: relative;
     width: 73px;
     height: 38px;
     border-radius: 100px;
     background-color: ${themes.white};
     &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 34px;
          width: 38px;
          background-color: ${themes.fadeText};
          border-radius: 100px;
     }
`;
export const StyledInput = styled.input<StyleProps>`
     display: none;
     &:checked + ${StyledDivToggle}::after {
          transform: translate(35px, -50%);
     }
`;
export const StyledIconState = styled.div<StyleProps>`
     display: inline-block;
     height: auto;
     font-size: 2.2rem;
     vertical-align: middle;
     position: absolute;
     top: ${(props) => props.top || "50%"};
     ${(props) =>
          props.rotate === "true"
               ? css`
                      transform: translate(-50%, -50%) rotate(-180deg);
                 `
               : css`
                      transform: translate(-50%, -50%);
                 `}
`;
