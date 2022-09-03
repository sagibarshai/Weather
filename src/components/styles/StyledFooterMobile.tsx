import styled from "styled-components";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
import { Link } from "react-router-dom";
import themes from "../../shared/themes/themes";
type StyledProps = {
     color?: string;
     backgroundColor?: string;
     borderColor?: string;
};
export const StyledFooterContainer = styled.footer<StyledProps>`
     display: none;
     @media ${cssBreakPoints.mobile} {
          display: flex;
     }
     position: fixed;
     bottom: 0;
     width: 100vw;
     height: 80px;
     margin: 217px 0 0;
     background-color: ${(props) => props.backgroundColor};
     border-radius: 20px 20px 0 0;
     align-items: center;
     z-index: 3;
`;
export const StyledButtonFooter = styled.button<StyledProps>`
     width: 33.333%;
     height: 46px;
     vertical-align: middle;
     border: none;
     &:not(:last-child) {
          border-right: ${(props) => `1px ${props.borderColor} solid`};
     }
     background-color: transparent;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     gap: 4px;
`;
export const StyledLink = styled(Link)`
     text-decoration: none;
`;
export const StyledText = styled.span<StyledProps>`
     color: ${(props) => props.color || themes.white};
     font-size: 1.4rem;
`;
