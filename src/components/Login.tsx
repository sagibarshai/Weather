import { useState, ChangeEvent, useEffect } from "react";
import Notification from "../shared/notifacation/Notification";
import Input from "../shared/UIElements/Inputs/Input";
import { InputProps } from "../shared/UIElements/Inputs/Input";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { ReactComponent as IconFacebook } from "../shared/svg/logo-facebook.svg";
import { ReactComponent as IconGoogle } from "../shared/svg/logo-google.svg";
import { ReactComponent as IconNotification } from "../shared/svg/info-circle.svg";
import { ReactComponent as IconApp } from "../shared/svg/logo.svg";
import { StyledIcon } from "../shared/Icons/Icon";
import {
     StyledLoginContainer,
     StyledTitle,
     StyledInputsContainer,
     StyledContainer,
     StyledHr,
     StyledSpan,
     StyledLogoContainer,
} from "./StyledLogin";

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
     const [serverError, setServerError] = useState<string | null>("error");

     const onSubmitHandler = (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          console.log(email, password);
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

     return (
          <>
               <StyledLogoContainer>
                    <StyledIcon
                         position="absolute"
                         top="56px"
                         right="50%"
                         transform="translate(50% , -50%)"
                         height="97px"
                         width="148px"
                    >
                         <IconApp />
                    </StyledIcon>
               </StyledLogoContainer>
               <StyledLoginContainer
                    onSubmit={(e: any) => onSubmitHandler(e)}
                    height={serverError ? "737px" : "639px"}
                    mobile={serverError ? true : false}
               >
                    <StyledTitle>Log in</StyledTitle>
                    <StyledInputsContainer>
                         {serverError && (
                              <Notification
                                   icon={<IconNotification />}
                                   message={serverError}
                              />
                         )}
                         <Input
                              type="text"
                              variant={emailInputState}
                              errorMessage={emailErrorMessage}
                              label="Email Account"
                              placeHolder="example@example.com..."
                              onChange={(e: any) => {
                                   setEmail(e.target.value);
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
                              type="password"
                              variant={passwordInputState}
                              label="Password"
                              placeHolder="6 characters and digit numbers..."
                              errorMessage={passwordErrorMessage}
                              onChange={(e: any) => {
                                   setPassword(e.target.value);
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
                    <StyledContainer>
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
          </>
     );
};

export default Login;
