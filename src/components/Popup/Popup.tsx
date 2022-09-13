import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { StyledButton } from "../../shared/UIElements/Button/Button";
import { StyledIcon } from "../../shared/Icons/Icon";

import { ReactComponent as IconXButton } from "../../shared/svg/close-circle.svg";

import { togglePopup } from "../../redux/headerSlice";

import {
     StyledFlexDiv,
     StyledParagraph,
     StyledPopupContainer,
     StyledTitle,
     StyledXButton,
} from "./style";

import { Props } from "./types";

const Popup: React.FC<Props> = (props) => {
     const queryClient = new useQueryClient();
     const dispatch = useDispatch();

     const togglePopupFunc = () => {
          if (props.popupType) {
               const payload = { popupType: props.popupType };
               return dispatch(togglePopup(payload));
          }
          return dispatch(togglePopup({ popupType: "logout" }));
     };

     return (
          <StyledPopupContainer>
               <StyledTitle>{props.title}</StyledTitle>
               <StyledXButton
                    onClick={() => {
                         togglePopupFunc();
                         props.cancelFunction && props.cancelFunction();
                    }}
               >
                    <StyledIcon>
                         <IconXButton />
                    </StyledIcon>
               </StyledXButton>
               <StyledParagraph>{props.message}</StyledParagraph>
               <StyledFlexDiv>
                    <StyledButton
                         variant="linkWithImg"
                         onClick={() => {
                              togglePopupFunc();
                              props.cancelFunction && props.cancelFunction();
                         }}
                    >
                         {props.cancelMessage}
                    </StyledButton>
                    <StyledButton
                         variant="default"
                         width="145px"
                         height="54px"
                         onClick={() => {
                              togglePopupFunc();
                              if (props.callback) {
                                   props.callback();
                                   queryClient.invalidateQueries("favorites");
                              }
                         }}
                    >
                         {props.continueButtonText}
                    </StyledButton>
               </StyledFlexDiv>
          </StyledPopupContainer>
     );
};
export default Popup;
