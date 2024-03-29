import { useDispatch, useSelector } from "react-redux";

import { StyledButton } from "../../../shared/UIElements/Button/Button";
import { StyledIcon } from "../../../shared/Icons/Icon";
import Checkbox from "../../../shared/UIElements/Inputs/Checkbox/Checkbox";
import themes from "../../../shared/themes/themes";

import {
     toggleBackground,
     toggleDegress,
     toggleMobileMenu,
     togglePopup,
} from "../../../redux/headerSlice";

import { ReactComponent as IconMenu } from "../../../shared/svg/menu.svg";
import { ReactComponent as IconMoonDark } from "../../../shared/svg/moon-dark.svg";
import { ReactComponent as IconSunDark } from "../../../shared/svg/sun-dark.svg";
import { ReactComponent as IconLogoutOutline } from "../../../shared/svg/log-out-outline.svg";

import {
     StyledMenuButton,
     StyledMobileMenuContainer,
     StyledMenu,
     StyledTitle,
     StyledRowFlexContainer,
     StyledColumnContainer,
     StyledSubtitle,
} from "./style";

import { StoreState } from "../../../redux/store";
import { Props } from "./types";

const MobileHeader: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     return (
          <>
               <StyledMobileMenuContainer
                    display={props.display ? "true" : undefined}
               >
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
     const degressType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );
     const renderPraimaryBg = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: StoreState) => state.headerSlice.openMobileMenu
     );
     const dispatch = useDispatch();
     return (
          <StyledMenu display={openMobileMenu ? "true" : undefined}>
               <StyledTitle>Menu</StyledTitle>
               <StyledRowFlexContainer>
                    <StyledColumnContainer>
                         <StyledSubtitle>Change mode</StyledSubtitle>
                         <Checkbox
                              onClick={() => dispatch(toggleBackground())}
                              variant="checkbox"
                              LeftIcon={<IconSunDark />}
                              rightIcon={<IconMoonDark />}
                              top="38.5%"
                              rotate={"true"}
                              id="mobileTheme"
                              checked={!renderPraimaryBg}
                         ></Checkbox>
                    </StyledColumnContainer>
                    <StyledColumnContainer>
                         <StyledSubtitle>Change degrees</StyledSubtitle>
                         <Checkbox
                              onClick={() => dispatch(toggleDegress())}
                              variant="checkbox"
                              LeftIcon="C°"
                              rightIcon="F°"
                              top="55%"
                              id="mobileDegressType"
                              checked={degressType === "F"}
                         ></Checkbox>
                    </StyledColumnContainer>
               </StyledRowFlexContainer>
               <StyledButton
                    margin="122px auto 40px auto"
                    variant="linkWithImg"
                    color={themes.secondary}
                    onClick={() => {
                         dispatch(togglePopup({ popupType: "logout" }));
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
