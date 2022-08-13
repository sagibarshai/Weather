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

type Props = {
     setOpenSearchBoxMobile: (x: boolean) => void;
};

const FooterMobile: React.FC<Props> = (props) => {
     return (
          <StyledFooterContainer>
               <StyledButtonFooter>
                    <StyledLink to="/favorite">
                         <StyledIcon>
                              <IconFavorite />
                         </StyledIcon>
                    </StyledLink>
                    <StyledText>Favorites</StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter
                    onClick={() => props.setOpenSearchBoxMobile(true)}
               >
                    <StyledIcon>
                         <IconSearch />
                    </StyledIcon>
                    <StyledText>Search</StyledText>
               </StyledButtonFooter>
               <StyledButtonFooter>
                    <StyledLink to="/home">
                         <StyledIcon>
                              <IconHome />
                         </StyledIcon>
                    </StyledLink>
                    <StyledText>Home</StyledText>
               </StyledButtonFooter>
          </StyledFooterContainer>
     );
};

export default FooterMobile;
