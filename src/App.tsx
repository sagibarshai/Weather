import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Favorites from "./pages/Favorites";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { checkToken } from "./shared/utils/Services/Abra-Server/checkToken";
import { logout } from "./redux/authSlice";
import PageSharedTamplate from "./pages/PageSharedTamplate";
const App: React.FC = () => {
     const [lat, setLat] = useState<number>();
     const [lng, setLng] = useState<number>();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const isLogin = useSelector((state: RootState) => state.authSlice.isLogin);
     useEffect(() => {
          navigator.geolocation.getCurrentPosition((position) => {
               setLat(position.coords.latitude);
               setLng(position.coords.longitude);
          });
     }, []);
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
                    <PageSharedTamplate coords={{ lat, lng }} />
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
