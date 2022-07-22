import styled from "styled-components";
import { ReactComponent as IconCloudL } from "../svg/cloud-L.svg";
import { ReactComponent as IconCloudM } from "../svg/cloud-M.svg";
import { ReactComponent as IconCloudS } from "../svg/cloud-S.svg";
type Props = {
     top?: string | number;
     left?: string | number;
     right?: string | number;
};
const StyledCloud = styled.i<Props>`
     position: absolute;
     top: ${(props) => props.top};
     left: ${(props) => props.left};
     right: ${(props) => props.right};
     z-index: 0;
     &:nth-child(1) {
          @keyframes leftToRight {
               0% {
                    left: ${(props) => props.left};
               }
               100% {
                    left: -10%;
               }
          }
          animation: leftToRight 180s infinite;
     }
     &:nth-child(2) {
          @keyframes rightToLeft {
               0% {
                    right: ${(props) => props.right};
               }
               100% {
                    right: -10%;
               }
          }
          animation: rightToLeft 220s infinite;
     }
     &:nth-child(3) {
          @keyframes leftToRight {
               0% {
                    left: ${(props) => props.left};
               }
               100% {
                    left: -10%;
               }
          }
          animation: leftToRight 280s infinite;
     }
     &:nth-child(4) {
          @keyframes rightToLeft {
               0% {
                    right: ${(props) => props.right};
               }
               100% {
                    right: -10%;
               }
          }
          animation: rightToLeft 190s infinite;
          transform: rotate(-360deg);
     }
     &:nth-child(5) {
          @keyframes leftToRight {
               0% {
                    left: ${(props) => props.left};
               }
               100% {
                    left: -10%;
               }
          }
          animation: leftToRight 180s infinite;
     }
     &:nth-child(6) {
          @keyframes rightToLeft {
               0% {
                    right: ${(props) => props.right};
               }
               100% {
                    right: -10%;
               }
          }
          animation: rightToLeft 275s infinite;
     }
`;

const BackgroundAnimation = () => {
     return (
          <>
               <StyledCloud top="15%" left="20%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="35%" right="60%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="45%" left="91%">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="60%" right="10%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="80%" left="65%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="90%" right="63%">
                    <IconCloudS />
               </StyledCloud>
          </>
     );
};
export default BackgroundAnimation;
