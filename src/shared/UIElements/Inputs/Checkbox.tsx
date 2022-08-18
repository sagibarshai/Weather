import { ReactEventHandler } from "react";
import styled, { css } from "styled-components";
import themes from "../../themes/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
type StyleProps = {
     top?: string;
     rotate?: boolean;
};

type Props = {
     checked?: boolean;
     variant: "checkbox";
     LeftIcon: string | JSX.Element;
     rightIcon: string | JSX.Element;
     id: string;
     htmlFor?: string;
     onClick?: ReactEventHandler;
     top?: string;
     rotate?: boolean;
};
const StyledLabel = styled.label<StyleProps>`
     width: 73px;
     height: 40px;
     border-radius: 100px;
     display: inline-block;
     cursor: pointer;
     border: 1px solid #444e72;

     ${(props) =>
          props.rotate === true &&
          css`
               transform: rotate(-180deg);
          `}
`;
const StyledDivToggle = styled.div<StyleProps>`
     position: relative;
     width: 73px;
     height: 40px;
     border-radius: 100px;
     transition: background-color 0.4s;
     background-color: ${themes.white};
     &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 36px;
          width: 38px;
          background-color: ${themes.fadeText};
          border-radius: 100px;
          transition: transform 0.4s;
     }
`;
const StyledInput = styled.input<StyleProps>`
     display: none;

     &:checked + ${StyledDivToggle}::after {
          transform: translate(35px, -50%);
     }
`;
const StyledIconState = styled.div<StyleProps>`
     display: inline-block;
     height: auto;
     font-size: 2.2rem;
     vertical-align: middle;
     position: absolute;

     top: ${(props) => props.top || "50%"};
     ${(props) =>
          props.rotate === true
               ? css`
                      transform: translate(-50%, -50%) rotate(-180deg);
                 `
               : css`
                      transform: translate(-50%, -50%);
                 `}
`;
const Checkbox: React.FC<Props> = (props) => {
     return (
          <StyledLabel
               htmlFor={props.htmlFor}
               onClick={props.onClick}
               rotate={props.rotate}
          >
               <StyledInput
                    onClick={props.onClick}
                    type="checkbox"
                    id={props.id}
                    checked={props.checked}
               />
               <StyledDivToggle>
                    <StyledIconState
                         style={{ left: "30%" }}
                         top={props.top}
                         rotate={props.rotate}
                    >
                         {props.LeftIcon}
                    </StyledIconState>
                    <StyledIconState
                         style={{ left: "72.5%" }}
                         top={props.top}
                         rotate={props.rotate}
                    >
                         {props.rightIcon}
                    </StyledIconState>
               </StyledDivToggle>
          </StyledLabel>
     );
};

export default Checkbox;
