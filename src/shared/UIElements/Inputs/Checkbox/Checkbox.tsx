import {
     StyledDivToggle,
     StyledIconState,
     StyledInput,
     StyledLabel,
} from "./style";

import { Props } from "./types";

const Checkbox: React.FC<Props> = (props) => {
     return (
          <StyledLabel
               htmlFor={props.htmlFor}
               onClick={props.onClick}
               rotate={props.rotate ? "true" : undefined}
          >
               <StyledInput
                    onChange={props.onClick}
                    type="checkbox"
                    id={props.id}
                    checked={props.checked}
               />
               <StyledDivToggle>
                    <StyledIconState
                         style={{ left: "27.5%" }}
                         top={props.top}
                         rotate={props.rotate ? "true" : undefined}
                    >
                         {props.LeftIcon}
                    </StyledIconState>
                    <StyledIconState
                         style={{ left: "72.5%" }}
                         top={props.top}
                         rotate={props.rotate ? "true" : undefined}
                    >
                         {props.rightIcon}
                    </StyledIconState>
               </StyledDivToggle>
          </StyledLabel>
     );
};

export default Checkbox;
