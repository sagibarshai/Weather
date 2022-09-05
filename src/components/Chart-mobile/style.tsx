import styled from "styled-components";
import themes from "../../shared/themes/themes";
export const StyledMobileLineContainer = styled.div`
     width: 100vw;
     height: 55vh;
     background-color: ${themes.white};
     position: fixed;
     bottom: 0;
     z-index: 5;
     box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.16);
     border-radius: 30px 30px 0 0;
     overflow-y: scroll;
     padding-bottom: 100px;
`;
export const StyledTitle = styled.h4`
     font-family: inherit;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.secondary};
     margin: 40px auto 36px 30px;
`;
export const StyledSelectedItem = styled.div`
     position: absolute;
     top: 100%;
     left: 13%;
     transform: translate(-50%, -50%);
     width: 78px;
     height: 323px;
     flex-grow: 0;
     padding: 16px 21px 15px 22px;
     border-radius: 20px;
     -webkit-filter: blur(1px);
     filter: blur(1px);
     background-color: #f2f2f2;
`;
