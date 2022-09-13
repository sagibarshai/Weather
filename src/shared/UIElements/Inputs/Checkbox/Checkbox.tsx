import { Props } from "./types";
import {
     StyledDivToggle,
     StyledIconState,
     StyledInput,
     StyledLabel,
} from "./style";
const Checkbox: React.FC<Props> = (props) => {
     return (
          <StyledLabel
               htmlFor={props.htmlFor}
               onClick={props.onClick}
               rotate={props.rotate ? true : undefined}
          >
               <StyledInput
                    onClick={props.onClick}
                    type="checkbox"
                    id={props.id}
               />
               <StyledDivToggle>
                    <StyledIconState
                         style={{ left: "30%" }}
                         top={props.top}
                         rotate={props.rotate ? true : undefined}
                    >
                         {props.LeftIcon}
                    </StyledIconState>
                    <StyledIconState
                         style={{ left: "72.5%" }}
                         top={props.top}
                         rotate={props.rotate ? true : undefined}
                    >
                         {props.rightIcon}
                    </StyledIconState>
               </StyledDivToggle>
          </StyledLabel>
     );
};

export default Checkbox;
