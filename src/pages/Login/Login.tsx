import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";

import { StyledIcon } from "../../shared/Icons/Icon";
import { StyledButton } from "../../shared/UIElements/Button/Button";

import HashLoading from "../../shared/Loaing-elements/HashLoading/HashLoading";
import LoginWithGoogle from "../../shared/utils/Services/Google-Login/GoogleLogin";
import LoginWithFacebook from "../../shared/utils/Services/Facebook-login/FacebookLogin";
import Notification from "../../shared/notifacation/Notification";
import Input from "../../shared/UIElements/Inputs/Input/Input";

import { login } from "../../redux/authSlice";
import { closeMobileMenu } from "../../redux/headerSlice";

import { loginService } from "../../shared/utils/Services/Abra-Server/LoginService";

import { ReactComponent as IconNotification } from "../../shared/svg/info-circle.svg";
import { ReactComponent as IconApp } from "../../shared/svg/logo-large.svg";

import { StoreState } from "../../redux/store";
import { InputProps } from "../../shared/UIElements/Inputs/Input/types";
import { LoginResult } from "./types";

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

const Login = () => {
     const dispatch = useDispatch();

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
     const [serverErrorMessage, setServerErrorMessage] = useState<
          string | null
     >(null);
     const [serverError, setServerError] = useState<boolean>(false);

     const renderPraimaryBackground = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: StoreState) => state.headerSlice.openMobileMenu
     );

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
               setServerErrorMessage(errorMessage);
          },
     });

     const onSubmitHandler = (e: ChangeEvent<HTMLInputElement>) => {
          setServerErrorMessage(null);
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
                    left="25px"
                    transformMobile="translate(-50%,0)"
                    transform="translate(0,0)"
               >
                    <IconApp />
               </StyledIcon>
               <StyledLoginContainer
                    mobileServerError={serverErrorMessage ? true : false}
                    serverError={serverErrorMessage}
               >
                    <StyledContentContainer>
                         <StyledTitle>Log in</StyledTitle>
                         <StyledInputsContainer>
                              {serverErrorMessage && (
                                   <Notification
                                        variant="error"
                                        icon={<IconNotification />}
                                        message={serverErrorMessage}
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
                                        setServerErrorMessage(null);
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
                                        setServerErrorMessage(null);
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
                              {/* <LoginWithFacebook
                                   setServerError={setServerError}
                                   setServerErrorMessage={setServerErrorMessage}
                              /> */}
                              <LoginWithGoogle
                                   setServerError={setServerError}
                                   setServerErrorMessage={setServerErrorMessage}
                              />
                         </StyledContainer>
                    </StyledContentContainer>
               </StyledLoginContainer>
          </StyledLoginPageContainer>
     );
};

export default Login;
