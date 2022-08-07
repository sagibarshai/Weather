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
     -webkit-filter: blur(1px);
     filter: blur(1px);
     background-color: rgba(255, 255, 255, 0.3);
     margin-top: 24px;
     margin-bottom: 85px;
`;
