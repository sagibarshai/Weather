import styled from "styled-components";
import themes from "../../shared/themes/themes";
import cssBreakPoints from "../../shared/cssBreakPoints/cssBreakPoints";
export const StyledMobileSearchBoxContainer = styled.div`
     display: none;
     height: 90vh;
     width: 100vw;
     background-color: #fcfcfc;
     position: fixed;
     z-index: 2;
     bottom: 0;
     border-radius: 30px 30px 0 0;
     @media ${cssBreakPoints.mobile} {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
     }
`;
export const StyledResultDiv = styled.div`
     height: 83vh;
     display: flex;
     flex-direction: column;
     width: 100%;
     align-items: center;
     overflow-y: auto;
`;
export const StyledText = styled.p`
     width: 270px;
     height: 18px;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.secondary};
     margin-top: 36px;
     text-align: center;
`;
export const StyledButton = styled.button`
     background-color: transparent;
     border: none;
     align-self: flex-start;
     margin: 36px auto auto 30px;
`;
export const StyledResultList = styled.div`
     margin: 21px 0 0 30px;
     align-self: flex-start;
     display: flex;
     flex-direction: column;
     gap: 16px;
     margin-bottom: 50px;
`;
export const StyledResultItem = styled.button`
     all: unset;
     display: block;
     height: 27px;
     font-family: inherit;
     font-size: 1.8rem;
     font-weight: bold;
     line-height: 1.2;
     color: ${themes.secondary};
`;
export const StyledResultCountry = styled.span`
     font-weight: normal;
`;
