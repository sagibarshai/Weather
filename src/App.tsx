import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login/Login";
import HashLoading from "./shared/Loaing-elements/HashLoading/HashLoading";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";

import { checkToken } from "./shared/utils/Services/Abra-Server/checkToken";
import { logout } from "./redux/authSlice";
import { useScreenWidth } from "./shared/utils/hooks/useScreenWidth";

import { StyleAppContainer } from "./GlobalStyle";

import { StoreState } from "./redux/store";

const App: React.FC = () => {
     const PageSharedTamplate = lazy(
          () => import("./pages/SharedTemplate/PageSharedTamplate")
     );

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

     const checkIfTokenIsValid = async () => {
          try {
               await checkToken();
          } catch (err) {
               console.log(err);
               dispatch(logout());
          }
     };
     setInterval(() => {
          checkIfTokenIsValid();
     }, 1000 * 60 * 30);

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
          if (isLogin) {
               navigate("/home");
          }
     }, [isLogin]);
     useEffect(() => {
          checkIfTokenIsValid();
     }, []);

     if (isLogin)
          return (
               <StyleAppContainer
                    renderPraimaryBackground={renderPraimaryBackground}
               >
                    <BackgroundAnimation
                         renderLaptopAnDesktop={renderLaptopAnDesktop}
                         renderMobile={renderMobile}
                    />
                    <Suspense
                         fallback={
                              <HashLoading
                                   loading={true}
                                   color="#FFFFFFFF"
                                   fixedCenter={true}
                              />
                         }
                    >
                         <PageSharedTamplate
                              renderLaptopAnDesktop={renderLaptopAnDesktop}
                              renderMobile={renderMobile}
                         />
                    </Suspense>
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
               <ReactQueryDevtools initialIsOpen={false} />

               <Routes>
                    <Route element={<Navigate to="/login" />} path="/*" />
                    <Route element={<Login />} path="/login" />
               </Routes>
          </StyleAppContainer>
     );
};

export default App;
