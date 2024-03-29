import styled, { css } from "styled-components";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
import themes from "../themes/themes";
import { Props } from "./types";
export const StyledNotificationContainer = styled.div<Props>`
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 10px;
     position: relative;
     text-align: center;
     ${(props) =>
          props.variant === "success" &&
          css`
               width: 493px;
               height: 86px;
               background-color: rgba(0, 0, 0, 0.8);
               position: fixed;
               bottom: 54px;
               left: 50%;
               transform: translate(-50%, 0%);
               gap: 5px;
          `};
     z-index: 10;
     ${(props) =>
          props.variant === "error" &&
          css`
               width:360px
               height:36px;
               padding: 24px;
               border-radius: 10px;
               background-color:${themes.notificationError};
               display: flex;
               gap: 16px;
               align-items: center;
               justify-content: center;
               font-size:1.4rem;
          `};
     width: ${(props) => props.width};
     gap: ${(props) => props.gap};
     position: ${(props) => props.position};
     transform: ${(props) => props.transform};
     left: ${(props) => props.left};
     bottom: ${(props) => props.bottom};
     z-index: ${(props) => props.zIndex};
     transition: all 4s;
     padding: ${(props) => props.padding};
     animation: ${(props) =>
          props.animation &&
          `lowerOpacity ${props.animationTime || "5s"} infinite`};
     @keyframes lowerOpacity {
          0% {
               opacity: 1;
          }

          85% {
               opacity: 1;
          }

          100% {
               opacity: 0;
          }
     }

     @media ${cssBreakPoints.mobile} {
          width: ${(props) => props.mobileWidth};
          height: ${(props) => props.mobileHeigt};
          bottom: ${(props) => props.mobileBottom};
          left: 50%;
          transform: ${(props) => props.mobileTransform};
          padding: 11px 16px;
          ${(props) =>
               props.positionFixiedBottom &&
               css`
                    position: fixed;
                    bottom: 150px;
                    left: 50%;
                    transform: translate(-50%, -100%);
               `}
     }
`;
export const StyledSpan = styled.span<Props>`
     ${(props) =>
          props.variant === "success" &&
          css`
               color: ${themes.white};
               font-size: 2rem;
               font-weight: 300;
               text-align: center;
          `};
     flex-grow: 0;
     font-family: inherit;
     @media ${cssBreakPoints.mobile} {
          font-size: 1.4rem;
     }
`;
