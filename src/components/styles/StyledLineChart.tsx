import styled from "styled-components";
import themes from "../../shared/themes/themes";
export const StyledChartBigContainer = styled.div`
     margin: 156px auto 0 auto;
     width: 1180px;
`;
export const StyledTitle = styled.h3`
     all: unset;
     font-family: inherit;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.white};
`;
export const StyledChartContainer = styled.div`
     display: flex;
     height: 602px;
     padding: 16px 96px 16px 95px;
     border-radius: 20px;
     /* -webkit-filter: blur(1px); */
     /* filter: blur(1px); */
     background-color: rgba(255, 255, 255, 0.3);
     margin-top: 24px;
     margin-bottom: 85px;
     flex-direction: column;
     gap: 20px;
`;
export const StyledDay = styled.span`
     font-family: inherit;
     font-size: 2.4rem;
     font-weight: 500;
     line-height: 1.25;
     color: ${themes.white};
`;
export const StyledColumnDiv = styled.div`
     display: flex;
     flex-direction: column;
     width: 100%;
     /* gap: 10px; */
`;
export const StyledIconsRow = styled.div`
     width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
`;
