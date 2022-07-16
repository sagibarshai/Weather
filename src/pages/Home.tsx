import { useSelector } from "react-redux";
import Header from "../components/Header";
import { StyledPageContainer } from "./StyledHome";
import { RootState } from "../redux/store";

import styled from "styled-components";

const StyledTooltip = styled.div`
     width: 143px;
     height: 57px;
     clip-path: polygon(
          51% 11%,
          61% 35%,
          100% 35%,
          100% 57%,
          100% 100%,
          49% 100%,
          0 100%,
          0 58%,
          0 35%,
          39% 35%
     );
     background-color: white;
     margin: 0 auto;
`;
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
