import styled, { css } from "styled-components";
import themes from "../themes/themes";
import { StyledIcon } from "../Icons/Icon";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
type Variant = "error" | "success";
type Props = {
     variant: Variant;
     width?: string;
     height?: string;
     backgroundColor?: string;
     message?: string;
     mobileWidth?: string;
     icon?: JSX.Element;
     transform?: string;
     position?: string;
     bottom?: string;
     left?: string;
     fontSize?: string;
     fontWeight?: string;
     color?: string;
     gap?: string;
     mobileHeigt?: string;
     mobileBottom?: string;
     animation?: boolean;
};

const StyledNotificationContainer = styled.div<Props>`
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 10px;
     ${(props) =>
          props.variant === "success" &&
          css`
               width: 493px;
               height: 86px;
               background-color: rgba(0, 0, 0, 0.8);
               position: fixed;
               bottom: 54px;
               mobile-bottom: 128px;
               left: 50%;
               transform: translate(-50%, 0%);
               gap: 5px;
          `};
     z-index: 3;
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
          `};
     gap: ${(props) => props.gap};
     transition: all 4s;
     animation: ${(props) => props.animation && `lowerOpacity 4s infinite`};
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
          padding: 11px 16px;
          bottom: ${(props) => props.mobileBottom};
          font-size: 1.4rem;
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
     /* color: ${(props) => props.color || themes.notificationText}; */
`;
const Notification: React.FC<Props> = (props) => {
     return (
          <StyledNotificationContainer {...props}>
               <StyledIcon>{props.icon}</StyledIcon>
               <StyledSpan {...props}>{props.message}</StyledSpan>
          </StyledNotificationContainer>
     );
};
export default Notification;
