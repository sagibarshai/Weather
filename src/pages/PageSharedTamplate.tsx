import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import { useScreenWidth } from "../shared/utils/hooks/useScreenWidth";
import { Route, useLocation, Routes } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import FooterMobile from "../components/FooterMobile";
import { MobileMenuBottom } from "../components/MobileHeader";
import SearchBoxMobile from "../components/SearchBoxMobile";
import { CityObj } from "../components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { toggleMap } from "../redux/headerSlice";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLayout } from "../shared/svg/layout.svg";
export const StyledButtonText = styled.span`
     font-family: inherit;
     font-size: 1.8rem;
     font-weight: bold;
     color: black;
`;

const PageSharedTamplate: React.FC = () => {
     const dispatch = useDispatch();
     const location = useLocation();
     const deviceValue = useScreenWidth()[0];
     const [currentPage, setCurrentPage] = useState<string>("/home");
     const [notFoundCityName, setNotFoundCityName] = useState<string>("");
     const [renderMobile, setRenderMobile] = useState<boolean>(true);
     const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
          useState<boolean>(true);
     const [existingCity, setExistingCity] = useState<null | CityObj>(null);
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [openSearchBoxMobile, setOpenSearchBoxMobile] =
          useState<boolean>(false);
     const [selectedCityDataFromFavorites, setSelectedCityDataFromFavorites] =
          useState<CityObj | null>(null);
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(
          localStorage.getItem("coords") ? true : false
     );
     const mapIsOpen = useSelector(
          (state: RootState) => state.headerSlice.openMap
     );
     useEffect(() => {
          navigator.geolocation.getCurrentPosition((position) => {
               localStorage.setItem(
                    "coords",
                    JSON.stringify({
                         lat: position.coords.latitude,
                         lng: position.coords.longitude,
                    })
               );
               setLocationIsOpen(true);
          });
     }, []);
     console.log(locationIsOpen);
     useEffect(() => {
          if (localStorage.getItem("coords")) {
               console.log(localStorage.getItem("coords"));
               setLocationIsOpen(true);
          }
     }, []);

     const pageProps = {
          notFoundCityName,
          setNotFoundCityName,
          renderLaptopAnDesktop,
          renderMobile,
          existingCity,
          setExistingCity,
          noResultAndEnter,
          setNoResultAndEnter,
          openSearchBoxMobile,
          setOpenSearchBoxMobile,
          selectedCityDataFromFavorites,
          setSelectedCityDataFromFavorites,
          coords: JSON.parse(localStorage.getItem("coords")),
          setCurrentPage,
          locationIsOpen,
     };
     useEffect(() => {
          if (location.pathname === "/home") setCurrentPage("/home");
          else if (location.pathname === "/favorites")
               setCurrentPage("/favorites");
     }, [location]);
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
          selectedCityDataFromFavorites &&
               setExistingCity(selectedCityDataFromFavorites);
     }, [selectedCityDataFromFavorites, location]);
     return (
          <>
               {renderLaptopAnDesktop && (
                    <Header
                         setNotFoundCityName={setNotFoundCityName}
                         existingCity={existingCity}
                         setExistingCity={setExistingCity}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                         currentPage={currentPage}
                    />
               )}
               {renderMobile && <MobileHeader />}
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
               {renderMobile && mapIsOpen && (
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
