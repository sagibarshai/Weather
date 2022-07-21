import styled from "styled-components";
import { ReactComponent as IconCloudL } from "../svg/cloud-L.svg";
import { ReactComponent as IconCloudM } from "../svg/cloud-M.svg";
import { ReactComponent as IconCloudS } from "../svg/cloud-S.svg";
type Props = {
     top?: string | number;
     left?: string | number;
     leftAnimation?: string | number;
};
const StyledCloud = styled.i<Props>`
     position: absolute;
     top: ${(props) => props.top};
     left: ${(props) => props.left};
     @keyframes leftToRight {
          0% {
               left: ${(props) => props.left};
          }
          100% {
               right: calc(${(props) => props.leftAnimation});
          }
     }
     animation: leftToRight 40s infinite;
`;
const StyledContainer = styled.div`
     position: relative;
     z-index: 0;
     height: 100vh;
`;

const BackgroundAnimation = () => {
     return (
          <StyledContainer>
               <StyledCloud top="50%" left="20%" leftAnimation="20%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="63%" left="82%" leftAnimation="37%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="21%" left="91%" leftAnimation="48%">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="10%" left="36%" leftAnimation="11%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="28%" left="65" leftAnimation="90%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="40%" left="57%" leftAnimation="79%">
                    <IconCloudS />
               </StyledCloud>
          </StyledContainer>
     );
};
export default BackgroundAnimation;
