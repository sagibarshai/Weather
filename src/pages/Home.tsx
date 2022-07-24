import { useSelector, useDispatch } from "react-redux";
import { MobileMenuBottom } from "../components/MobileHeader";
import {
     StyledPageContainer,
     StyledLocationTitle,
     StyledLocationDiv,
     StyledLocationParagraph,
} from "./StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu, toggleLogoutPopup } from "../redux/headerSlice";
import Header from "../components/Header";
import Popup from "../components/Popup";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconLocation } from "../shared/svg/location.svg";

const Home: React.FC = () => {
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
     };

     return (
          <>
               <Header />
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
                    <StyledLocationTitle>Set up location</StyledLocationTitle>
                    <StyledLocationParagraph>
                         To identify your location please allow WeatherApp to
                         know your location.
                    </StyledLocationParagraph>
               </StyledLocationDiv>
               <MobileMenuBottom />
          </>
     );
};

export default Home;
