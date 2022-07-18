import styled, { css } from "styled-components";
import { StyledIcon } from "../../Icons/Icon";
import themes from "../../themes/themes";
export type InputProps = "inactive" | "focus" | "active" | "validation";
interface Variant {
     variant?: InputProps;
}
type Props = {
     variant: InputProps;
     label?: string;
     placeHolder?: string;
     color?: string;
     errorMessage?: string;
     display?: string;
     width?: string;
     height?: string;
     position?: string;
     padding?: string;
     marginTop?: string;
     children?: JSX.Element;
};
type ErrorMessage = {
     display?: string;
};

const StyledInputsContainer = styled.div<Variant>`
     position: relative;
     display: inline-block;
`;

const StyledLabel = styled.label<Variant>`
     z-index: 1;
     position: absolute;
     top: 14px;
     left: 24px;
     font-family: inherit;
     font-size: 14px;
     line-height: 1.25;
     color: ${(props) => props.color || themes.fadeText};
`;
const StyledInput = styled.input<Props>`
     width: ${(props) => (props.width ? props.width : "354px")};
     height: ${(props) => props.height || "77px"};
     border-radius: 10px;
     border: none;
     padding: 0 24px;

     ${(props) =>
          props.variant === "inactive"
               ? css`
                      background-color: ${themes.grayBackground};
                      font-family: inherit;
                      color: ${themes.gray};
                 `
               : ""}
     ${(props) =>
          props.variant === "focus"
               ? css`
                      background-color: ${themes.white};
                      color: #4d4d4d;
                 `
               : ""}
          ${(props) =>
          props.variant === "active"
               ? css`
                      background-color: ${themes.grayBackground};
                      color: #222;
                 `
               : ""}
          ${(props) =>
          props.variant === "validation"
               ? css`
                      background-color: ${themes.white};
                      color: ${themes.black};
                 `
               : ""};
`;

const StyledInvalidInput = styled.span<ErrorMessage>`
     color: ${themes.errorRed};
     margin-top: 4px;
     font-family: inherit;
     font-size: 1.4rem;
     display: ${(props) =>
          props.display
               ? css`
                      display: props.display;
                 `
               : css`
                      display: none;
                 `};
`;
const Input: React.FC<Props> = (props) => {
     return (
          <>
               <StyledInputsContainer>
                    <StyledLabel color={props.color}>{props.label}</StyledLabel>
                    <StyledInput
                         width={props.width}
                         height={props.height}
                         variant={props.variant}
                         placeholder={props.placeHolder}
                    />
                    {props.children}
               </StyledInputsContainer>
               <StyledInvalidInput>{props.errorMessage}</StyledInvalidInput>
          </>
     );
};
export default Input;
