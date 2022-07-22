import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
type Props = {
     gap?: string;
     height?: string;
     flexDeiraction?: string;
     mobileServerError?: boolean;
     margin?: string;
     serverError?: string | null;
};
export const StyledLoginContainer = styled.form<Props>`
     background-color: ${themes.white};
     height: {props => props.serverError? '743px' : '649px'};
     width:732px;
     box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.16);
     text-align: center;
     border-radius: 30px;
     margin:168px auto 168px auto;
     padding:54px;
     z-index:2;
     @media ${cssBreakPoints.laptop} {
          width: 588px;
          height: ${(props) => (props.serverError ? "675px" : "559px")};
     }
     @media ${cssBreakPoints.mobile} {
          width: 100vw;
          box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.16);
          border: solid 1px #fff;
          background-color: #fff;
          display: inline-block;
          border-radius: 30px 30px 0 0 ;
          margin-top:184px;
          height: 658px;
          margin:184px 0 0 0;
          padding-bottom: 0;
          ${(props) =>
               props.mobileServerError === true &&
               css`
                    height: 777px;
               `};
     }
`;
export const StyledTitle = styled.h3`
     margin: 0 0 32px 0;
     line-height: 1;
     padding: 0;
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     color: ${themes.secondary};
     @media ${cssBreakPoints.mobile} {
          font-size: 3.2rem;
          font-weight: bold;
          line-height: 1.25;
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
     margin: ${(props) => props.margin};
     column-gap: 16px;
     @media ${cssBreakPoints.mobile} {
          flex-direction: ${(props) =>
               props.flexDeiraction ? props.flexDeiraction : "row"};
          margin: 54px 0 0 0;
     }
`;
export const StyledHr = styled.hr`
     background-color: #f2f2f2;
     width: 40%;
     flex-grow: 6;
`;
export const StyledSpan = styled.span`
     color: ${themes.secondary};
     font-size: 1.4rem;
     white-space: nowrap;
`;
export const StyledLogoContainer = styled.span`
     position: absolute;
     top: 20px;
     left: 50px;
     transform: translate(-30px, -30px);
     @media ${cssBreakPoints.mobile} {
          top: 74px;
          left: 50%;
          transform: translate(-15px, -50%);
     }
`;
