import { useEffect, useState } from "react";
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
} from "./styles/StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu, togglePopup } from "../redux/headerSlice";
import Header from "../components/Header";
import Popup from "../components/Popup";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLocation } from "../shared/svg/location.svg";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { ReactComponent as IconApp } from "../shared/svg/logo-large.svg";
import { StyledButton } from "../shared/UIElements/Button/Button";
import themes from "../shared/themes/themes";
import SearchBox from "../components/SearchBox";
import SearchBoxMobile from "../components/SearchBoxMobile";
import { useScreenWidth } from "../shared/utils/getScreenWidth";
import HomePageDisplayCity from "../components/HomePageDisplayCity";
import { Result } from "../components/SearchBox";
import { logout } from "../redux/authSlice";
import { useLocation } from "react-router-dom";
const Home = () => {
     const location = useLocation() as any;
     const deviceValue = useScreenWidth()[0];
     const [searchResults, setSearchResults] = useState<[] | Result[]>([]);

     const [selectedCityKey, setSelectedCityKey] = useState<
          string | number | null
     >(null);
     const [selectedCityDataFromFavorites, setSelectedCityDataFromFavorites] =
          useState<Result | null>(null);
     const [renderMobile, setRenderMobile] = useState<boolean>(true);
     const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
          useState<boolean>(true);
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [searchInput, setSearchInput] = useState<string>("");
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(false);
     const [openSearchBoxMobile, setOpenSearchBoxMobile] =
          useState<boolean>(false);
     const dispatch = useDispatch();
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: RootState) => state.headerSlice.openMobileMenu
     );
     const openPopup = useSelector(
          (state: RootState) => state.headerSlice.openPopup
     );
     useEffect(() => {
          if (deviceValue === "bigDesktop" || deviceValue === "laptop") {
               setRenderLaptopAnDesktop(true);
               setRenderMobile(false);
          } else {
               setRenderLaptopAnDesktop(false);
               setRenderMobile(true);
          }
     }, [deviceValue]);
     useEffect(() => {
          if (location.state) {
               setSelectedCityKey(location.state.selectedCityData.key);
               setSelectedCityDataFromFavorites(
                    location.state.selectedCityData
               );
          }
     }, [location]);
     const onClickHandler = () => {
          if (openPopup) dispatch(togglePopup());
          if (openMobileMenu) dispatch(closeMobileMenu());
          if (noResultAndEnter) setNoResultAndEnter(false);
          if (openSearchBoxMobile) setOpenSearchBoxMobile(false);
     };

     if (locationIsOpen)
          return (
               <>
                    {renderLaptopAnDesktop && (
                         <Header
                              searchResults={searchResults}
                              setSearchResults={setSearchResults}
                              searchInput={searchInput}
                              setSearchInput={setSearchInput}
                              setNoResultAndEnter={setNoResultAndEnter}
                              noResultAndEnter={noResultAndEnter}
                              setSelectedCityKey={setSelectedCityKey}
                         />
                    )}
                    {renderMobile && <MobileHeader />}
                    <StyledPageContainer
                         onClick={onClickHandler}
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         openPopup={openPopup}
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
                    <SearchBox />
                    <MobileMenuBottom />
                    <FooterMobile
                         setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    />
               </>
          );

     if (noResultAndEnter)
          return (
               <>
                    {renderLaptopAnDesktop && (
                         <Header
                              searchResults={searchResults}
                              setSearchResults={setSearchResults}
                              setSelectedCityKey={setSelectedCityKey}
                              searchInput={searchInput}
                              setSearchInput={setSearchInput}
                              setNoResultAndEnter={setNoResultAndEnter}
                              noResultAndEnter={noResultAndEnter}
                         />
                    )}

                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openPopup={openPopup}
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
               {renderLaptopAnDesktop && (
                    <Header
                         searchResults={searchResults}
                         setSearchResults={setSearchResults}
                         setSelectedCityKey={setSelectedCityKey}
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                    />
               )}
               {renderMobile && <MobileHeader display={!openSearchBoxMobile} />}

               <StyledPageContainer
                    openMobileMenu={openMobileMenu}
                    renderPraimaryBackground={renderPraimaryBackground}
                    onClick={onClickHandler}
                    openPopup={openPopup}
               >
                    <HomePageDisplayCity
                         renderMobile={renderMobile}
                         renderLaptopAnDesktop={renderLaptopAnDesktop}
                         searchResults={searchResults}
                         selectedCityKey={selectedCityKey}
                         selectedCityDataFromFavorites={
                              selectedCityDataFromFavorites
                         }
                    />
               </StyledPageContainer>
               {openPopup && (
                    <Popup
                         message="You about to log out from WeatherApp.
                                   Are you sure you want to log out?"
                         cancelMessage="I want to stay"
                         continueButtonText="Yes, log out"
                         title="Log Out"
                         callback={() => dispatch(logout())}
                    />
               )}
               <MobileMenuBottom />
               {openSearchBoxMobile && (
                    <SearchBoxMobile
                         setSearchResults={setSearchResults}
                         searchResults={searchResults}
                         setSelectedCityKey={setSelectedCityKey}
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    />
               )}
               <FooterMobile setOpenSearchBoxMobile={setOpenSearchBoxMobile} />
          </>
     );
};

export default Home;
