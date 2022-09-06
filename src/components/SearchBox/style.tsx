import styled, { css } from "styled-components";
import themes from "../../shared/themes/themes";
import { Props } from "./types";
export const StyledBigContainer = styled.div<Props>`
     display: ${(props) => (props.display === true ? "inline-block" : "none")};
     width: 476px;
     border-radius: 30px;
     box-shadow: ${(props) =>
          props.boxShadow || "0 4px 80px 0 rgba(0, 0, 0, 0.16)"};
     background-color: ${(props) => props.backgroundColor || themes.white};
     position: absolute;
     top: ${(props) => props.top || "86px"};
     left: 50%;
     transform: translate(-50%, 0);
     z-index: 5;
     padding: 12px 0;
     max-height: 372px;
     height: ${(props) => props.height};
`;
export const StyledResultContainer = styled.div<Props>`
     max-height: 372px;
     width: 99%;
     overflow-y: scroll;
     overflow-x: hidden;
     &::-webkit-scrollbar {
          width: 6px;
          border-radius: 100px;
          background-color: #e9e9e9;
     }
     &::-webkit-scrollbar-track {
          background-color: ${themes.grayBackground};
          opacity: 0.5;
     }
     &::-webkit-scrollbar-thumb {
          background-color: ${themes.scroll};
          opacity: 1;
     }
     overflow: ${(props) => props.overflow};
`;
export const StyledContentWrapper = styled.div<Props>`
     margin: 24px auto auto 36px;
     width: 100%;
`;
export const StyledItem = styled.p<Props>`
     padding: 0;
     font-family: inherit;
     font-size: 2rem;
     height: 54px;
     font-weight: bold;
     line-height: 1.5;
     color: ${themes.secondary};
     background-color: transparent;
     border: none;
     display: block;
     display: flex;
     align-items: center;
     cursor: pointer;
     width: 100%;
     ${(props) =>
          props.hoverIndexResult === props.index &&
          css`
               background-color: ${themes.grayBackground};
          `}
`;
export const StyledText = styled.p<Props>`
     width: 416px;
     font-family: inherit;
     font-size: 1.8rem;
     line-height: 1.5;
     text-align: center;
     color: ${(props) => props.color || themes.secondary};
     margin-top: 208px;
`;
export const StyledConutryText = styled.span`
     font-weight: normal;
`;
