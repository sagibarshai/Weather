import styled from "styled-components";
import { StyledProps } from "./types";
import cssBreakPoints from "../../../cssBreakPoints/cssBreakPoints";
export const StyledImgIcon = styled.img<StyledProps>`
     width: ${(props) => props.width};
     height: ${(props) => props.height};
     margin: ${(props) => props.margin};
     object-fit: contain;
     @media ${cssBreakPoints.mobile} {
          margin: 0 0 0 0;
          order: ${(props) => props.flexOrderMobile};
     }
`;
