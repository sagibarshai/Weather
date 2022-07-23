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
     position: absolute;
     top: ${(props) => props.top};
     left: ${(props) => props.left};
     right: ${(props) => props.right};
     z-index: 0;
     transition: all;
     ${(props) =>
          props.left && props.endLeft
               ? css`
                      @keyframes leftToRight {
                           100% {
                                left: ${props.endLeft};
                           }
                      }
                      animation: leftToRight ${props.time} infinite;
                 `
               : css`
                      @keyframes rightToLeft {
                           100% {
                                right: ${props.endRight};
                           }
                      }
                      animation: rightToLeft ${props.time} infinite;
                 `}
`;

const BackgroundAnimation = () => {
     return (
          <>
               <StyledCloud top="15%" right="0%" endRight="85%" time="120s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="35%" right="25%" endRight="85%" time="140s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="50%" left="0%" endLeft="85%" time="100s">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="60%" right="0%" endRight="85%" time="100s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="80%" left="0%" endLeft="85%" time="122s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="90%" left="0%" endLeft="85%" time="105s">
                    <IconCloudS />
               </StyledCloud>
          </>
     );
};
export default BackgroundAnimation;
