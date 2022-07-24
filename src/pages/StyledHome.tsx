import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
type StyledHome = {
     renderPraimaryBackground: boolean;
     openMobileMenu: boolean;
     openLogoutPopup?: boolean;
};

export const StyledPageContainer = styled.div<StyledHome>`
     display: inline-block;
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     width: 100vw;
     margin: 0;
     overflow-x: hidden;
     min-height: 100vh;
     ${(props) => {
          if (props.openMobileMenu || props.openLogoutPopup) {
               return css`
                    filter: blur(10px);
               `;
          }
     }};
`;
export const StyledLocationDiv = styled.div`
     display: flex;
     flex-direction: column;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     align-items: center;
     justify-content: center;
     width: 296px;
     height: 266px;
     text-align: center;
`;
export const StyledLocationTitle = styled.h3`
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     margin: 0;
     padding: 0;
     color: ${themes.white};
     margin-top: -45px;
`;
export const StyledLocationParagraph = styled.p`
     font-family: inherit;
     font-size: 18px;
     line-height: 1.5;
     color: ${themes.white};
`;
