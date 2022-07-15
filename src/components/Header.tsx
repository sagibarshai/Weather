import { useState } from "react";
import { NavLink } from "react-router-dom";
import themes from "../shared/themes/themes";
import Input from "../shared/UIElements/Inputs/Input";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledHeader, StyledDiv, StyledDecloration } from "./StyledHeader";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLogo } from "../shared/svg/logo.svg";
import { ReactComponent as IconSearchDark } from "../shared/svg/search-dark.svg";
import { ReactComponent as IconMap } from "../shared/svg/map.svg";
import { ReactComponent as IconMoonDark } from "../shared/svg/moon-dark.svg";
import { ReactComponent as IconSunDark } from "../shared/svg/sun-dark.svg";
import { ReactComponent as IconLogout } from "../shared/svg/log-out.svg";
import Checkbox from "../shared/UIElements/Inputs/Checkbox";
import NavLinkActiveStyle from "../shared/navLinks/NavLinkActiveStyle";
import links, { Links } from "../shared/links/links";
import { CSSProperties } from "styled-components";
import { toggleBackground, toggleDegress } from "../redux/headerSlice";
import { useDispatch } from "react-redux";
const Header = () => {
     const [activeIcon, setActiveIcon] = useState<JSX.Element>();
     const [activeIconId, setActiveIconId] = useState<string>();
     const dispatch = useDispatch();
     const NavLinkStyleHandler = (isActive: boolean, link: Links) => {
          if (isActive) {
               return NavLinkActiveStyle;
          }
          return;
     };

     return (
          <StyledHeader>
               <StyledDiv marginLeft="70px">
                    <StyledIcon width="auto" height="142px">
                         <IconLogo />
                    </StyledIcon>
               </StyledDiv>
               <StyledDiv gap="63px" marginLeft="190px">
                    {links.map((link) => {
                         return (
                              <NavLink
                                   key={link.to}
                                   to={link.to}
                                   style={({ isActive }) => {
                                        return NavLinkStyleHandler(
                                             isActive,
                                             link
                                        ) as CSSProperties;
                                   }}
                                   onClick={() => {
                                        setActiveIconId(link.to);
                                        setActiveIcon(link.activeIcon);
                                   }}
                              >
                                   <StyledButton
                                        textUnderline="none"
                                        variant="linkWithImg"
                                        color={themes.white}
                                   >
                                        <StyledIcon>
                                             {activeIconId === link.to
                                                  ? activeIcon
                                                  : link.defaultIcon}
                                        </StyledIcon>
                                        {link.name}
                                   </StyledButton>
                                   <StyledDecloration />
                              </NavLink>
                         );
                    })}
               </StyledDiv>
               <StyledDiv marginLeft="139px">
                    <Input
                         variant="active"
                         width="324px"
                         height="22px"
                         placeHolder="Try “Tel Aviv - Jaffa”..."
                    >
                         <StyledIcon
                              position="absolute"
                              top="12px"
                              right="30px"
                              transform="translateY(-50% , -50%)"
                         >
                              <IconSearchDark />
                         </StyledIcon>
                    </Input>
               </StyledDiv>
               <StyledDiv marginLeft="124px">
                    <StyledButton variant="linkWithImg" color={themes.white}>
                         <StyledIcon width="30px" height="30px">
                              <IconMap />
                         </StyledIcon>
                         Switch to map
                    </StyledButton>
               </StyledDiv>
               <StyledDiv gap="38px" marginLeft="85px">
                    <Checkbox
                         htmlFor="degrees"
                         id="degrees"
                         variant="checkbox"
                         LeftIcon="C°"
                         rightIcon="F°"
                    />
                    <Checkbox
                         onClick={() => dispatch(toggleBackground())}
                         htmlFor="mood"
                         id="mood"
                         variant="checkbox"
                         LeftIcon={<IconSunDark />}
                         rightIcon={<IconMoonDark />}
                    />
               </StyledDiv>
               <StyledDiv marginLeft="72px" marginRight="70px">
                    <StyledButton variant="linkWithImg" color={themes.white}>
                         <StyledIcon width="30px" height="30px">
                              <IconLogout />
                         </StyledIcon>
                         Logout
                    </StyledButton>
               </StyledDiv>
          </StyledHeader>
     );
};

export default Header;
