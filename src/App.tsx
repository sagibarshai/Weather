import Home from "./pages/Home";
import Login from "./pages/Login";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, Navigate } from "react-router-dom";
import Favorites from "./pages/Favorites";

const App: React.FC = () => {
     return (
          <>
               <BackgroundAnimation />
               <Routes>
                    <Route element={<Navigate to="/home" />} path="/" />
                    <Route element={<Home />} path="/home" />
                    <Route element={<Favorites />} path="/favorites" />
                    <Route element={<Login />} path="/login" />
               </Routes>
               {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </>
     );
};

export default App;
