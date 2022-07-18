import styled, { css } from "styled-components";
import themes from "../../themes/themes";
import { ChangeEvent } from "react";
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
     type?: string;
     onChange: (e: ChangeEvent) => void;
};
const StyledInputsContainer = styled.div<Variant>`
     position: relative;
     display: inline-block;
     border-radius: 10px;

     ${(props) =>
          props.variant === "validation" &&
          css`
               border: 1px solid ${themes.errorRed};
          `}
`;

const StyledLabel = styled.label<Variant>`
     z-index: 1;
     position: absolute;
     top: 14px;
     left: 24px;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.black};
     ${(props) =>
          props.variant === "validation"
               ? css`
                      color: ${themes.errorRed};
                 `
               : ``};
`;
const StyledInput = styled.input<Props>`
     width: ${(props) => (props.width ? props.width : "354px")};
     height: ${(props) => props.height || "77px"};
     border-radius: 10px;
     border: none;
     padding: 0 24px;
     line-height: 1.25;
     &:focus {
          outline: none;
          background-color: ${themes.white};
          color: ${themes.notificationText};
          font-size: 1.6rem;
          line-height: 1.25;
          margin-top: 4px;
     }
     ${(props) =>
          props.variant === "inactive"
               ? css`
                      background-color: ${themes.grayBackground};
                      font-family: inherit;
                      color: ${themes.gray};
                 `
               : ""}
     ${(props) =>
          props.variant === "active"
               ? css`
                      background-color: ${themes.grayBackground};
                      color: #222;
                      font-size: 1.8rem;
                      &::placeholder {
                           font-size: 1.4rem;
                      }
                 `
               : ""}
          ${(props) =>
          props.variant === "validation"
               ? css`
                      position: relative;
                      background-color: ${themes.white};
                      color: ${themes.black};
                 `
               : ""};
`;

const StyledInvalidInput = styled.span<Variant>`
     color: ${themes.errorRed};
     margin-top: 4px;
     font-family: inherit;
     font-size: 1.4rem;
     display: ${(props) =>
          props.variant === "validation"
               ? css`
                      display: flex;
                      align-self: flex-start;
                      position: absolute;
                      bottom: -20px;
                      left: 0;
                 `
               : css`
                      display: none;
                 `};
`;
const Input: React.FC<Props> = (props) => {
     return (
          <>
               <StyledInputsContainer variant={props.variant}>
                    <StyledLabel variant={props.variant} color={props.color}>
                         {props.label}
                    </StyledLabel>
                    <StyledInput
                         onChange={props.onChange}
                         width={props.width}
                         height={props.height}
                         variant={props.variant}
                         placeholder={props.placeHolder}
                         type={props.type || "text"}
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
