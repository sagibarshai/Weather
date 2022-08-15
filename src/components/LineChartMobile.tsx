import styled from "styled-components";
import themes from "../shared/themes/themes";
const StyledMobileLineContainer = styled.div`
     width: 100vw;
     height: 62.5vh;
     background-color: ${themes.white};
     position: fixed;
     bottom: 0;
`;
const LineChartMobile = () => {
     return <StyledMobileLineContainer></StyledMobileLineContainer>;
};

export default LineChartMobile;
