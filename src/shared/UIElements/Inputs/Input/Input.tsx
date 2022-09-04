import { Props } from "./types";
import {
     StyledInput,
     StyledInputsContainer,
     StyledInvalidInput,
     StyledLabel,
} from "./style";
const Input: React.FC<Props> = (props) => {
     return (
          <>
               <StyledInputsContainer
                    variant={props.variant}
                    marginTop={props.marginTop}
               >
                    <StyledLabel variant={props.variant} color={props.color}>
                         {props.label}
                    </StyledLabel>
                    <StyledInput
                         value={props.value}
                         laptopWidth={props.laptopWidth}
                         onFocus={props.onFocus}
                         onBlur={props.onBlur}
                         onKeyDown={props.onKeyDown}
                         onChange={props.onChange}
                         width={props.width}
                         height={props.height}
                         variant={props.variant}
                         placeholder={props.placeHolder}
                         type={props.type || "text"}
                         mobileWidth={props.mobileWidth}
                         fontWeight={props.fontWeight}
                    />
                    {props.children}
                    <StyledInvalidInput variant={props.variant}>
                         {props.variant === "validation" && props.errorMessage}
                    </StyledInvalidInput>
               </StyledInputsContainer>
          </>
     );
};
export default Input;
