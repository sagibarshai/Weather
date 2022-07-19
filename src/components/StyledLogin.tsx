import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
type Props = {
     gap?: string;
     height?: string;
     flexDeiraction?: string;
     mobile?: boolean;
};
export const StyledLoginContainer = styled.form<Props>`
     background-color: ${themes.white};
     width: 840px;
     height: 757px;
     box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.16);
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     text-align: center;
     border-radius: 30px;
     @media ${cssBreakPoints.laptop} {
          width: 588px;
          height: ${(props) => props.height};
     }
     @media ${cssBreakPoints.mobile} {
          width: 100vw;
          box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.16);
          border: solid 1px #fff;
          background-color: #fff;
          position: absolute;
          top: 105%;
          left: 50%;
          transform: translate(-50%, -97%);
          ${(props) =>
               props.mobile === true &&
               css`
                    top: 110%;
                    padding-bottom: 40px;
               `}
     }
`;
export const StyledTitle = styled.h3`
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     color: ${themes.secondary};
     margin: 54px auto;
     @media ${cssBreakPoints.laptop} {
          margin: 24px auto 32px auto;
     }
`;
export const StyledInputsContainer = styled.div`
     display: flex;
     flex-direction: column;
     gap: 32px;
     width: fit-content;
     margin: 0 auto;
`;
export const StyledContainer = styled.div<Props>`
     text-align: center;
     margin-top: 48px;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: ${(props) => props.gap};
     @media ${cssBreakPoints.mobile} {
          flex-direction: ${(props) =>
               props.flexDeiraction ? props.flexDeiraction : "row"};
          column-gap: 47px;
     }
`;
export const StyledHr = styled.hr`
     width: 254px;
     background-color: #f2f2f2;
     height: 1px;
`;
export const StyledSpan = styled.span`
     color: ${themes.secondary};
     font-size: 1.4rem;
     @media ${cssBreakPoints.mobile} {
          white-space: nowrap;
     }
`;
export const StyledLogoContainer = styled.span`
     display: none;
     @media ${cssBreakPoints.mobile} {
          display: inline;
     }
`;
