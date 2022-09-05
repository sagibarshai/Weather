import styled, { css } from "styled-components";
import themes from "../../shared/themes/themes";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
import { Props } from "./types";
export const StyledLoginPageContainer = styled.div<Props>`
     display: inline-block;
     width: 100vw;
     min-height: 100vh;
`;
export const StyledLoginContainer = styled.form<Props>`
     background-color: ${themes.white};
     height: {props => props.serverError? '743px' : '649px'};
     width:732px;
     box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.16);
     text-align: center;
     position: fixed;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%);
     border-radius: 30px;
     padding:54px;
     display: flex;
     justify-content: center;
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
          height: 75vh;
          top:unset;
          position: fixed;
          bottom: 0;
          transform:translate(-50%,0);
          padding: 0;
          ${(props) =>
               props.mobileServerError === true &&
               css`
                    height: 82.5vh;
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
          /* margin: 54px 0 0 0; */
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
export const StyledContentContainer = styled.div`
     /* display: none; */
     display: flex;
     flex-direction: column;
     justify-content: center;
     /* margin: 54px 54px 54px 0; */
     width: 100%;
     height: 100%;
`;
