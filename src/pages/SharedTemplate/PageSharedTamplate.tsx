import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation, Routes } from "react-router-dom";

import Header from "../../components/layouts/Header/Header";
import MobileHeader from "../../components/layouts-mobile/Header/MobileHeader";
import Favorites from "../Favorites/Favorites";
import FooterMobile from "../../components/layouts-mobile/Footer/FooterMobile";
import { useScreenWidth } from "../../shared/utils/hooks/useScreenWidth";
import Home from "../Home/Home";
import { MobileMenuBottom } from "../../components/layouts-mobile/Header/MobileHeader";
import SearchBoxMobile from "../../components/SearchBox-mobile/SearchBoxMobile";
import { CityObj } from "../../components/SearchBox/types";
import { StoreState } from "../../redux/store";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import { toggleMap } from "../../redux/headerSlice";
import { StyledIcon } from "../../shared/Icons/Icon";
import { ReactComponent as IconLayout } from "../../shared/svg/layout.svg";

import { Props } from "./types";

export const StyledButtonText = styled.span`
     font-family: inherit;
     font-size: 1.8rem;
     font-weight: bold;
     color: black;
`;

const PageSharedTamplate: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     const location = useLocation();
     const [currentPage, setCurrentPage] = useState<string>("/home");
     const [notFoundCityName, setNotFoundCityName] = useState<string>("");
     const [existingCity, setExistingCity] = useState<null | CityObj>(null);
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [openSearchBoxMobile, setOpenSearchBoxMobile] =
          useState<boolean>(false);
     const [selectedCityDataFromFavorites, setSelectedCityDataFromFavorites] =
          useState<CityObj | null>(null);
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(
          localStorage.getItem("coords") ? true : false
     );
     const [coords, setCoords] = useState<any>();
     const mapIsOpen = useSelector(
          (state: StoreState) => state.headerSlice.openMap
     );
     console.log(currentPage);
     useEffect(() => {
          if (props.renderLaptopAnDesktop) {
               navigator.geolocation.getCurrentPosition(
                    (position) => {
                         localStorage.setItem(
                              "coords",
                              JSON.stringify({
                                   lat: position.coords.latitude,
                                   lng: position.coords.longitude,
                              })
                         );
                         setLocationIsOpen(true);
                         setCoords({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude,
                         });
                    },
                    () => {
                         setLocationIsOpen(false);
                         throw new Error(
                              `cannot accses location,please get to setting and enabled to chrome your location.. `
                         );
                    }
               );
          }
     }, [props.renderLaptopAnDesktop, props.renderMobile]);
     useEffect(() => {
          let position = localStorage.getItem("coords");
          if (position) {
               setLocationIsOpen(true);
               setCoords(JSON.parse(position));
          }
     }, []);

     const pageProps = {
          notFoundCityName,
          setNotFoundCityName,
          renderLaptopAnDesktop: props.renderLaptopAnDesktop,
          renderMobile: props.renderMobile,
          existingCity,
          setExistingCity,
          noResultAndEnter,
          setNoResultAndEnter,
          openSearchBoxMobile,
          setOpenSearchBoxMobile,
          selectedCityDataFromFavorites,
          setSelectedCityDataFromFavorites,
          coords,
          setCurrentPage,
          locationIsOpen,
          setLocationIsOpen,
          setCoords,
     };
     useEffect(() => {
          let coordsFromLocalStorge = localStorage.getItem("coords");
          if (localStorage.getItem("openOnMap") && coordsFromLocalStorge) {
               localStorage.removeItem("openOnMap");
               pageProps.setLocationIsOpen(true);
               setCoords(JSON.parse(coordsFromLocalStorge));
               dispatch(toggleMap());
          }
     }, []);
     useEffect(() => {
          if (location.pathname === "/home") setCurrentPage("/home");
          else if (location.pathname === "/favorites")
               setCurrentPage("/favorites");
     }, [location]);
     useEffect(() => {
          selectedCityDataFromFavorites &&
               setExistingCity(selectedCityDataFromFavorites);
     }, [selectedCityDataFromFavorites, location]);
     return (
          <>
               {props.renderLaptopAnDesktop && (
                    <Header
                         setNotFoundCityName={setNotFoundCityName}
                         existingCity={existingCity}
                         setExistingCity={setExistingCity}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                         currentPage={currentPage}
                         setCoords={setCoords}
                    />
               )}
               {props.renderMobile && <MobileHeader />}

               <Routes>
                    {currentPage === "/home" && (
                         <Route
                              element={<Home pageProps={pageProps} />}
                              path="/home"
                         />
                    )}
                    {currentPage === "/favorites" && (
                         <Route
                              element={<Favorites pageProps={pageProps} />}
                              path="/favorites"
                         />
                    )}
               </Routes>
               {props.renderMobile && mapIsOpen && (
                    <StyledButton
                         variant="white"
                         position="absolute"
                         width="auto"
                         height="auto"
                         padding="12px"
                         bottom="116px"
                         left="50%"
                         transform="translate(-50%,-100%)"
                         onClick={() => dispatch(toggleMap())}
                    >
                         <StyledIcon marginRight="8px">
                              <IconLayout width="22px" height="22px" />
                         </StyledIcon>
                         <StyledButtonText>Layout</StyledButtonText>
                    </StyledButton>
               )}
               {openSearchBoxMobile && (
                    <SearchBoxMobile
                         setExistingCity={setExistingCity}
                         existingCity={existingCity}
                         setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    />
               )}
               <FooterMobile setOpenSearchBoxMobile={setOpenSearchBoxMobile} />
               <MobileMenuBottom />
          </>
     );
};

export default PageSharedTamplate;
