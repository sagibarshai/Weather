import styled from "styled-components";
import themes from "../themes/themes";
import { StyledIcon } from "../Icons/Icon";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
type Props = {
     width?: string;
     height?: string;
     backgroundColor?: string;
     message?: string;
     mobileWidth?: string;
     icon?: JSX.Element;
};

const StyledNotificationContainer = styled.div<Props>`
     width: ${(props) => props.width || "360px"};
     height: ${(props) => props.height || "36px"};
     padding: 24px;
     border-radius: 10px;
     background-color: ${(props) =>
          props.backgroundColor || `${themes.notificationError}`};
     display: flex;
     gap: 16px;
     @media ${cssBreakPoints.mobile} {
          width: ${(props) => props.mobileWidth};
     }
`;
export const StyledSpan = styled.span`
     width: 262px;
     height: 36px;
     flex-grow: 0;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.notificationText};
`;
const Notification: React.FC<Props> = (props) => {
     return (
          <StyledNotificationContainer {...props}>
               <StyledIcon>{props.icon}</StyledIcon>
               <StyledSpan>{props.message}</StyledSpan>
          </StyledNotificationContainer>
     );
};
export default Notification;
