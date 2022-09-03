import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
     StyledPageContainer,
     StyledLocationTitle,
     StyledLocationDiv,
     StyledLocationParagraph,
     StyledNotFoundCityDiv,
     StyledTextNotFoundCity,
} from "./styles/StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu, toggleMap, togglePopup } from "../redux/headerSlice";
import Popup from "../components/Popup";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLocation } from "../shared/svg/location.svg";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { ReactComponent as IconLayout } from "../shared/svg/layout.svg";
import { ReactComponent as IconApp } from "../shared/svg/logo-large.svg";
import { StyledButton } from "../shared/UIElements/Button/Button";
import themes from "../shared/themes/themes";
import HomePageDisplayCity from "../components/HomePageDisplayCity";
import { CityObj, Result } from "../components/SearchBox";
import { logout } from "../redux/authSlice";
import { useLocation } from "react-router-dom";
import DisplayMap, { Coords } from "../components/Map";
export type SharedPageProps = {
     pageProps: {
          coords: Coords;
          existingCity: CityObj | null;
          renderMobile?: boolean;
          renderLaptopAnDesktop?: boolean;
          selectedCityDataFromFavorites: CityObj | null;
          setSelectedCityDataFromFavorites: (x: CityObj) => void;
          setOpenSearchBoxMobile: (x: boolean) => void;
          openSearchBoxMobile?: boolean;
          setExistingCity: (x: null | CityObj) => void;
          notFoundCityName?: string;
          setNoResultAndEnter: (x: boolean) => void;
          noResultAndEnter: boolean;
          setCurrentPage: (x: string) => void;
     };
};
const Home: React.FC<SharedPageProps> = ({ pageProps }) => {
     const location = useLocation() as any;
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(
          localStorage.getItem("coords") ? true : false
     );
     const [selectedCityDataFromMap, setSelectedCityDataFromMap] =
          useState<CityObj | null>(null);
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
     const openMap = useSelector(
          (state: RootState) => state.headerSlice.openMap
     );
     useEffect(() => {
          if (location.state) {
               if (location.state.noResultAndEnter) {
                    pageProps.setNoResultAndEnter(
                         location.state.noResultAndEnter
                    );
               }
               if (location.state.selectedCityData) {
                    pageProps.setSelectedCityDataFromFavorites(
                         location.state.selectedCityData
                    );
               }
          }
     }, [location]);
     useEffect(() => {
          selectedCityDataFromMap &&
               pageProps.setExistingCity(selectedCityDataFromMap);
     }, [selectedCityDataFromMap]);
     const onClickHandler = () => {
          if (openPopup) dispatch(togglePopup());
          if (openMobileMenu) dispatch(closeMobileMenu());
          if (pageProps.noResultAndEnter) pageProps.setNoResultAndEnter(false);
          if (pageProps.openSearchBoxMobile)
               pageProps.setOpenSearchBoxMobile(false);
     };
     if (openMap)
          return (
               <>
                    <StyledPageContainer
                         onClick={onClickHandler}
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         openPopup={openPopup}
                    >
                         <DisplayMap
                              coords={pageProps.coords}
                              setSelectedCityDataFromMap={
                                   setSelectedCityDataFromMap
                              }
                         />
                    </StyledPageContainer>
               </>
          );
     if (!locationIsOpen)
          return (
               <>
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
               </>
          );
     if (pageProps.noResultAndEnter)
          return (
               <>
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
                                   {pageProps.notFoundCityName}", <br />
                                   please try again.
                              </StyledTextNotFoundCity>
                         </StyledNotFoundCityDiv>
                    </StyledPageContainer>
               </>
          );
     return (
          <>
               <StyledPageContainer
                    openMobileMenu={openMobileMenu}
                    renderPraimaryBackground={renderPraimaryBackground}
                    onClick={onClickHandler}
                    openPopup={openPopup}
               >
                    <HomePageDisplayCity
                         selectedCityDataFromMap={selectedCityDataFromMap}
                         existingCity={pageProps.existingCity}
                         renderMobile={pageProps.renderMobile}
                         renderLaptopAnDesktop={pageProps.renderLaptopAnDesktop}
                         selectedCityDataFromFavorites={
                              pageProps.selectedCityDataFromFavorites
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
          </>
     );
};

export default Home;
