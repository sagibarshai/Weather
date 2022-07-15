import styled from "styled-components";
type StyledDivProps = {
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
};
export const StyledHeader = styled.header`
     width: 100vw;
     height: 94px;
     background-color: transparent;
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
