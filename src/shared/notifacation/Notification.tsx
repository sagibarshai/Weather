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
     width: ${(props) => props.width || "360px"};
     height: ${(props) => props.height || "36px"};
     z-index: 3;
     padding: 24px;
     border-radius: 10px;
     background-color: ${(props) =>
          props.backgroundColor || `${themes.notificationError}`};
     display: flex;
     gap: 16px;
     position: ${(props) => props.position};
     bottom: ${(props) => props.bottom};
     left: ${(props) => props.left};
     transform: ${(props) => props.transform};
     align-items: center;
     justify-content: center;
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
     width: auto;
     flex-grow: 0;
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "1.4rem"};
     font-weight: ${(props) => props.fontWeight};
     color: ${(props) => props.color || themes.notificationText};
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
