import Notification from "../../../shared/notifacation/Notification";
import themes from "../../../shared/themes/themes";
import { ReactComponent as IconError } from "../../../shared/svg/info-circle.svg";
const ApiError = () => {
     return (
          <Notification
               icon={<IconError />}
               zIndex="101"
               variant="error"
               backgroundColor={themes.errorRed}
               animation={true}
               animationTime={5000}
               width="350px"
               position="fixed"
               bottom="50%"
               left="50%"
               transform="translate(-50%,-50%)"
               message="Sorry, We having an issue on our server, please try again later."
               mobileHeigt="75px"
               mobileWidth="300px"
               mobileBottom="75px"
          />
     );
};

export default ApiError;
