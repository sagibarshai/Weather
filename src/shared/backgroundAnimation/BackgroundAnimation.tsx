import styled, { css } from "styled-components";
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
     ${(props) =>
          props.left
               ? css`
                      @keyframes leftToRight {
                           100% {
                                transform: translateX(200%);
                           }
                      }
                      animation: leftToRight 100s infinite;
                 `
               : css`
                      @keyframes rightToLeft {
                           100% {
                                transform: translateX(200%);
                           }
                      }
                      animation: rightToLeft 150s infinite;
                 `}
`;

const BackgroundAnimation = () => {
     return (
          <>
               <StyledCloud top="15%" left="10%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="35%" right="25%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="50%" left="91%">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="60%" right="50%">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="80%" left="65%">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="90%" right="80%">
                    <IconCloudS />
               </StyledCloud>
          </>
     );
};
export default BackgroundAnimation;
