import styled, { css } from "styled-components";
import cssBreakPoints from "../../../shared/cssBreakPoints/cssBreakPoints";
import themes from "../../../shared/themes/themes";

type Props = {
     display?: boolean;
};
export const StyledMobileMenuContainer = styled.div<Props>`
     display: none;
     z-index: 5;
     position: relative;
     @media ${cssBreakPoints.mobile} {
          ${(props) =>
               props.display === false
                    ? "display:none"
                    : "display:inline-block"}
     }
`;

export const StyledMenuButton = styled.button`
     display: none;
     @media ${cssBreakPoints.mobile} {
          display: inline-block;
     }
     position: fixed;
     top: 59px;
     right: 30px;
     transform: translate(-50%, -50%);
     background-color: transparent;
     border: none;
     cursor: pointer;
     z-index: 2;
`;
export const StyledMenu = styled.div<Props>`
     backdrop-filter: blur(0rem);
     display: none;
     width: calc(100vw - 30px);
     height: 415px;
     z-index: 3;
     position: relative;
     ${(props) =>
          props.display
               ? css`
                      display: flex;
                      flex-direction: column;
                      gap: 36px;
                 `
               : `display:none`};
     background-color: white;
     padding: 40px 0 0 30px;
     box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.16);
     margin: 0;
     position: fixed;
     bottom: -5px;
     border-radius: 20px 20px 0 0;
     @media ${cssBreakPoints.laptop} {
          display: none;
     }
     @media ${cssBreakPoints.bigDesktop} {
          display: none;
     }
`;
export const StyledTitle = styled.h2`
     padding: 0;
     margin: 0;
     font-family: inherit;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: #444e72;
`;
export const StyledRowFlexContainer = styled.div`
     display: flex;
     flex-direction: column;
     gap: 36px;
     padding-right: 30px;
`;
export const StyledColumnContainer = styled.div`
     justify-content: space-between;
     display: flex;
     gap: 36px;
`;
export const StyledSubtitle = styled.h4`
     padding: 0;
     margin: 0;
     font-family: inherit;
     font-size: 1.8rem;
     line-height: 1.5;
     color: ${themes.secondary};
`;
