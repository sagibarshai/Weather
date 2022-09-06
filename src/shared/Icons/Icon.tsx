import styled from "styled-components";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
import { StyledIconProps } from "./types";
export const StyledIcon = styled.i<StyledIconProps>`
     width: ${(props) => props.width || "auto"};
     height: ${(props) => props.height || "auto"};
     margin: ${(props) => props.margin || 0};
     position: ${(props) => props.position};
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     left: ${(props) => props.left};
     transform: ${(props) => props.transform};
     z-index: ${(props) => props.zIndex};
     margin-right: ${(props) => props.marginRight};
     vertical-align: middle;
     @media ${cssBreakPoints.bigDesktop} {
          ${(props) => props.displayOnlyOnMobile === true && "display:none"}
     }
     @media ${cssBreakPoints.laptop} {
          ${(props) => props.displayOnlyOnMobile === true && "display:none"}
     }
     @media ${cssBreakPoints.mobile} {
          display: ${(props) => props.displayMobile === false && "none"};
          width: ${(props) => props.mobileWidth};
          height: ${(props) => props.mobileHeight};
          left: ${(props) => props.mobileLeft};
          transform: ${(props) => props.transformMobile};
     }
`;
