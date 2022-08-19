import styled from "styled-components";
import themes from "../../shared/themes/themes";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
type StyleProps = {
     renderPraimaryBackground?: boolean;
     marginTop?: string;
     flexDeirection?: string;
     gap?: string;
     fontSize?: string;
     fontWeight?: string;
};
export const StyledFavoritePageContainer = styled.div<StyleProps>`
     width: 100vw;
     min-height: 100vh;
     display: flex;
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
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
`;
export const StyledContentContainer = styled.div`
     width: 1257px;
     margin: 80px auto auto 370px;
     @media ${cssBreakPoints.laptop} {
          width: calc(100vw - 50px - 50px);
          margin: 80px 50px auto 50px;
     }
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
`;
export const StyledSubtitle = styled.h5<StyleProps>`
     all: unset;
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "1.8rem"};
     font-weight: ${(props) => props.fontWeight};
     line-height: 1.5;
     color: ${themes.white};
     margin-top: ${(props) => props.marginTop};
`;
export const StyledInputContainer = styled.div`
     position: relative;
     width: fit-content;
`;
export const StyledSearchInput = styled.input`
     width: 324px;
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
`;
export const StyledFavoriteItem = styled.div`
     position: relative;
     width: 100%;
     min-height: 88px;
     display: flex;
     flex-direction: column;
`;
export const StyledHr = styled.hr`
     width: 100%;
     height: 1px;
     opacity: 0.6;
     background-color: ${themes.white};
     margin-top: 13.5px;
`;
