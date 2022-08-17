import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Favorites from "./pages/Favorites";

const App: React.FC = () => {
     const navigate = useNavigate();
     const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
     useEffect(() => {
          if (isLogin) navigate("/home");
     }, [isLogin]);
     console.log(isLogin);
     if (isLogin)
          return (
               <>
                    <BackgroundAnimation />
                    <Routes>
                         <Route
                              element={<Home setIsLogin={setIsLogin} />}
                              path="/home"
                         />
                         <Route element={<Favorites />} path="/favorites" />
                    </Routes>
               </>
          );
     return (
          <>
               <BackgroundAnimation />
               <Routes>
                    <Route element={<Navigate to="/login" />} path="/*" />
                    <Route
                         element={<Login setIsLogin={setIsLogin} />}
                         path="/login"
                    />
               </Routes>
               {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </>
     );
};

export default App;
