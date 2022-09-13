import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { StyledButton } from "../../../UIElements/Button/Button";
import { StyledIcon } from "../../../Icons/Icon";
import { ReactComponent as IconFacebook } from "../../../svg/logo-facebook.svg";
import { loginFacebookService } from "./loginFacebookService";
import { useMutation } from "react-query";
import { Props } from "./types";
import { login } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";

const LoginWithFacebook: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     const { mutate } = useMutation(loginFacebookService, {
          onSuccess: (data: { token: string }) => {
               dispatch(login(data.token.toString()));
          },
          onError: (err: any) => {
               let errorMessage = "";
               const errorsObj = err.request.response;
               const parsesErrorsObj = JSON.parse(errorsObj);
               for (let error in parsesErrorsObj) {
                    if (Array.isArray(parsesErrorsObj[error])) {
                         for (let element of parsesErrorsObj[error]) {
                              errorMessage += element;
                         }
                    } else console.log(error);
               }
               props.setServerErrorMessage(errorMessage);
          },
     });

     return (
          <FacebookLogin
               appId={
                    process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID ||
                    "3303782009865883"
               }
               callback={(res: any) => {
                    mutate({ access_token: res.accessToken });
               }}
               autoLoad={true}
               disableMobileRedirect={true}
               render={(renderProps) => {
                    return (
                         <StyledButton variant="linkWithImg" type="button">
                              <StyledIcon marginRight="8px">
                                   <IconFacebook />
                              </StyledIcon>
                              Log in with facebook
                         </StyledButton>
                    );
               }}
          />
     );
};
export default LoginWithFacebook;
