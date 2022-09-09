import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/authSlice";
import { StyledIcon } from "../../../Icons/Icon";
import { StyledButton } from "../../../UIElements/Button/Button";
import { loginGoogleService } from "../Abra-Server/loginGoogleService";
import { Props } from "./types";
import { ReactComponent as IconGoogle } from "../../../svg/logo-google.svg";
import { useNavigate } from "react-router-dom";
const LoginWithGoogle: React.FC<Props> = (props) => {
     const navigate = useNavigate();
     const googleLoginCustomButton = useGoogleLogin({
          onError: (err: any) => {
               console.log(err);
          },
          onSuccess: (e: any) => {
               mutate({
                    id_token: e.tokenId,
                    access_token: e.access_token,
               });
          },
     });

     const dispatch = useDispatch();
     const { mutate } = useMutation(loginGoogleService, {
          onSuccess: (data: any) => {
               dispatch(login(data.token.toString()));
               navigate("/home");
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
               props.setServerError(errorMessage);
          },
     });
     return (
          <StyledButton
               type="button"
               variant="linkWithImg"
               onClick={() => googleLoginCustomButton()}
          >
               <StyledIcon marginRight="8px">
                    <IconGoogle />
               </StyledIcon>
               Log in with google
          </StyledButton>
     );
};
export default LoginWithGoogle;
