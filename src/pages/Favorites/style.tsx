import styled, { css } from "styled-components";
import themes from "../../shared/themes/themes";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
type StyleProps = {
     openMobileMenu?: boolean;
     openPopup?: boolean;
     renderPraimaryBackground?: boolean;
     marginTop?: string;
     flexDeirection?: string;
     gap?: string;
     fontSize?: string;
     fontWeight?: string;
     position?: string;
     top?: string;
     left?: string;
     transform?: string;
     width?: string;
     fontSizeMobile?: string;
     mobileWidth?: string;
};
export const StyledFavoritePageContainer = styled.div<StyleProps>`
     width: 100vw;
     min-height: 100vh;
     display: flex;
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     ${(props) => {
          if (props.openMobileMenu || props.openPopup) {
               return css`
                    filter: blur(10px);
               `;
          }
     }};
     padding-bottom: 100px;
`;
export const StyledCenteredDiv = styled.div<StyleProps>`
     display: flex;
     height: fit-content;
     margin: 0 auto;
     margin-top: ${(props) => props.marginTop};
     flex-direction: ${(props) => props.flexDeirection};
     gap: ${(props) => props.gap};
     justify-content: center;
     align-items: center;
     position: ${(props) => props.position};
     top: ${(props) => props.top};
     left: ${(props) => props.left};
     transform: ${(props) => props.transform};
     width: ${(props) => props.width};
     text-align: center;
`;
export const StyledContentContainer = styled.div`
     width: 1257px;
     margin: 80px auto auto 370px;
     @media ${cssBreakPoints.laptop} {
          width: calc(100vw - 50px - 50px);
          margin: 80px 50px auto 50px;
     }
     @media ${cssBreakPoints.mobile} {
          width: 90vw;
          margin: 40px auto 0 auto;
     } ;
`;
export const StyledPageTitle = styled.h2<StyleProps>`
     all: unset;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "5rem"};
     font-weight: 900;
     line-height: 1.2;
     color: ${themes.white};
     margin-top: ${(props) => props.marginTop};
     @media ${cssBreakPoints.mobile} {
          font-size: ${(props) => props.fontSizeMobile || "3.2rem"};
     } ;
`;
export const StyledSubtitle = styled.h5<StyleProps>`
     all: unset;
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "1.8rem"};
     font-weight: ${(props) => props.fontWeight};
     line-height: 1.5;
     color: ${themes.white};
     margin-top: ${(props) => props.marginTop};
     @media ${cssBreakPoints.mobile} {
          font-size: ${(props) => props.fontSizeMobile || "2.4rem"};
          width: ${(props) => props.mobileWidth};
     } ;
`;
export const StyledInputContainer = styled.div`
     position: relative;
     width: fit-content;
`;
export const StyledSearchInput = styled.input`
     max-width: 324px;
     height: 30px;
     display: flex;
     align-items: center;
     padding: 12px 24px;
     border-radius: 15px;
     background-color: rgba(255, 255, 255, 0.3);
     border: none;
     margin-top: 24px;
     color: ${themes.white};
     font-family: inherit;
     font-size: 2.4rem;
     font-weight: 500;
     line-height: 1.25;
     &::placeholder {
          font-family: inherit;
          font-size: 1.8rem;
          font-weight: bold;
          line-height: 1.2;
          color: ${themes.white};
     }
     &:focus-visible {
          outline: 0;
     }
`;
export const StyledItemsContainer = styled.div`
     display: flex;
     flex-direction: column;
     gap: 23.5px;
     margin-top: 65px;
     @media ${cssBreakPoints.mobile} {
          margin-top: 36px;
     }
`;
export const StyledFavoriteItem = styled.div`
     position: relative;
     width: 100%;
     min-height: 88px;
     display: flex;
     flex-direction: column;
     cursor: pointer;
`;
export const StyledHr = styled.hr`
     width: 100%;
     height: 1px;
     opacity: 0.6;
     background-color: ${themes.white};
     margin-top: 13.5px;
`;
export const StyledRemoveFromFavButton = styled.button`
     all: unset;
     cursor: pointer;
     z-index: 3;
`;
