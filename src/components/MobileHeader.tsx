import React from "react";
import Checkbox from "../shared/UIElements/Inputs/Checkbox";
import {
     StyledMenuButton,
     StyledMobileMenuContainer,
     StyledMenu,
     StyledTitle,
     StyledRowFlexContainer,
     StyledColumnContainer,
     StyledSubtitle,
} from "./styles/StyledMobileHeader";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconMenu } from "../shared/svg/menu.svg";
import { ReactComponent as IconMoonDark } from "../shared/svg/moon-dark.svg";
import { ReactComponent as IconSunDark } from "../shared/svg/sun-dark.svg";
import { ReactComponent as IconLogoutOutline } from "../shared/svg/log-out-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
     toggleBackground,
     toggleDegress,
     toggleMobileMenu,
     toggleLogoutPopup,
} from "../redux/headerSlice";
import themes from "../shared/themes/themes";

type Props = {
     display?: boolean;
};
const MobileHeader: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     return (
          <>
               <StyledMobileMenuContainer display={props.display}>
                    <StyledMenuButton
                         onClick={() => dispatch(toggleMobileMenu())}
                    >
                         <StyledIcon>
                              <IconMenu />
                         </StyledIcon>
                    </StyledMenuButton>
               </StyledMobileMenuContainer>
          </>
     );
};
export default MobileHeader;

export const MobileMenuBottom = () => {
     const openMobileMenu = useSelector(
          (state: RootState) => state.headerSlice.openMobileMenu
     );
     const dispatch = useDispatch();
     return (
          <StyledMenu display={openMobileMenu}>
               <StyledTitle>Menu</StyledTitle>
               <StyledRowFlexContainer>
                    <StyledColumnContainer>
                         <StyledSubtitle>Change mode</StyledSubtitle>
                         <Checkbox
                              onClick={() => dispatch(toggleBackground())}
                              variant="checkbox"
                              LeftIcon={<IconMoonDark />}
                              rightIcon={<IconSunDark />}
                              top="37.5%"
                              rotate={true}
                              id="mobileMood"
                         ></Checkbox>
                    </StyledColumnContainer>
                    <StyledColumnContainer>
                         <StyledSubtitle>Change degrees</StyledSubtitle>
                         <Checkbox
                              onClick={() => dispatch(toggleDegress())}
                              variant="checkbox"
                              LeftIcon="F°"
                              rightIcon="C°"
                              top="55%"
                              id="mobileMood"
                         ></Checkbox>
                    </StyledColumnContainer>
               </StyledRowFlexContainer>
               <StyledButton
                    margin="122px auto 40px auto"
                    variant="linkWithImg"
                    color={themes.secondary}
                    onClick={() => {
                         dispatch(toggleLogoutPopup());
                         dispatch(toggleMobileMenu());
                    }}
               >
                    <StyledIcon width="30px" height="30px" marginRight="8px">
                         <IconLogoutOutline
                              style={{ verticalAlign: "middle" }}
                         />
                    </StyledIcon>
                    Logout
               </StyledButton>
          </StyledMenu>
     );
};
