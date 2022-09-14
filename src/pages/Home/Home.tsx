import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";

import HomePageDisplayCity from "../../components/HomePageDisplayCity/HomePageDisplayCity";
import DisplayMap from "../../components/Map/Map";
import Notification from "../../shared/notifacation/Notification";

import { closeMobileMenu, togglePopup } from "../../redux/headerSlice";
import { StyledIcon } from "../../shared/Icons/Icon";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import themes from "../../shared/themes/themes";

import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";

import { ReactComponent as IconLocation } from "../../shared/svg/location.svg";
import { ReactComponent as IconCity } from "../../shared/svg/city.svg";
import { ReactComponent as IconApp } from "../../shared/svg/logo-large.svg";
import { ReactComponent as IconLogo } from "../../shared/svg/logo-small.svg";

import { StoreState } from "../../redux/store";
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

const Home: React.FC<SharedPageProps> = ({ pageProps }) => {
     const location = useLocation() as any;
     const dispatch = useDispatch();

     const [selectedCityDataFromMap, setSelectedCityDataFromMap] =
          useState<CityObj | null>(null);
     const [showInfo, setShowInfo] = useState<boolean>(false);

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

     useEffect(() => {
          if (location.state) {
               if (location.state.noResultAndEnter) {
                    pageProps.setNoResultAndEnter(
                         location.state.noResultAndEnter
                    );
               } else if (location.state.selectedCityData) {
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
          }
     }, [location, pageProps.coords]);
     useEffect(() => {
          if (openMap) {
               setShowInfo(true);
               setTimeout(() => setShowInfo(false), 5000);
          }
     }, [openMap]);

     const { mutate } = useMutation(searchCityByCoords, {
          onSuccess: (data: SearchResult) => {
               pageProps.setExistingCity({ ...data, key: data?.Key });
          },
          onError: (err: any) => {
               console.log(err);
               pageProps.setServerError(true);
          },
          staleTime: 1000 * 60 * 60,
          cacheTime: 1000 * 60 * 60,
     });

     const onClickHandler = () => {
          if (openPopup) dispatch(togglePopup({ popupType: "logout" }));
          if (openMobileMenu) dispatch(closeMobileMenu());
          if (pageProps.noResultAndEnter) pageProps.setNoResultAndEnter(false);
          if (pageProps.openSearchBoxMobile)
               pageProps.setOpenSearchBoxMobile(false);
     };

     if (openMap) {
          return (
               <>
                    <StyledPageContainer
                         onClick={onClickHandler}
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         openPopup={openPopup}
                    >
                         <DisplayMap
                              setServerError={pageProps.setServerError}
                              coords={pageProps.coords}
                              setSelectedCityDataFromMap={
                                   setSelectedCityDataFromMap
                              }
                         />
                         {showInfo && (
                              <Notification
                                   padding="10px"
                                   variant="success"
                                   animationTime={5000}
                                   animation={true}
                                   mobileWidth="80vw"
                                   message="Click anywhere and get real time forecast"
                                   icon={<IconLogo />}
                                   position="fixed"
                                   mobileBottom="70%"
                              />
                         )}
                    </StyledPageContainer>
               </>
          );
     } else if (pageProps.noResultAndEnter)
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
                              setServerError={pageProps.setServerError}
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
               <StyledPageContainer
                    openMobileMenu={openMobileMenu}
                    renderPraimaryBackground={renderPraimaryBackground}
                    onClick={onClickHandler}
                    openPopup={openPopup}
               />
          );
     }
};

export default Home;
