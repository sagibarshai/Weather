import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "./redux/store";
import { checkToken } from "./shared/utils/Services/Abra-Server/checkToken";
import { logout } from "./redux/authSlice";
import PageSharedTamplate from "./pages/SharedTemplate/PageSharedTamplate";
import { StyleAppContainer } from "./GlobalStyle";
import { useScreenWidth } from "./shared/utils/hooks/useScreenWidth";

const App: React.FC = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const deviceValue = useScreenWidth()[0];
     const [renderMobile, setRenderMobile] = useState<boolean>(false);
     const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
          useState<boolean>(false);

     const isLogin = useSelector(
          (state: StoreState) => state.authSlice.isLogin
     );
     const renderPraimaryBackground = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
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
          if (isLogin) navigate("/home");
     }, [isLogin]);
     const checkIfTokenIsValid = async () => {
          try {
               await checkToken();
          } catch (err) {
               dispatch(logout());
          }
     };
     useEffect(() => {
          checkIfTokenIsValid();
     }, []);
     setInterval(() => {
          checkIfTokenIsValid();
     }, 1000 * 60 * 30);

     if (isLogin)
          return (
               <StyleAppContainer
                    renderPraimaryBackground={renderPraimaryBackground}
               >
                    <BackgroundAnimation
                         renderLaptopAnDesktop={renderLaptopAnDesktop}
                         renderMobile={renderMobile}
                    />
                    <PageSharedTamplate
                         renderLaptopAnDesktop={renderLaptopAnDesktop}
                         renderMobile={renderMobile}
                    />
                    <ReactQueryDevtools initialIsOpen={false} />
               </StyleAppContainer>
          );
     return (
          <StyleAppContainer
               renderPraimaryBackground={renderPraimaryBackground}
          >
               <BackgroundAnimation
                    renderLaptopAnDesktop={renderLaptopAnDesktop}
                    renderMobile={renderMobile}
               />
               <Routes>
                    <Route element={<Navigate to="/login" />} path="/*" />
                    <Route element={<Login />} path="/login" />
               </Routes>
          </StyleAppContainer>
     );
};

export default App;
