import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../shared/UIElements/Inputs/Input";
import { StyledHeader, StyledDiv } from "./StyledHeader";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLogo } from "../shared/svg/logo.svg";
import { ReactComponent as IconHomeFull } from "../shared/svg/home-full.svg";
import { ReactComponent as IconFavoriteOutline } from "../shared/svg/fav-outline.svg";
import { ReactComponent as IconSearchDark } from "../shared/svg/search-dark.svg";
const Header = () => {
     return (
          <StyledHeader>
               <StyledIcon>
                    <IconLogo />
               </StyledIcon>
               <StyledDiv>
                    <NavLink to="/home">
                         <StyledIcon>
                              <IconHomeFull />
                         </StyledIcon>
                         Home
                    </NavLink>
                    <NavLink to="/favorite">
                         <StyledIcon>
                              <IconFavoriteOutline />
                         </StyledIcon>
                         Favorite
                    </NavLink>
               </StyledDiv>
               <Input
                    variant="active"
                    width="324px"
                    height="22px"
                    placeHolder="hello"
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
          </StyledHeader>
     );
};

export default Header;
