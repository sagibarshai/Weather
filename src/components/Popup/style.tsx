import styled from "styled-components";
import { Props } from "./types";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
import themes from "../../shared/themes/themes";
export const StyledPopupContainer = styled.div<Props>`
     width: ${(props) => props.width || "422px"};
     height: ${(props) => props.height || "228px"};
     padding: 32px 32px 48px 48px;
     box-shadow: 0 4px 80px 0 rgba(0, 0, 0, 0.16);
     background-color: ${themes.white};
     font-family: inherit;
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     border-radius: 30px;
     z-index: 6;
     @media ${cssBreakPoints.mobile} {
          width: calc(100vw - 80px);
          height: 270px;
          top: 100%;
          transform: translate(-50%, -90%);
     }
`;

export const StyledTitle = styled.h4`
     padding: 0;
     margin: 0;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.secondary};
`;

export const StyledXButton = styled.button`
     width: 24px;
     height: 24px;
     position: absolute;
     top: 32px;
     right: 24px;
     transform: translate(-50%, -50%);
     border: none;
     background-color: transparent;
     cursor: pointer;
`;

export const StyledParagraph = styled.p<Props>`
     font-size: 1.8rem;
     line-height: 1.5;
     color: ${themes.secondary};
     margin-top: ${(props) => props.marginTop || "16px"};
     width: 342px;
     height: 54px;
`;
export const StyledFlexDiv = styled.div<Props>`
     display: flex;
     justify-content: flex-end;
     gap: ${(props) => props.gap || "24px"};
     margin-top: 48px;
     align-items: center;
`;
