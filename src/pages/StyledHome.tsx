import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
type StyledHome = {
     renderPraimaryBackground: boolean;
     openMobileMenu: boolean;
};

export const StyledPageContainer = styled.div<StyledHome>`
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     width: 100vw;
     min-height: 100vh;
     ${(props) => {
          if (props.openMobileMenu) {
               return css`
                    filter: blur(10px);
               `;
          }
     }};
`;
