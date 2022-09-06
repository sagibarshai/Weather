import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as IconLocation } from "../../shared/svg/location.svg";
import { ReactComponent as IconCity } from "../../shared/svg/city.svg";
import { ReactComponent as IconApp } from "../../shared/svg/logo-large.svg";

import { StoreState } from "../../redux/store";
import { closeMobileMenu, togglePopup } from "../../redux/headerSlice";
import Popup from "../../components/Popup/Popup";
import { StyledIcon } from "../../shared/Icons/Icon";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import themes from "../../shared/themes/themes";
import HomePageDisplayCity from "../../components/HomePageDisplayCity/HomePageDisplayCity";
import { logout } from "../../redux/authSlice";
import { useLocation } from "react-router-dom";
import DisplayMap from "../../components/Map/Map";
import { SharedPageProps } from "../SharedTemplate/types";

import { CityObj, SearchResult } from "../../components/SearchBox/types";

import {
     StyledPageContainer,
     StyledLocationTitle,
     StyledLocationDiv,
     StyledLocationParagraph,
     StyledNotFoundCityDiv,
     StyledTextNotFoundCity,
} from "./style";
import { useMutation } from "react-query";
import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";
const Home: React.FC<SharedPageProps> = ({ pageProps }) => {
     const location = useLocation() as any;

     const [selectedCityDataFromMap, setSelectedCityDataFromMap] =
          useState<CityObj | null>(null);

     const dispatch = useDispatch();
     const renderPraimaryBackground = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: StoreState) => state.headerSlice.openMobileMenu
     );
     const openPopup = useSelector(
          (state: StoreState) => state.headerSlice.openPopup
     );
     const openMap = useSelector(
          (state: StoreState) => state.headerSlice.openMap
     );
     const { mutate } = useMutation(searchCityByCoords, {
          onSuccess: (data: SearchResult) => {
               console.log(data);
               pageProps.setExistingCity({ ...data, key: data?.Key });
          },
          onError: (err: any) => {},
          staleTime: 1000 * 60 * 60,
          cacheTime: 1000 * 60 * 60,
     });
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
     useEffect(() => {
          if (!pageProps.existingCity && pageProps.coords) {
               mutate(pageProps.coords);
               console.log("happend");
          }
     }, [location, pageProps.coords]);
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
     else if (pageProps.noResultAndEnter)
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
     else if (pageProps.existingCity) {
          return (
               <>
                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openPopup={openPopup}
                    >
                         <HomePageDisplayCity
                              setCoords={pageProps.setCoords}
                              setLocationIsOpen={pageProps.setLocationIsOpen}
                              selectedCityDataFromMap={selectedCityDataFromMap}
                              existingCity={pageProps.existingCity}
                              renderMobile={pageProps.renderMobile}
                              renderLaptopAnDesktop={
                                   pageProps.renderLaptopAnDesktop
                              }
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
     } else if (!pageProps.locationIsOpen)
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
                                   onClick={() => {
                                        pageProps.renderMobile &&
                                             navigator.geolocation.getCurrentPosition(
                                                  (position) => {
                                                       localStorage.setItem(
                                                            "coords",
                                                            JSON.stringify({
                                                                 lat: position
                                                                      .coords
                                                                      .latitude,
                                                                 lng: position
                                                                      .coords
                                                                      .longitude,
                                                            })
                                                       );
                                                       pageProps.setLocationIsOpen(
                                                            true
                                                       );
                                                       pageProps.setCoords({
                                                            lat: position.coords
                                                                 .latitude,
                                                            lng: position.coords
                                                                 .longitude,
                                                       });
                                                  },
                                                  () => {
                                                       pageProps.setLocationIsOpen(
                                                            false
                                                       );
                                                       throw new Error(
                                                            `cannot accses location,please gt to setting and enabled to sefari your location.. `
                                                       );
                                                  }
                                             );
                                   }}
                              >
                                   Open location service
                              </StyledButton>
                              <StyledButton
                                   variant="ghost"
                                   color={themes.white}
                                   mobileWidth="63.7vw"
                                   height="54px"
                                   displayOnlyOnMobile={true}
                                   onClick={() =>
                                        pageProps.setOpenSearchBoxMobile(true)
                                   }
                              >
                                   Search city
                              </StyledButton>
                         </StyledLocationDiv>
                    </StyledPageContainer>
               </>
          );
     else {
          return (
               <>
                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openPopup={openPopup}
                    ></StyledPageContainer>
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
     }
};

export default Home;
