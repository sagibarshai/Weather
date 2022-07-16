import { useSelector } from "react-redux";
import Header from "../components/Header";
import { StyledPageContainer } from "./StyledHome";
import { RootState } from "../redux/store";
const Home = () => {
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );

     return (
          <StyledPageContainer
               renderPraimaryBackground={renderPraimaryBackground}
          >
               <Header />
          </StyledPageContainer>
     );
};

export default Home;
