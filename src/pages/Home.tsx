import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MobileHeader, { MobileMenuBottom } from "../components/MobileHeader";
import FooterMobile from "../components/FooterMobile";
import {
     StyledPageContainer,
     StyledLocationTitle,
     StyledLocationDiv,
     StyledLocationParagraph,
     StyledNotFoundCityDiv,
     StyledTextNotFoundCity,
} from "./StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu, toggleLogoutPopup } from "../redux/headerSlice";
import Header from "../components/Header";
import Popup from "../components/Popup";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLocation } from "../shared/svg/location.svg";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { ReactComponent as IconApp } from "../shared/svg/logo-large.svg";
import { StyledButton } from "../shared/UIElements/Button/Button";
import themes from "../shared/themes/themes";

const Home: React.FC = () => {
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [searchInput, setSearchInput] = useState<string>("");
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(true);
     const [openSearchBoxMobile, setOpenSearchBoxMobile] =
          useState<boolean>(false);
     const dispatch = useDispatch();
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: RootState) => state.headerSlice.openMobileMenu
     );
     const openLogoutPopup = useSelector(
          (state: RootState) => state.headerSlice.openLogoutPopup
     );

     const onClickHandler = () => {
          if (openLogoutPopup) dispatch(toggleLogoutPopup());
          if (openMobileMenu) dispatch(closeMobileMenu());
          if (noResultAndEnter) setNoResultAndEnter(false);
     };

     if (locationIsOpen)
          return (
               <>
                    <Header
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                    />
                    <MobileHeader />
                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openLogoutPopup={openLogoutPopup}
                    >
                         <StyledLocationDiv>
                              <StyledIcon displayOnlyOnMobile={true}>
                                   <IconApp />
                              </StyledIcon>
                              <StyledIcon displayMobile={false}>
                                   <IconLocation />
                              </StyledIcon>
                              <StyledLocationTitle>
                                   Set up location
                              </StyledLocationTitle>
                              <StyledLocationParagraph>
                                   To identify your location please allow
                                   WeatherApp to know your location.
                              </StyledLocationParagraph>
                              <StyledButton
                                   variant="white"
                                   color={themes.black}
                                   mobileWidth="63.7vw"
                                   height="54px"
                                   margin="0 0 16px 0"
                                   fontWeight="bold"
                                   displayOnlyOnMobile={true}
                              >
                                   Open location service
                              </StyledButton>
                              <StyledButton
                                   variant="ghost"
                                   color={themes.white}
                                   mobileWidth="63.7vw"
                                   height="54px"
                                   displayOnlyOnMobile={true}
                              >
                                   Search city
                              </StyledButton>
                         </StyledLocationDiv>
                    </StyledPageContainer>
                    {openLogoutPopup && <Popup />}
                    <MobileMenuBottom />
                    <FooterMobile
                         setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    />
               </>
          );

     if (noResultAndEnter)
          return (
               <>
                    <Header
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                    />
                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openLogoutPopup={openLogoutPopup}
                    >
                         <StyledNotFoundCityDiv>
                              <StyledIcon>
                                   <IconCity />
                              </StyledIcon>
                              <StyledTextNotFoundCity>
                                   We couldn’t find any city named "
                                   {searchInput}", <br />
                                   please try again.
                              </StyledTextNotFoundCity>
                         </StyledNotFoundCityDiv>
                    </StyledPageContainer>
               </>
          );

     return (
          <>
               <Header
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    setNoResultAndEnter={setNoResultAndEnter}
                    noResultAndEnter={noResultAndEnter}
               />
               <StyledPageContainer
                    openMobileMenu={openMobileMenu}
                    renderPraimaryBackground={renderPraimaryBackground}
                    onClick={onClickHandler}
                    openLogoutPopup={openLogoutPopup}
               ></StyledPageContainer>
               {openLogoutPopup && <Popup />}
               <MobileMenuBottom />
          </>
     );
};

export default Home;
