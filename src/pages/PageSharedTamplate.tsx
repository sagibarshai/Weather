import { useState, useEffect } from "react";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import { useScreenWidth } from "../shared/utils/hooks/useScreenWidth";
import { Route, useLocation, Routes } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import FooterMobile from "../components/FooterMobile";
import { MobileMenuBottom } from "../components/MobileHeader";
import SearchBoxMobile from "../components/SearchBoxMobile";
import { Result } from "../components/SearchBox";
type Props = {
     coords: {
          lat: number | undefined;
          lng: number | undefined;
     };
};
const PageSharedTamplate: React.FC<Props> = (props) => {
     const location = useLocation();
     const deviceValue = useScreenWidth()[0];
     const [currentPage, setCurrentPage] = useState<string>("/home");
     const [notFoundCityName, setNotFoundCityName] = useState<string>("");
     const [renderMobile, setRenderMobile] = useState<boolean>(true);
     const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
          useState<boolean>(true);
     const [existingCity, setExistingCity] = useState<null | Result>(null);
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);

     const [openSearchBoxMobile, setOpenSearchBoxMobile] =
          useState<boolean>(false);
     const [selectedCityDataFromFavorites, setSelectedCityDataFromFavorites] =
          useState<Result | null>(null);
     const [showOnMap, setShowOnMap] = useState<boolean>(false);

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
          coords: props.coords,
          setCurrentPage,
          showOnMap,
          setShowOnMap,
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
     console.log(existingCity, selectedCityDataFromFavorites);
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
               <FooterMobile
                    setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    showOnMap={showOnMap}
               />
               <MobileMenuBottom />
               {openSearchBoxMobile && (
                    <SearchBoxMobile
                         setExistingCity={setExistingCity}
                         existingCity={existingCity}
                         setOpenSearchBoxMobile={setOpenSearchBoxMobile}
                    />
               )}
          </>
     );
};

export default PageSharedTamplate;
