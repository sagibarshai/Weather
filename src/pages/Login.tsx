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
     value: string;
     isValid: boolean;
};
const Login = () => {
     const [inputEmailState, setInputEmailState] = useState<inputState>({
          inputState: "active",
          value: "",
          isValid: false,
     });
     const [inputPasswordState, setInputPasswordState] = useState<inputState>({
          inputState: "inactive",
          value: "",
          isValid: false,
     });
     const [errorMessage, setErrorMessage] = useState<string>(
          "email must contain @"
     );
     const [serverError, setServerError] = useState<string | null>(
          "connection is lost. please check your connetion device and try again."
     );
     const [formIsValid, setFormIsValid] = useState<boolean>(
          inputEmailState.isValid && inputPasswordState.isValid
     );

     const onSubmitHandler = (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          console.log(inputEmailState.value, inputPasswordState.value);
     };
     const inputChangeHandler = (
          e: ChangeEvent<HTMLInputElement>,
          inputState: string
     ) => {
          let emailIsValid: boolean = false;
          let passwordIsValid: boolean = false;
          if (inputState === "email") {
               if (inputEmailState.value.length >= 7) {
                    emailIsValid = true;
               }
               setInputEmailState({
                    ...inputEmailState,
                    value: e.target.value,
               });
               if (emailIsValid)
                    setInputEmailState({
                         ...inputEmailState,
                         isValid: emailIsValid,
                    });
          } else {
               if (
                    inputPasswordState.value.length >= 6 &&
                    /\d/.test(inputPasswordState.value) //   contain a number
               ) {
                    passwordIsValid = true;
               }
               setInputPasswordState({
                    ...inputPasswordState,
                    value: e.target.value,
               });
               if (passwordIsValid)
                    setInputPasswordState({
                         ...inputPasswordState,
                         isValid: passwordIsValid,
                    });
          }
          console.log(inputEmailState.isValid && inputPasswordState.isValid);
          setFormIsValid(inputEmailState.isValid && inputPasswordState.isValid);
     };
     // console.log(formIsValid, inputPasswordState, inputEmailState);
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
                         type="email"
                         variant={inputEmailState.inputState}
                         errorMessage={errorMessage}
                         label="Email Account"
                         placeHolder="example@example.com..."
                         onChange={(e) =>
                              inputChangeHandler(
                                   e as ChangeEvent<HTMLInputElement>,
                                   "email"
                              )
                         }
                    />
                    <Input
                         type="password"
                         variant={inputPasswordState.inputState}
                         label="Password"
                         placeHolder="6 characters and digit numbers..."
                         errorMessage={errorMessage}
                         onChange={(e) =>
                              inputChangeHandler(
                                   e as ChangeEvent<HTMLInputElement>,
                                   "password"
                              )
                         }
                    />
               </StyledInputsContainer>
               <StyledButton
                    margin="40px 0 0 0"
                    disabled={!formIsValid}
                    variant={!formIsValid ? "disabled" : "default"}
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
