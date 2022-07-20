import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
const App: React.FC = () => {
     return (
          <>
               <Routes>
                    <Route element={<Home />} path="/home" />
                    <Route element={<Login />} path="/login" />
               </Routes>
          </>
     );
};

export default App;
