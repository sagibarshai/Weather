import styled from "styled-components";
import { StyledIcon } from "../../shared/Icons/Icon";
import themes from "../../shared/themes/themes";
import { ReactComponent as IconXButton } from "../../shared/svg/close-circle.svg";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import { togglePopup } from "../../redux/headerSlice";
import { useDispatch } from "react-redux";
import { Props } from "./types";
import {
     StyledFlexDiv,
     StyledParagraph,
     StyledPopupContainer,
     StyledTitle,
     StyledXButton,
} from "./style";
import { useQueryClient } from "react-query";

const Popup: React.FC<Props> = (props) => {
     const queryClient = new useQueryClient();
     const dispatch = useDispatch();
     return (
          <StyledPopupContainer>
               <StyledTitle>{props.title}</StyledTitle>
               <StyledXButton
                    onClick={() => {
                         dispatch(togglePopup());
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
                              dispatch(togglePopup());
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
                              dispatch(togglePopup());
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
