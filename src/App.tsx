import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import BackgroundAnimation from "./shared/backgroundAnimation/BackgroundAnimation";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, Navigate } from "react-router-dom";

const App: React.FC = () => {
     return (
          <>
               <BackgroundAnimation />
               <Routes>
                    <Route element={<Navigate to="/home" />} path="/" />
                    <Route element={<Home />} path="/home" />
                    <Route element={<Home />} path="/favorite" />
                    <Route element={<Login />} path="/login" />
               </Routes>
               {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </>
     );
};

export default App;
