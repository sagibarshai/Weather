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
};

export const StyledContainer = styled.div`
     display: flex;
     width: 1180px;
     margin: 120px auto 0 auto;
     flex-direction: column;
     overflow: hidden;
     @media ${cssBreakPoints.mobile} {
          width: 100vw;
     }
`;
export const StyledCityName = styled.h2`
     all: unset;
     color: ${themes.white};
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     line-height: 1.2;
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
     @media ${cssBreakPoints.mobile} {
          align-items: center;
          justify-content: center;
          margin-left: 0;
          margin-top: ${(props) => props.marginTopMobile};
     } ;
`;
export const StyledMinTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "5rem"};
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          font-size: 3.6rem;
     }
`;
export const StyledMaxTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "13rem"};
     line-height: 1;
     color: ${themes.white};
     @media ${cssBreakPoints.mobile} {
          font-size: 8rem;
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
     @media ${cssBreakPoints.mobile} {
          text-align: center;
     }
`;
export const StyledDate = styled.p`
     margin-top: 16px;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 2.4rem;
     font-weight: 500;
     line-height: 1.25;
     color: ${themes.white};
`;
export const StyledText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "24px"};
     font-weight: ${(props) => props.fontWeight || "normal"};
     line-height: 1.25;
     text-align: center;
     color: ${themes.white};
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
          `}
`;
export const StyledMobileAddToFavButton = styled.button`
     border: none;
     background-color: transparent;
     position: absolute;
     top: 59px;
     left: 30px;
     transform: translate(-50%, -50%);
`;
