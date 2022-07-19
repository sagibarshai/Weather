import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { MobileMenuBottom } from "../components/MobileHeader";
import { StyledPageContainer } from "./StyledHome";
import { RootState } from "../redux/store";
import { closeMobileMenu } from "../redux/headerSlice";
import Login from "../components/Login";

const Home = () => {
     const dispatch = useDispatch();
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const openMobileMenu = useSelector(
          (state: RootState) => state.headerSlice.openMobileMenu
     );

     return (
          <>
               <StyledPageContainer
                    openMobileMenu={openMobileMenu}
                    renderPraimaryBackground={renderPraimaryBackground}
                    onClick={() =>
                         openMobileMenu ? dispatch(closeMobileMenu()) : ""
                    }
               >
                    <Header />
                    <Login />
               </StyledPageContainer>
               <MobileMenuBottom />
          </>
     );
};

export default Home;
