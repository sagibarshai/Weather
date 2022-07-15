import styled from "styled-components";
import themes from "../shared/themes/themes";
type StyledHome = {
     background: string;
};

export const StyledPageContainer = styled.div<StyledHome>`
     background-image: ${(props) => props.background};
     min-height: 100vh;
     width: 1920px;
`;
