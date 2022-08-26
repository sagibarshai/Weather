import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { login } from "../redux/authSlice";
import { closeMobileMenu } from "../redux/headerSlice";
import Notification from "../shared/notifacation/Notification";
import Input from "../shared/UIElements/Inputs/Input";
import { loginService } from "../shared/utils/Services/Abra-Server/LoginService";
import { RootState } from "../redux/store";
import { InputProps } from "../shared/UIElements/Inputs/Input";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { ReactComponent as IconFacebook } from "../shared/svg/logo-facebook.svg";
import { ReactComponent as IconGoogle } from "../shared/svg/logo-google.svg";
import { ReactComponent as IconNotification } from "../shared/svg/info-circle.svg";
import { ReactComponent as IconApp } from "../shared/svg/logo-large.svg";
import { StyledIcon } from "../shared/Icons/Icon";
import {
     StyledLoginPageContainer,
     StyledLoginContainer,
     StyledTitle,
     StyledInputsContainer,
     StyledContainer,
     StyledHr,
     StyledSpan,
     StyledLogoContainer,
} from "./styles/StyledLogin";
const Login = () => {
     const [email, setEmail] = useState<string>("");
     const [password, setPassword] = useState<string>("");
     const [passwordErrorMessage, setPasswordErrorMessage] =
          useState<string>("");
     const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
     const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
     const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
     const [emailInputState, setEmailInputState] =
          useState<InputProps>("inactive");
     const [passwordInputState, setPasswordInputState] =
          useState<InputProps>("inactive");
     const [emailIsFocus, setEmailIsFocus] = useState<boolean>(false);
     const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);
     const [serverError, setServerError] = useState<string | null>(null);
     const onSubmitHandler = async (e: ChangeEvent<HTMLInputElement>) => {
          setServerError(null);
          e.preventDefault();
          try {
               const res = await loginService(email, password);
               dispatch(login(res.data.token));
               return res;
          } catch (err: any) {
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
               setServerError(errorMessage);
          }
     };

     useEffect(() => {
          const checkPassword =
               password.length >= 6 &&
               /[a-zA-Z]/.test(password) &&
               /\d/.test(password);
          const checkEmail =
               email.length >= 6 &&
               email.includes("@") &&
               email.includes(".") &&
               !email.endsWith(".");
          setPasswordIsValid(checkPassword);
          setEmailIsValid(checkEmail);
     }, [email, password, emailIsFocus, passwordIsFocus]);
     const dispatch = useDispatch();
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: RootState) => state.headerSlice.openMobileMenu
     );

     return (
          <StyledLoginPageContainer
               renderPraimaryBackground={renderPraimaryBackground}
               onClick={() =>
                    openMobileMenu ? dispatch(closeMobileMenu()) : ""
               }
          >
               <StyledLogoContainer>
                    <IconApp />
               </StyledLogoContainer>
               <StyledLoginContainer
                    onSubmit={(e: any) => onSubmitHandler(e)}
                    height={serverError ? "737px" : "639px"}
                    mobileServerError={serverError ? true : false}
                    serverError={serverError}
               >
                    <StyledTitle>Log in</StyledTitle>
                    <StyledInputsContainer>
                         {serverError && (
                              <Notification
                                   variant="error"
                                   icon={<IconNotification />}
                                   message={serverError}
                                   mobileHeigt="63px"
                              />
                         )}
                         <Input
                              mobileWidth="90vw"
                              type="text"
                              variant={emailInputState}
                              errorMessage={emailErrorMessage}
                              label="Email Account"
                              placeHolder="example@example.com..."
                              onChange={(e: any) => {
                                   setEmail(e.target.value);
                                   setServerError(null);
                              }}
                              onBlur={() => {
                                   setEmailIsFocus(false);
                                   if (!emailIsValid) {
                                        let errorMessage = "";
                                        if (email.length < 6)
                                             errorMessage +=
                                                  "Email must contain at least 6 characters";
                                        else if (!email.includes("@"))
                                             errorMessage +=
                                                  'Email must contain "@" ';
                                        else if (!email.includes("."))
                                             errorMessage +=
                                                  'Email must contain "." ';
                                        else if (email.endsWith("."))
                                             errorMessage +=
                                                  'Email cannot end with "." ';
                                        setEmailInputState("validation");
                                        setEmailErrorMessage(errorMessage);
                                   }
                              }}
                              onFocus={() => {
                                   setEmailIsFocus(true);
                                   setEmailErrorMessage("");
                                   setEmailInputState("active");
                              }}
                         />
                         <Input
                              mobileWidth="90vw"
                              type="password"
                              variant={passwordInputState}
                              label="Password"
                              placeHolder="6 characters and digit numbers..."
                              errorMessage={passwordErrorMessage}
                              onChange={(e: any) => {
                                   setPassword(e.target.value);
                                   setServerError(null);
                              }}
                              onBlur={() => {
                                   setPasswordIsFocus(false);
                                   if (!passwordIsValid) {
                                        let errorMessage = "";
                                        if (password.length < 6)
                                             errorMessage +=
                                                  "password must contain at least 6 characters";
                                        else if (!/[a-zA-Z]/.test(password))
                                             errorMessage +=
                                                  "password must contain at least one character ";
                                        else if (!/\d/.test(password))
                                             errorMessage +=
                                                  "password must contain at least one number";
                                        setPasswordInputState("validation");
                                        setPasswordErrorMessage(errorMessage);
                                   }
                              }}
                              onFocus={() => {
                                   setPasswordIsFocus(true);
                                   setPasswordInputState("active");
                                   setPasswordErrorMessage("");
                              }}
                         />
                    </StyledInputsContainer>
                    <StyledButton
                         mobileWidthWithCalc="90vw"
                         margin="40px 0 0 0"
                         disabled={!(emailIsValid && passwordIsValid)}
                         variant={
                              !(emailIsValid && passwordIsValid)
                                   ? "disabled"
                                   : "default"
                         }
                    >
                         Log in
                    </StyledButton>
                    <StyledContainer margin="48px 54px 0">
                         <StyledHr />
                         <StyledSpan>Or log in with</StyledSpan>
                         <StyledHr />
                    </StyledContainer>

                    <StyledContainer gap="16px" flexDeiraction="column">
                         <StyledButton variant="linkWithImg">
                              <StyledIcon marginRight="8px">
                                   <IconFacebook />
                              </StyledIcon>
                              Log in with facebook
                         </StyledButton>
                         <StyledButton variant="linkWithImg">
                              <StyledIcon marginRight="8px">
                                   <IconGoogle />
                              </StyledIcon>
                              Log in with google
                         </StyledButton>
                    </StyledContainer>
               </StyledLoginContainer>
          </StyledLoginPageContainer>
     );
};

export default Login;
