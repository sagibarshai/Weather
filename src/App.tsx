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
const App: React.FC = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const isLogin = useSelector(
          (state: StoreState) => state.authSlice.isLogin
     );

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
               <>
                    <BackgroundAnimation />
                    <PageSharedTamplate />
                    <ReactQueryDevtools initialIsOpen={false} />
               </>
          );
     return (
          <>
               <BackgroundAnimation />
               <Routes>
                    <Route element={<Navigate to="/login" />} path="/*" />
                    <Route element={<Login />} path="/login" />
               </Routes>
          </>
     );
};

export default App;
