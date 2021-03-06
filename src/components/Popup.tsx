import styled from "styled-components";
import { StyledIcon } from "../shared/Icons/Icon";
import themes from "../shared/themes/themes";
import { ReactComponent as IconXButton } from "../shared/svg/close-circle.svg";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { toggleLogoutPopup } from "../redux/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
type Props = {
     width?: string;
     height?: string;
     marginTop?: string;
     gap?: string;
};

const StyledPopupContainer = styled.div<Props>`
     width: ${(props) => props.width || "422px"};
     height: ${(props) => props.height || "228px"};
     padding: 32px 32px 48px 48px;
     box-shadow: 0 4px 80px 0 rgba(0, 0, 0, 0.16);
     background-color: ${themes.white};
     font-family: inherit;
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     border-radius: 30px;
     z-index: 1;
     @media ${cssBreakPoints.mobile} {
          width: 334px;
          height: 270px;
          top: 100%;
          transform: translate(-50%, -90%);
     }
`;

const StyledTitle = styled.h4`
     padding: 0;
     margin: 0;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.secondary};
`;

const StyledXButton = styled.button`
     width: 24px;
     height: 24px;
     position: absolute;
     top: 32px;
     right: 24px;
     transform: translate(-50%, -50%);
     border: none;
     background-color: transparent;
     cursor: pointer;
`;

const StyledParagraph = styled.p<Props>`
     font-size: 1.8rem;
     line-height: 1.5;
     color: ${themes.secondary};
     margin-top: ${(props) => props.marginTop || "16px"};
     width: 342px;
     height: 54px;
`;
const StyledFlexDiv = styled.div<Props>`
     display: flex;
     justify-content: flex-end;
     gap: ${(props) => props.gap || "24px"};
     margin-top: 48px;
     align-items: center;
`;

const Popup: React.FC<Props> = (props) => {
     const openLogoutPopup = useSelector(
          (state: RootState) => state.headerSlice.openLogoutPopup
     );
     const dispatch = useDispatch();
     return (
          <StyledPopupContainer>
               <StyledTitle>Log Out</StyledTitle>
               <StyledXButton onClick={() => dispatch(toggleLogoutPopup())}>
                    <StyledIcon>
                         <IconXButton />
                    </StyledIcon>
               </StyledXButton>
               <StyledParagraph>
                    You about to log out from WeatherApp. Are you sure you want
                    to log out?
               </StyledParagraph>
               <StyledFlexDiv>
                    <StyledButton
                         variant="linkWithImg"
                         onClick={() => dispatch(toggleLogoutPopup())}
                    >
                         I want to stay
                    </StyledButton>
                    <StyledButton variant="default" width="145px" height="54px">
                         Yes log out
                    </StyledButton>
               </StyledFlexDiv>
          </StyledPopupContainer>
     );
};
export default Popup;
