import styled from "styled-components";
type StyledDivProps = {
     gap?: string;
};
export const StyledHeader = styled.header`
     width: 100%;
     height: 94px;
     background-color: transparent;
     display: flex;
     justify-content: space-between;
`;
export const StyledDiv = styled.div<StyledDivProps>`
     display: flex;
     justify-content: space-between;
     gap: ${(props) => props.gap || "63px"};
`;
