import styled, { css } from "styled-components";
import { Props } from "./types";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
export const StyledCloud = styled.i<Props>`
     transform: translate(-50%, -50%);
     background-image: url("/images/cloud-s.png");
     background-repeat: no-repeat;
     position: fixed;
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     left: ${(props) => props.left};
     z-index: 0;
     transition: all;
     object-fit: cover;
     @media ${cssBreakPoints.mobile} {
          ${(props) => props.displayOnMobile === false && `display:none`}
     }
     ${(props) =>
          props.left && props.endLeft
               ? css`
                      @keyframes leftToRight {
                           50% {
                                transform: translate(-100%, -50%);
                                left: ${props.endLeft};
                           }
                           100% {
                                transform: translate(0, -50%);
                                left: ${props.left};
                           }
                      }
                      animation: leftToRight ${props.time} infinite;
                 `
               : css`
                      @keyframes rightToLeft {
                           50% {
                                transform: translate(-100%, -50%);
                                right: ${props.endRight};
                           }
                           100% {
                                transform: translate(0, -50%);
                                right: ${props.right};
                           }
                      }
                      animation: rightToLeft ${props.time} infinite;
                 `};
     width: 130px;
     height: 130px;
     ${(props) =>
          props.size === "m" &&
          css`
               width: 200px;
               height: 200px;
               background-image: url("/images/cloud-m.png");
          `};
     ${(props) =>
          props.size === "l" &&
          css`
               width: 270px;
               height: 270px;
               background-image: url("/images/cloud-l.png");
          `}
`;
export const StyledCloudBig = styled.div`
     width: 150px;
     height: 100px;
     position: absolute;
     background-image: url("/images/cloud-l.png");
     background-size: 100% 100%;
     top: 0%;
     left: 20%;
     object-fit: cover;
`;
