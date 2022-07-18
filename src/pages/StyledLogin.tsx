import styled from "styled-components";
import themes from "../shared/themes/themes";

type Props = {
     gap?: string;
};
export const StyledLoginContainer = styled.form`
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
`;
export const StyledTitle = styled.h3`
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     color: ${themes.secondary};
     margin: 54px auto;
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
`;
export const StyledHr = styled.hr`
     width: 254px;
     background-color: #f2f2f2;
     height: 1px;
`;
export const StyledSpan = styled.span`
     color: ${themes.secondary};
     font-size: 1.4rem;
`;
