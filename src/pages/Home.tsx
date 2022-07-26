import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MobileMenuBottom } from "../components/MobileHeader";
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

const Home: React.FC = () => {
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [searchInput, setSearchInput] = useState<string>("");
     const [locationIsOpen, setLocationIsOpen] = useState<boolean>(false);
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
                    <StyledPageContainer
                         openMobileMenu={openMobileMenu}
                         renderPraimaryBackground={renderPraimaryBackground}
                         onClick={onClickHandler}
                         openLogoutPopup={openLogoutPopup}
                    ></StyledPageContainer>
                    {openLogoutPopup && <Popup />}

                    <StyledLocationDiv>
                         <StyledIcon>
                              <IconLocation />
                         </StyledIcon>
                         <StyledLocationTitle>
                              Set up location
                         </StyledLocationTitle>
                         <StyledLocationParagraph>
                              To identify your location please allow WeatherApp
                              to know your location.
                         </StyledLocationParagraph>
                    </StyledLocationDiv>
                    <MobileMenuBottom />
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
