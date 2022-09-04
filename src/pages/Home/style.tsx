import styled, { css } from "styled-components";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
import themes from "../../shared/themes/themes";
type StyledHome = {
     renderPraimaryBackground: boolean;
     openMobileMenu: boolean;
     openPopup?: boolean;
};

export const StyledPageContainer = styled.div<StyledHome>`
     display: inline-block;
     min-width: 100vw;
     margin: 0;
     overflow-x: hidden;
     min-height: 100vh;
     ${(props) => {
          if (props.openMobileMenu || props.openPopup) {
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
     @media ${cssBreakPoints.mobile} {
          height: auto;
          top: 112px;
          transform: translate(-50%, 0);
     }
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
     @media ${cssBreakPoints.mobile} {
          margin-top: 67px;
     }
`;
export const StyledLocationParagraph = styled.p`
     font-family: inherit;
     font-size: 18px;
     line-height: 1.5;
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          margin-top: 16px;
     }
`;
export const StyledNotFoundCityDiv = styled.div`
     width: 416px;
     height: 210px;
     position: absolute;
     z-index: 3;
     top: 292px;
     left: 50%;
     transform: translate(-50%, 0);
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     gap: 36px;
`;
export const StyledTextNotFoundCity = styled.p`
     width: 416px;
     font-family: inherit;
     font-size: 1.8rem;
     line-height: 1.5;
     text-align: center;
     color: ${themes.white};
     margin: 0 auto;
`;
