import styled from "styled-components";
import themes from "../shared/themes/themes";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
type StyledHome = {
     renderPraimaryBackground: boolean;
};

export const StyledPageContainer = styled.div<StyledHome>`
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     width: 100vw;
     min-height: 100vh;
`;
