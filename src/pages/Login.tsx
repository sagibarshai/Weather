import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import {
     StyledLoginContainer,
     StyledTitle,
     StyledInputsContainer,
     StyledContainer,
     StyledHr,
     StyledSpan,
} from "./StyledLogin";
import Input from "../shared/UIElements/Inputs/Input";
import { InputProps } from "../shared/UIElements/Inputs/Input";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { ReactComponent as IconFacebook } from "../shared/svg/logo-facebook.svg";
import { ReactComponent as IconGoogle } from "../shared/svg/logo-google.svg";
import { ReactComponent as IconNotification } from "../shared/svg/info-circle.svg";
import { StyledIcon } from "../shared/Icons/Icon";
import Notification from "../shared/notifacation/Notification";
type inputState = {
     inputState: InputProps;
     isValid: boolean;
};
const Login = () => {
     const [email, setEmail] = useState<string>("");
     const [password, setPassword] = useState<string>("");
     const [passwordErrorMessage, setPasswordErrorMessage] = useState<
          string | null
     >(null);
     const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
          null
     );
     const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
     const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
     const [emailInputState, setEmailInputState] =
          useState<InputProps>("inactive");
     const [passwordInputState, setPasswordInputState] =
          useState<InputProps>("inactive");

     const [serverError, setServerError] = useState<string | null>(
          "connection is lost. please check your connetion device and try again."
     );

     const onSubmitHandler = (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
     };
     useEffect(() => {
          const checkPassword =
               password.length >= 6 &&
               /[a-zA-Z]/.test(password) &&
               /\d/.test(password);
          if (checkPassword) setPasswordIsValid(checkPassword);
          const checkEmail =
               email.length >= 6 && email.includes("@") && email.includes(".");
          if (checkEmail) setEmailIsValid(checkEmail);
     }, [email, password]);
     return (
          <StyledLoginContainer onSubmit={(e: any) => onSubmitHandler(e)}>
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
                              console.log("blur");
                              if (!emailIsValid) {
                                   let errorMessage = "";
                                   if (email.length < 6)
                                        errorMessage +=
                                             "Email must contain 6 characters";
                                   else if (!email.includes("@"))
                                        errorMessage +=
                                             'Email must contain "@" ';
                                   else if (!email.includes("."))
                                        errorMessage +=
                                             'Email must contain "." ';
                                   setEmailInputState("validation");
                                   setEmailErrorMessage(errorMessage);
                              } else {
                                   setEmailErrorMessage(null);
                                   setEmailInputState("inactive");
                              }
                         }}
                         onFocus={() => {
                              console.log("focus");
                              setEmailInputState("active");
                              setEmailErrorMessage(null);
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
                              if (!passwordIsValid) {
                                   let errorMessage = "";
                                   if (password.length < 6)
                                        errorMessage +=
                                             "password must contain 6 characters";
                                   else if (!/[a-zA-Z]/.test(password))
                                        errorMessage +=
                                             "password must contain character/s ";
                                   else if (!/\d/.test(password))
                                        errorMessage +=
                                             "password must contain number/s";
                                   setPasswordInputState("validation");
                                   setPasswordErrorMessage(errorMessage);
                              } else {
                                   setPasswordErrorMessage(null);
                                   setPasswordInputState("inactive");
                              }
                         }}
                         onFocus={() => {
                              console.log("focus");
                              setPasswordInputState("active");
                              setPasswordErrorMessage(null);
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

               <StyledContainer gap="16px">
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
     );
};

export default Login;
