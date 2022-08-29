import {
     StyledFooterContainer,
     StyledButtonFooter,
     StyledLink,
     StyledText,
} from "./styles/StyledFooterMobile";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconFavorite } from "../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconSearch } from "../shared/svg/search-white.svg";
import { ReactComponent as IconHome } from "../shared/svg/home-outline.svg";
import { ReactComponent as IconFavoriteOutline } from "../shared/svg/fav-outline.svg";
import { ReactComponent as IconSearchOutline } from "../shared/svg/search-dark.svg";
import { ReactComponent as IconHomeOutline } from "../shared/svg/home-outline-dark.svg";
import themes from "../shared/themes/themes";

type Props = {
     setOpenSearchBoxMobile: (x: boolean) => void;
     showOnMap: boolean;
};

const FooterMobile: React.FC<Props> = (props) => {
     return (
          <StyledFooterContainer>
               <StyledButtonFooter>
                    <StyledLink to="/favorites">
                         <StyledIcon>
                              {props.showOnMap ? (
                                   <IconFavoriteOutline />
                              ) : (
                                   <IconFavorite />
                              )}
                         </StyledIcon>
                    </StyledLink>
                    <StyledText
                         color={
                              props.showOnMap
                                   ? `${themes.secondary}`
                                   : `${themes.white}`
                         }
                    >
                         Favorites
                    </StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter
                    onClick={() => props.setOpenSearchBoxMobile(true)}
               >
                    <StyledIcon>
                         {props.showOnMap ? (
                              <IconSearchOutline />
                         ) : (
                              <IconSearch />
                         )}{" "}
                    </StyledIcon>
                    <StyledText
                         color={
                              props.showOnMap
                                   ? `${themes.secondary}`
                                   : `${themes.white}`
                         }
                    >
                         Search
                    </StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter>
                    <StyledLink to="/home">
                         <StyledIcon>
                              {props.showOnMap ? (
                                   <IconHomeOutline />
                              ) : (
                                   <IconHome />
                              )}{" "}
                         </StyledIcon>
                    </StyledLink>
                    <StyledText
                         color={
                              props.showOnMap
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
