import styled from "styled-components";
import themes from "../shared/themes/themes";
type StyledDivProps = {
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
};
type StyledHeaderProps = {
     renderPraimaryBg: boolean;
};
export const StyledHeader = styled.header<StyledHeaderProps>`
     width: 100%;
     height: 94px;
     background-color: ${(props) => {
          if (props.renderPraimaryBg) return themes.primary;
          return themes.praimaryDark;
     }};
     display: flex;
     justify-content: space-between;
     align-items: center;
`;
export const StyledDiv = styled.div<StyledDivProps>`
     display: flex;
     justify-content: space-around;
     gap: ${(props) => props.gap || "0px"};
     margin-left: ${(props) => props.marginLeft || "0px"};
`;
export const StyledDecloration = styled.span`
     position: absolute;
     top: 150%;
     left: 0;
     width: 116px;
     height: 5.1px;
     background-color: white;
`;
