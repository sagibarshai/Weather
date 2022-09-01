import styled from "styled-components";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
import { Link } from "react-router-dom";
import themes from "../../shared/themes/themes";
type StyledProps = {
     color?: string;
};
export const StyledFooterContainer = styled.footer`
     display: none;
     @media ${cssBreakPoints.mobile} {
          display: flex;
     }
     position: fixed;
     bottom: 0;
     width: 100vw;
     height: 80px;
     margin: 217px 0 0;
     background-color: rgba(255, 255, 255, 0.3);
     border-radius: 20px 20px 0 0;
     align-items: center;
`;
export const StyledButtonFooter = styled.button`
     width: 33.333%;
     height: 46px;
     vertical-align: middle;
     border: none;
     &:not(:last-child) {
          border-right: 1px white solid;
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
