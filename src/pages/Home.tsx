import { useSelector, useDispatch } from "react-redux";
import { MobileMenuBottom } from "../components/MobileHeader";
import { StyledPageContainer } from "./StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu, toggleLogoutPopup } from "../redux/headerSlice";
import BackgroundAnimation from "../shared/backgroundAnimation/BackgroundAnimation";
import Header from "../components/Header";
import Popup from "../components/Popup";

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
               >
                    {/* <BackgroundAnimation /> */}
               </StyledPageContainer>
               {openLogoutPopup && <Popup />}
               <MobileMenuBottom />
          </>
     );
};

export default Home;
