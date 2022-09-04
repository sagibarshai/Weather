import { StyledIcon } from "../Icons/Icon";
import { StyledNotificationContainer, StyledSpan } from "./style";
import { Props } from "./types";
const Notification: React.FC<Props> = (props) => {
     return (
          <StyledNotificationContainer {...props}>
               <StyledIcon>{props.icon}</StyledIcon>
               <StyledSpan {...props}>{props.message}</StyledSpan>
          </StyledNotificationContainer>
     );
};
export default Notification;
