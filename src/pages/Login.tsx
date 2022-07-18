import { useState } from "react";
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
import { StyledIcon } from "../shared/Icons/Icon";

const Login = () => {
     const [inputState, setInputState] = useState<InputProps>("inactive");
     return (
          <StyledLoginContainer>
               <StyledTitle>Log in</StyledTitle>
               <StyledInputsContainer>
                    <Input
                         variant={inputState}
                         label="Email Account"
                         placeHolder="example@example.com..."
                    />
                    <Input
                         variant={inputState}
                         label="Email Account"
                         placeHolder="example@example.com..."
                    />
               </StyledInputsContainer>
               <StyledButton margin="40px 0 0 0">Log in</StyledButton>
               <StyledContainer>
                    <StyledHr />
                    <StyledSpan>Or log in with</StyledSpan>
                    <StyledHr />
               </StyledContainer>

               <StyledContainer gap="16px">
                    <StyledButton variant="linkWithImg">
                         <StyledIcon>
                              <IconFacebook />
                         </StyledIcon>
                         Log in with facebook
                    </StyledButton>
                    <StyledButton variant="linkWithImg">
                         <StyledIcon>
                              <IconGoogle />
                         </StyledIcon>
                         Log in with google
                    </StyledButton>
               </StyledContainer>
          </StyledLoginContainer>
     );
};

export default Login;
