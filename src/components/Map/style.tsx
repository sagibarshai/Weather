import styled from "styled-components";
import themes from "../../shared/themes/themes";
export const StyledContainer = styled.div`
     overflow: hidden;
     min-width: 130px;
     min-height: 60px;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 5px;
`;
export const StyledText = styled.span`
     color: ${themes.black};
     font-weight: bold;
     font-size: 1.8rem;
`;
