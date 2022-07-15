import { ReactEventHandler } from "react";
import styled, { css } from "styled-components";
import themes from "../../themes/themes";
type Props = {
     variant: "checkbox";
     LeftIcon: string | JSX.Element;
     rightIcon: string | JSX.Element;
     id: string;
     htmlFor?: string;
     onClick?: ReactEventHandler;
};
const StyledLabel = styled.label`
     width: 73px;
     height: 40px;
     border-radius: 100px;
     display: inline-block;
     cursor: pointer;
     background-color: blue;
     /* overflow: hidden; */
`;
const StyledDivToggle = styled.div`
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
const StyledInput = styled.input`
     display: none;
     &:checked + ${StyledDivToggle}::after {
          transform: translate(35px, -50%);
     }
`;
const StyledIconState = styled.div`
     display: inline-block;
     height: auto;
     font-size: 2.2rem;
     vertical-align: middle;
     position: absolute;
     top: 60%;
     transform: translate(-50%, -50%);
`;
const Checkbox: React.FC<Props> = (props) => {
     return (
          <StyledLabel htmlFor={props.htmlFor} onClick={props.onClick}>
               <StyledInput type="checkbox" id={props.id} />
               <StyledDivToggle>
                    <StyledIconState style={{ left: "30%" }}>
                         {props.LeftIcon}
                    </StyledIconState>
                    <StyledIconState style={{ left: "70%" }}>
                         {props.rightIcon}
                    </StyledIconState>
               </StyledDivToggle>
          </StyledLabel>
     );
};

export default Checkbox;
