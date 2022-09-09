import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { login } from "../../redux/authSlice";
import { closeMobileMenu } from "../../redux/headerSlice";
import Notification from "../../shared/notifacation/Notification";
import Input from "../../shared/UIElements/Inputs/Input/Input";
import { loginService } from "../../shared/utils/Services/Abra-Server/LoginService";
import { StoreState } from "../../redux/store";
import { InputProps } from "../../shared/UIElements/Inputs/Input/types";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import { ReactComponent as IconFacebook } from "../../shared/svg/logo-facebook.svg";
import { ReactComponent as IconGoogle } from "../../shared/svg/logo-google.svg";
import { ReactComponent as IconNotification } from "../../shared/svg/info-circle.svg";
import { ReactComponent as IconApp } from "../../shared/svg/logo-large.svg";
import { StyledIcon } from "../../shared/Icons/Icon";
import {
     StyledLoginPageContainer,
     StyledLoginContainer,
     StyledTitle,
     StyledInputsContainer,
     StyledContainer,
     StyledHr,
     StyledSpan,
     StyledContentContainer,
} from "./style";
import HashLoading from "../../shared/Loaing-elements/HashLoading/HashLoading";
import LoginWithGoogle, {
     clientIdGoogle,
} from "../../shared/utils/Services/Google-Login/GoogleLogin";
import { gapi } from "gapi-script";

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
     const [loginWithGoogle, setLoginWithGoogle] = useState<boolean>(false);
     type LoginResult = {
          data: { token: string; a: 6 };
     };
     const { mutate, isLoading: loginIsLoading } = useMutation(loginService, {
          onSuccess: (data: LoginResult) => {
               dispatch(login(data?.data?.token));
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
               setServerError(errorMessage);
          },
     });
     // useEffect(() => {
     //      const startLoginGoogle = () => {
     //           gapi.client.init({
     //                clientId: clientIdGoogle,
     //                scope: "",
     //           });
     //      };
     //      gapi.load("client:auth2", startLoginGoogle);
     // });

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
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: StoreState) => state.headerSlice.openMobileMenu
     );
     const onSubmitHandler = async (e: ChangeEvent<HTMLInputElement>) => {
          setServerError(null);
          e.preventDefault();
          const dataObj = { email, password };
          mutate(dataObj);
     };
     return (
          <StyledLoginPageContainer
               renderPraimaryBackground={renderPraimaryBackground}
               onClick={() =>
                    openMobileMenu ? dispatch(closeMobileMenu()) : ""
               }
          >
               <StyledIcon
                    position="absolute"
                    top="0"
                    mobileLeft="50%"
                    left="0"
                    transformMobile="translate(-50%,0)"
                    transform="translate(0,0)"
               >
                    <IconApp />
               </StyledIcon>
               <StyledLoginContainer
                    mobileServerError={serverError ? true : false}
                    serverError={serverError}
               >
                    <StyledContentContainer>
                         <StyledTitle>Log in</StyledTitle>
                         <StyledInputsContainer>
                              {serverError && (
                                   <Notification
                                        variant="error"
                                        icon={<IconNotification />}
                                        message={serverError}
                                        mobileHeigt="63px"
                                        mobileTransform="translateX(-50%)"
                                   />
                              )}
                              <Input
                                   mobileWidth="324px"
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
                                   mobileWidth="324px"
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
                                             else if (
                                                  !/[a-zA-Z]/.test(password)
                                             )
                                                  errorMessage +=
                                                       "password must contain at least one character ";
                                             else if (!/\d/.test(password))
                                                  errorMessage +=
                                                       "password must contain at least one number";
                                             setPasswordInputState(
                                                  "validation"
                                             );
                                             setPasswordErrorMessage(
                                                  errorMessage
                                             );
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
                              type="submit"
                              onClick={(e: any) => onSubmitHandler(e)}
                              alignSelf="center"
                              mobileWidthWithCalc="324px"
                              margin="40px 0 0 0"
                              disabled={
                                   !(emailIsValid && passwordIsValid) ||
                                   loginIsLoading
                              }
                              variant={
                                   !(emailIsValid && passwordIsValid)
                                        ? "disabled"
                                        : "default"
                              }
                         >
                              {loginIsLoading ? (
                                   <HashLoading
                                        loading={loginIsLoading}
                                        size={25}
                                        color="#ffffff"
                                        width="100%"
                                   />
                              ) : (
                                   `Log in`
                              )}
                         </StyledButton>
                         <StyledContainer margin="48px 54px 0">
                              <StyledHr />
                              <StyledSpan>Or log in with</StyledSpan>
                              <StyledHr />
                         </StyledContainer>

                         <StyledContainer gap="16px" flexDeiraction="column">
                              <StyledButton variant="linkWithImg" type="button">
                                   <StyledIcon marginRight="8px">
                                        <IconFacebook />
                                   </StyledIcon>
                                   Log in with facebook
                              </StyledButton>
                              <LoginWithGoogle
                                   setServerError={setServerError}
                              />

                              {/* <StyledButton
                                   className="g-signin2"
                                   data-onsuccess={() => console.log()}
                                   data-theme="dark"
                                   id="login-google-button"
                                   type="button"
                                   variant="linkWithImg"
                                   onClick={() => {
                                        setLoginWithGoogle(true);
                                   }}
                              >
                                   <StyledIcon marginRight="8px">
                                        <IconGoogle />
                                   </StyledIcon>
                                   Log in with google
                              </StyledButton> */}
                         </StyledContainer>
                    </StyledContentContainer>
               </StyledLoginContainer>
          </StyledLoginPageContainer>
     );
};

export default Login;
