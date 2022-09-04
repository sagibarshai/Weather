import styled, { css } from "styled-components";
import themes from "../../../shared/themes/themes";
import cssBreakPoints from "../../../shared/cssBreakPoints/cssBreakPoints";
type StyledDivProps = {
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
     marginLeftlaptop?: string;
     marginRightLaptop?: string;
     gapLaptop?: string | number;
     orderLaptop?: string | number;
     onHover?: boolean;
};
type StyledHeaderProps = {
     renderPraimaryBg: boolean;
     filterBlur?: boolean;
};
export const StyledHeader = styled.header<StyledHeaderProps>`
     width: 100vw;
     height: 94px;
     background-color: ${(props) => {
          if (props.renderPraimaryBg) return themes.primary;
          return themes.praimaryDark;
     }};
     justify-content: space-between;
     align-items: center;
     display: flex;
     filter: ${(props) => (props.filterBlur === true ? `blur(10px)` : "")};
     @media ${cssBreakPoints.mobile} {
          display: none;
     }
`;
export const StyledDiv = styled.div<StyledDivProps>`
     display: none;
     justify-content: space-around;
     gap: ${(props) => props.gap || "0px"};
     margin-left: ${(props) => props.marginLeft || "0px"};
     @media ${cssBreakPoints.bigDesktop} {
          display: flex;
          margin-right: ${(props) => props.marginRight};
     }
     @media ${cssBreakPoints.laptop} {
          display: flex;
          margin-left: ${(props) => props.marginLeftlaptop || "0px"};
          gap: ${(props) => props.gapLaptop || "0px"};
          order: ${(props) => props.orderLaptop};
          margin-right: ${(props) => props.marginRightLaptop};
          ${(props) =>
               props.onHover
                    ? css`
                           &:hover ${StyledTooltip} {
                                display: flex;
                           }
                      `
                    : ``}
     }
`;
export const StyledDecloration = styled.span`
     position: absolute;
     top: 150%;
     left: 0;
     width: 116px;
     height: 5.1px;
     background-color: white;
`;
export const StyledSpan = styled.span`
     @media ${cssBreakPoints.bigDesktop} {
          display: inline-block;
     }
     @media ${cssBreakPoints.laptop} {
          display: none;
     }
`;
export const StyledTooltip = styled.div`
     display: none;
     @media ${cssBreakPoints.laptop} {
          width: 143px;
          height: 57px;
          clip-path: polygon(
               51% 11%,
               61% 35%,
               100% 35%,
               100% 57%,
               100% 100%,
               49% 100%,
               0 100%,
               0 58%,
               0 35%,
               39% 35%
          );
          background-color: white;
          margin: 0 auto;
          position: absolute;
          padding: 0;
          margin: 0;
          top: 68px;
          left: 50%;
          transform: translate(-50%, -50%);
          justify-content: center;
     }
`;
export const StyledTooltipText = styled.span`
     color: #444e72;
     font-family: inherit;
     font-size: 1.8rem;
     font-weight: bold;
     margin-top: 30px;
`;
export const StyledWrapperButton = styled.button`
     all: unset;
     cursor: pointer;
`;
