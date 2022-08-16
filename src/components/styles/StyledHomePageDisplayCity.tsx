import styled, { css } from "styled-components";
import themes from "../../shared/themes/themes";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
type StyledProps = {
     fontSize?: string;
     fontWeight?: string;
     gap?: string;
     justifayContent?: string;
     height?: string;
     marginTop?: string;
     alignItems?: string;
     borderRadius?: string;
     border?: string;
     marginLeft?: string;
     selected?: boolean;
     padding?: string;
     marginTopMobile?: string;
     flexDeiractionMobile?: string;
     justifyContentMobile?: string;
     fontSizeMobile?: string;
     flexOrderMobile?: number;
     mobileWidth?: string;
     paddingMobile?: string;
     fontWeightMobile?: string;
     alignItemsMobile?: string;
     positionMobile?: string;
     topMobile?: string;
     leftMobile?: string;
     transformMobile?: string;
     marginRightMobile?: string;
     minMobileWidth?: string;
     mobileHeight?: string;
     mobilePadding?: string;
     mobileGap?: string;
     overFlowXMobile?: string;
     marginMobile?: string;
     blurScreen?: boolean;
     width?: string;
     alignSelf?: string;
     alignSelfMobile?: string;
};

export const StyledContainer = styled.div`
     display: flex;
     width: 1180px;
     margin: 120px auto 0 auto;
     flex-direction: column;
     overflow: hidden;
     align-items: center;
     @media ${cssBreakPoints.mobile} {
          width: 100vw;
          margin-bottom: 150px;
     }
`;
export const StyledCityName = styled.h2<StyledProps>`
     all: unset;
     color: ${themes.white};
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     line-height: 1.2;
     width: ${(props) => props.width};
     @media ${cssBreakPoints.mobile} {
          text-align: center;
          font-size: 3.2rem;
     }
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     align-items: ${(props) => props.alignItems || "center"};
     justify-content: ${(props) => props.justifayContent};
     height: ${(props) => props.height};
     margin-top: ${(props) => props.marginTop};
     text-align: center;
     border-radius: ${(props) => props.borderRadius};
     border: ${(props) => props.border};
     margin-left: ${(props) => props.marginLeft};
     gap: ${(props) => props.gap};
     padding: ${(props) => props.padding};
     width: 100%;
     align-items: ${(props) => props.alignItems};
     box-sizing: border-box;
     @media ${cssBreakPoints.mobile} {
          justify-content: center;
          margin-left: 0;
          margin-top: ${(props) => props.marginTopMobile};
          flex-direction: ${(props) => props.flexDeiractionMobile};
          justify-content: ${(props) => props.justifyContentMobile};
          height: ${(props) => props.mobileHeight};
          min-width: ${(props) => props.minMobileWidth};
          width: ${(props) => props.mobileWidth};
          border: none;
          order: ${(props) => props.flexOrderMobile};
          overflow-x: ${(props) => props.overFlowXMobile};
          gap: ${(props) => props.mobileGap};
          margin: ${(props) => props.marginMobile};
     } ;
`;
export const StyledMinTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "5rem"};
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          font-size: 3.6rem;
          order: ${(props) => props.flexOrderMobile};
          font-size: ${(props) => props.fontSizeMobile};
          font-weight: ${(props) => props.fontWeightMobile};
          position: ${(props) => props.positionMobile};
     }
`;
export const StyledMaxTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "13rem"};
     line-height: 1;
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          font-size: ${(props) => props.fontSizeMobile};
          order: ${(props) => props.flexOrderMobile};
          position: ${(props) => props.positionMobile};
          margin-right: ${(props) => props.marginRightMobile};
     }
`;
export const StyledDescription = styled.p<StyledProps>`
     all: unset;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "3.2rem"};
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.white};
     margin-top: 16px;
     align-self: ${(props) => props.alignSelf};
     @media ${cssBreakPoints.mobile} {
          align-self: ${(props) => props.alignSelfMobile};
          text-align: center;
          font-size: ${(props) => props.fontSizeMobile};
          order: ${(props) => props.flexOrderMobile};
          font-weight: ${(props) => props.fontWeightMobile};
     } ;
`;
export const StyledDate = styled.p<StyledProps>`
     margin-top: 16px;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 2.4rem;
     font-weight: 500;
     line-height: 1.25;
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          text-align: center;
          font-size: 1.4rem;
          order: ${(props) => props.flexOrderMobile};
     }
`;
export const StyledText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "24px"};
     font-weight: ${(props) => props.fontWeight || "normal"};
     line-height: 1.25;
     text-align: center;
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          font-size: ${(props) => props.fontSizeMobile};
          order: ${(props) => props.flexOrderMobile};
          align-self: ${(props) => props.alignSelfMobile};
     }
`;
export const StyledColumnDiv = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     padding: ${(props) => props.padding};
     border-radius: ${(props) => props.borderRadius};
     align-items: center;
     ${(props) =>
          props.selected === true &&
          css`
               background-color: rgba(255, 255, 255, 0.2);
          `};
     @media ${cssBreakPoints.mobile} {
          flex-direction: ${(props) => props.flexDeiractionMobile};
          width: ${(props) => props.mobileWidth};
          min-width: ${(props) => props.minMobileWidth};
          justify-content: ${(props) => props.justifyContentMobile};
          padding: ${(props) => props.paddingMobile};
          align-items: ${(props) => props.alignItemsMobile};
          margin-top: ${(props) => props.marginTopMobile};
          padding: ${(props) => props.mobilePadding};
          height: ${(props) => props.mobileHeight};
          gap: ${(props) => props.mobileGap};
     }
`;
export const StyledMobileAddToFavButton = styled.button`
     border: none;
     background-color: transparent;
     position: absolute;
     top: 59px;
     left: 30px;
     transform: translate(-50%, -50%);
`;
export const StyledTempratureSpan = styled.span<StyledProps>`
     font-size: ${(props) => props.fontSize};
     vertical-align: top;
     @media ${cssBreakPoints.mobile} {
          font-size: ${(props) => props.fontSizeMobile};
          position: ${(props) => props.positionMobile};
          top: ${(props) => props.topMobile};
          left: ${(props) => props.leftMobile};
          transform: ${(props) => props.transformMobile};
     }
`;
