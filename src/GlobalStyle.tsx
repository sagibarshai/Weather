import styled, { createGlobalStyle } from "styled-components";
import themes from "./shared/themes/themes";
type Props = {
     renderPraimaryBackground: boolean;
};
const GlobalStyle = createGlobalStyle`

html, body {
    font-size: 62.5%;
    margin: 0 ;
    padding:0 ;
    font-family: 'Overpass', sans-serif;
    width: 100vw;
    min-height: 100vh;
    }    
`;
export const StyleAppContainer = styled.div<Props>`
     background-image: ${(props) => {
          if (props.renderPraimaryBackground) return themes.backgroundPraimary;
          else return themes.darkBackground;
     }};
     min-height: 100vh;
`;
export default GlobalStyle;
