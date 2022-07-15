import React from "react";
import Header from "../components/Header";
import { StyledPageContainer } from "./StyledHome";
import { useSelector } from "react-redux";
const Home = () => {
     const background = useSelector(
          (state) => state.headerSlice.renderBackground
     );

     console.log(background);
     return (
          <StyledPageContainer background={background}>
               <Header />
          </StyledPageContainer>
     );
};

export default Home;
