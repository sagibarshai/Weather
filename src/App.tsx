import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
// https://developer.accuweather.com/

import { Routes, Route } from "react-router-dom";
const App: React.FC = () => {
     return (
          <>
               <BackgroundAnimation />
               <Routes>
                    <Route element={<Home />} path="/home" />
                    <Route element={<Home />} path="/favorite" />
                    <Route element={<Login />} path="/login" />
               </Routes>
          </>
     );
};

export default App;
