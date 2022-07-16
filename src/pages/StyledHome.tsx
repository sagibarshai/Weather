import styled from "styled-components";
import themes from "../shared/themes/themes";
type StyledHome = {
     renderPraimaryBackground: boolean;
};

export const StyledPageContainer = styled.div<StyledHome>`
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     min-height: 100vh;
     width: 1920px;
`;
