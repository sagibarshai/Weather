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
     transform: translate(-50% , -50%);
     position: absolute;
     outline;
     top: ${(props) => props.top};
     left: ${(props) => props.left};
     right: ${(props) => props.right};
     z-index: 0;
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
               <StyledCloud top="20%" left="0%" endLeft="90%" time="150s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="40%" left="-25%" endLeft="80%" time="200s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="55%" left="-10%" endLeft="60%" time="130s">
                    <IconCloudS />
               </StyledCloud>
               <StyledCloud top="70%" left="50%" endLeft="73%" time="160s">
                    <IconCloudL />
               </StyledCloud>
               <StyledCloud top="90%" left="-50%" endLeft="94%" time="250s">
                    <IconCloudM />
               </StyledCloud>
               <StyledCloud top="95%" left="30%" endLeft="89%" time="125s">
                    <IconCloudS />
               </StyledCloud>
          </>
     );
};
export default BackgroundAnimation;
