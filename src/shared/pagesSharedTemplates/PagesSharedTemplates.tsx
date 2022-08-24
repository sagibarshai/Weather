// import styled, { css } from "styled-components";
// import themes from "../themes/themes";
// import React, { useState, useEffect } from "react";
// import { Result } from "../../components/SearchBox";
// import { useScreenWidth } from "../utils/getScreenWidth";
// import { RootState } from "../../redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import Header from "../../components/Header";
// import MobileHeader from "../../components/MobileHeader";
// import { useLocation } from "react-router-dom";
// import {
//      togglePopup,
//      toggleBackground,
//      toggleMobileMenu,
//      toggleDegress,
//      closeMobileMenu,
// } from "../../redux/headerSlice";
// import Favorites from "../../pages/Favorites";
// import Home from "../../pages/Home";
// type Props = {
//      children: JSX.Element | JSX.Element[] | any;
// };
// type StyledProps = {
//      renderPraimaryBackground: boolean;
//      openMobileMenu: boolean;
//      openPopup?: boolean;
// };

// export const StyledPageContainer = styled.div<StyledProps>`
//      display: inline-block;
//      background-image: ${(props) => {
//           if (props.renderPraimaryBackground) return themes.backgroundPraimary;
//           else return themes.darkBackground;
//      }};
//      min-width: 100vw;
//      margin: 0;
//      overflow-x: hidden;
//      min-height: 100vh;
//      ${(props) => {
//           if (props.openMobileMenu || props.openPopup) {
//                return css`
//                     filter: blur(10px);
//                `;
//           }
//      }};
// `;

// const PagesSharedTemplates: React.FC<Props> = (props) => {
//      const location = useLocation();
//      const [CurrentPage, setCurrentPage] = useState<null | JSX.Element>(
//           <Home />
//      );
//      const [searchResults, setSearchResults] = useState<[] | Result[]>([]);
//      const [searchInput, setSearchInput] = useState<string>("");
//      const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
//      const [selectedCityKey, setSelectedCityKey] = useState<
//           string | number | null
//      >(null);
//      const [selectedCityDataFromFavorites, setSelectedCityDataFromFavorites] =
//           useState<Result | null>(null);
//      const [openSearchBoxMobile, setOpenSearchBoxMobile] =
//           useState<boolean>(false);
//      const [renderMobile, setRenderMobile] = useState<boolean>(true);
//      const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
//           useState<boolean>(true);
//      const renderPraimaryBackground = useSelector(
//           (state: RootState) => state.headerSlice.renderPraimaryBackground
//      );
//      const openMobileMenu = useSelector(
//           (state: RootState) => state.headerSlice.openMobileMenu
//      );
//      const openPopup = useSelector(
//           (state: RootState) => state.headerSlice.openPopup
//      );
//      const deviceValue = useScreenWidth()[0];
//      const dispatch = useDispatch();
//      useEffect(() => {
//           if (deviceValue === "bigDesktop" || deviceValue === "laptop") {
//                setRenderLaptopAnDesktop(true);
//                setRenderMobile(false);
//           } else {
//                setRenderLaptopAnDesktop(false);
//                setRenderMobile(true);
//           }
//      }, [deviceValue]);
//      const onClickHandler = () => {
//           if (openPopup) dispatch(togglePopup());
//           if (openMobileMenu) dispatch(closeMobileMenu());
//           if (noResultAndEnter) setNoResultAndEnter(false);
//           if (openSearchBoxMobile) setOpenSearchBoxMobile(false);
//      };
//      const returnCurrentPage = () => {
//           if (location.pathname === "/home")
//                return (
//                     <Home
//                          searchResults={searchResults}
//                          setSearchResults={setSearchResults}
//                          searchInput={searchInput}
//                          setSearchInput={setSearchInput}
//                          setNoResultAndEnter={setNoResultAndEnter}
//                          noResultAndEnter={noResultAndEnter}
//                          setSelectedCityKey={setSelectedCityKey}
//                     />
//                );
//           else if (location.pathname === "/favorites")
//                return (
//                     <Favorites
//                          searchResults={searchResults}
//                          setSearchResults={setSearchResults}
//                          searchInput={searchInput}
//                          setSearchInput={setSearchInput}
//                          setNoResultAndEnter={setNoResultAndEnter}
//                          noResultAndEnter={noResultAndEnter}
//                          setSelectedCityKey={setSelectedCityKey}
//                     />
//                );
//      };

//      return (
//           <>
//                {renderLaptopAnDesktop && (
//                     <Header
//                          searchResults={searchResults}
//                          setSearchResults={setSearchResults}
//                          searchInput={searchInput}
//                          setSearchInput={setSearchInput}
//                          setNoResultAndEnter={setNoResultAndEnter}
//                          noResultAndEnter={noResultAndEnter}
//                          setSelectedCityKey={setSelectedCityKey}
//                     />
//                )}
//                {renderMobile && <MobileHeader />}
//                <StyledPageContainer
//                     onClick={onClickHandler}
//                     openMobileMenu={openMobileMenu}
//                     renderPraimaryBackground={renderPraimaryBackground}
//                     openPopup={openPopup}
//                >
//                     {returnCurrentPage()}
//                </StyledPageContainer>
//           </>
//      );
// };

// export default PagesSharedTemplates;
