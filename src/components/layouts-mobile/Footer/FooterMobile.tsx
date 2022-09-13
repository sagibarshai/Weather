import { useSelector } from "react-redux";

import { StyledIcon } from "../../../shared/Icons/Icon";

import themes from "../../../shared/themes/themes";

import { ReactComponent as IconFavorite } from "../../../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconFavoriteFull } from "../../../shared/svg/fav-full.svg";
import { ReactComponent as IconSearch } from "../../../shared/svg/search-white.svg";
import { ReactComponent as IconHome } from "../../../shared/svg/home-outline.svg";
import { ReactComponent as IconHomeFull } from "../../../shared/svg/home-full.svg";
import { ReactComponent as IconFavoriteOutline } from "../../../shared/svg/fav-outline.svg";
import { ReactComponent as IconSearchOutline } from "../../../shared/svg/search-dark.svg";
import { ReactComponent as IconHomeOutline } from "../../../shared/svg/home-outline-dark.svg";

import {
     StyledFooterContainer,
     StyledButtonFooter,
     StyledLink,
     StyledText,
} from "./style";

import { StoreState } from "../../../redux/store";
import { Props } from "./types";

const FooterMobile: React.FC<Props> = (props) => {
     const mapIsOpen = useSelector(
          (state: StoreState) => state.headerSlice.openMap
     );
     return (
          <StyledFooterContainer
               backgroundColor={
                    mapIsOpen ? themes.white : `rgba(255, 255, 255, 0.3)`
               }
          >
               <StyledButtonFooter
                    borderColor={mapIsOpen ? themes.secondary : themes.white}
               >
                    <StyledLink to="/favorites">
                         <StyledIcon>
                              {mapIsOpen ? (
                                   <IconFavoriteOutline />
                              ) : location.pathname === "/favorites" ? (
                                   <IconFavoriteFull />
                              ) : (
                                   <IconFavorite />
                              )}
                         </StyledIcon>
                    </StyledLink>
                    <StyledText
                         color={
                              mapIsOpen
                                   ? `${themes.secondary}`
                                   : `${themes.white}`
                         }
                    >
                         Favorites
                    </StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter
                    borderColor={mapIsOpen ? themes.secondary : themes.white}
                    onClick={() => props.setOpenSearchBoxMobile(true)}
               >
                    <StyledIcon>
                         {mapIsOpen ? <IconSearchOutline /> : <IconSearch />}{" "}
                    </StyledIcon>
                    <StyledText
                         color={
                              mapIsOpen
                                   ? `${themes.secondary}`
                                   : `${themes.white}`
                         }
                    >
                         Search
                    </StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter
                    borderColor={mapIsOpen ? themes.secondary : themes.white}
               >
                    <StyledLink to="/home">
                         <StyledIcon>
                              {mapIsOpen ? (
                                   <IconHomeOutline />
                              ) : location.pathname === "/home" ? (
                                   <IconHomeFull />
                              ) : (
                                   <IconHome />
                              )}{" "}
                         </StyledIcon>
                    </StyledLink>
                    <StyledText
                         color={
                              mapIsOpen
                                   ? `${themes.secondary}`
                                   : `${themes.white}`
                         }
                    >
                         Home
                    </StyledText>
               </StyledButtonFooter>
          </StyledFooterContainer>
     );
};

export default FooterMobile;
