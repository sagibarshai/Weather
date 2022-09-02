import styled, { css } from "styled-components";
import cssBreakPoints from "../cssBreakPoints/cssBreakPoints";
import { ReactComponent as IconCloudL } from "../svg/cloud-L.svg";
import { ReactComponent as IconCloudM } from "../svg/cloud-M.svg";
import { ReactComponent as IconCloudS } from "../svg/cloud-S.svg";
type Size = "l" | "m" | "s";
type Props = {
     top?: string | number;
     left?: string | number;
     right?: string | number;
     endLeft?: string | number;
     endRight?: string | number;
     time?: string | number;
     displayOnMobile?: boolean;
     size: Size;
};

const StyledCloud = styled.i<Props>`
     transform: translate(-50%, -50%);
     background-image: url("/images/cloud-s.png");
     background-repeat: no-repeat;
     position: absolute;
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     left: ${(props) => props.left};
     z-index: 0;
     transition: all;
     object-fit: cover;
     @media ${cssBreakPoints.mobile} {
          ${(props) => props.displayOnMobile === false && `display:none`}
     }
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
                 `};
     width: 130px;
     height: 130px;
     ${(props) =>
          props.size === "m" &&
          css`
               width: 200px;
               height: 200px;
               background-image: url("/images/cloud-m.png");
          `};
     ${(props) =>
          props.size === "l" &&
          css`
               width: 270px;
               height: 270px;
               background-image: url("/images/cloud-l.png");
          `}
`;
const StyledCloudBig = styled.div`
     width: 150px;
     height: 100px;
     position: absolute;
     background-image: url("/images/cloud-l.png");
     background-size: 100% 100%;
     top: 0%;
     left: 20%;
     object-fit: cover;
`;
const BackgroundAnimation = () => {
     return (
          <>
               <StyledCloud
                    size="m"
                    top="20%"
                    right="0%"
                    endRight="100%"
                    time="150s"
                    displayOnMobile={false}
               />
               <StyledCloud
                    top="40%"
                    left="-20%"
                    endLeft="100%"
                    time="250s"
                    size="l"
               />
               <StyledCloud
                    top="55%"
                    right="0"
                    endRight="100%"
                    time="110s"
                    size="s"
               />
               <StyledCloud
                    size="m"
                    top="70%"
                    left="-10%"
                    endLeft="100%"
                    time="200s"
                    displayOnMobile={false}
               />
               <StyledCloud
                    top="90%"
                    right="0%"
                    endRight="100%"
                    time="300s"
                    size="l"
               />
               <StyledCloud
                    top="95%"
                    left="0%"
                    endLeft="100%"
                    time="210s"
                    size="s"
               />
               <StyledCloud
                    top="45%"
                    right="0%"
                    endRight="100%"
                    time="100s"
                    size="m"
               />
               <StyledCloud
                    top="75%"
                    right="20%"
                    endRight="80%"
                    time="180s"
                    size="m"
               />
               <StyledCloud
                    top="96%"
                    right="0%"
                    endRight="100%"
                    time="160s"
                    size="m"
               />
               <StyledCloud
                    top="75%"
                    right="20%"
                    endRight="80%"
                    time="100s"
                    size="m"
               />
               <StyledCloud
                    top="5%"
                    right="10%"
                    endRight="90%"
                    time="100s"
                    size="s"
               />
               <StyledCloud
                    top="62.5%"
                    left="-20%"
                    endLeft="100%"
                    time="200s"
                    size="l"
               />
          </>
     );
};
export default BackgroundAnimation;
