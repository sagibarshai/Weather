import styled, { css } from "styled-components";
import { ReactComponent as IconCloudL } from "../svg/cloud-L.svg";
import { ReactComponent as IconCloudM } from "../svg/cloud-M.svg";
import { ReactComponent as IconCloudS } from "../svg/cloud-S.svg";
type Props = {
     top?: string | number;
     left?: string | number;
     right?: string | number;
     endLeft?: string | number;
     endRight?: string | number;
     time?: string | number;
};

const StyledCloud = styled.i<Props>`
     transform: translate(-50%, -50%);
     position: absolute;
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     left: ${(props) => props.left};
     z-index: 0;
     transition: all;
     ${(props) =>
          props.left && props.endLeft
               ? css`
                      @keyframes leftToRight {
                           50% {
                                transform: translate(-100%, -50%);
                                left: ${props.endLeft};
                           }
                           100% {
                                transform: translate(0, -50%);
                                left: ${props.left};
                           }
                      }
                      animation: leftToRight ${props.time} infinite;
                 `
               : css`
                      @keyframes rightToLeft {
                           50% {
                                transform: translate(-100%, -50%);
                                right: ${props.endRight};
                           }
                           100% {
                                transform: translate(0, -50%);
                                right: ${props.right};
                           }
                      }
                      animation: rightToLeft ${props.time} infinite;
                 `}
`;

const BackgroundAnimation = () => {
     return (
          <>
               <StyledCloud top="20%" right="0%" endRight="100%" time="150s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="40%" left="-20%" endLeft="100%" time="250s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="55%" right="0" endRight="100%" time="185s">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="70%" left="-10%" endLeft="100%" time="200s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="90%" right="0%" endRight="100%" time="300s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="95%" left="0%" endLeft="100%" time="210s">
                    <IconCloudS />
               </StyledCloud>
          </>
     );
};
export default BackgroundAnimation;
