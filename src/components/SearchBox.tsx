import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
import { useState } from "react";
type Props = {
     display?: boolean;
     results?: string[] | [];
     hoverIndexResult?: number;
     index?: number;
};

const StyledResultContainer = styled.div<Props>`
     display: ${(props) => (props.display === true ? "inline-block" : "none")};
     width: 476px;
     max-height: 372px;
     padding: 23px 0 19px;
     border-radius: 30px;
     box-shadow: 0 4px 80px 0 rgba(0, 0, 0, 0.16);
     background-color: ${themes.white};
     position: absolute;
     top: 86px;
     left: 50%;
     transform: translate(-50%, 0);
     z-index: 2;
     overflow-y: scroll;
     scroll-behavior: auto;
     overflow-x: hidden;
`;
const StyledContentWrapper = styled.div`
     margin: 24px auto auto 36px;
     width: 100%;
`;
const StyledItem = styled.p<Props>`
     font-family: inherit;
     font-size: 2rem;
     font-weight: bold;
     line-height: 1.5;
     color: ${themes.secondary};
     background-color: transparent;
     border: none;
     display: block;
     width: 100%;
     ${(props) =>
          props.hoverIndexResult === props.index &&
          css`
               background-color: gray;
          `}
`;
const SearchBox: React.FC<Props> = (props) => {
     return (
          <StyledResultContainer display={props.display}>
               <StyledContentWrapper>
                    {props.results &&
                         props.results.map((item, index) => (
                              <StyledItem
                                   key={index}
                                   hoverIndexResult={props.hoverIndexResult}
                                   index={index}
                              >
                                   {item}
                              </StyledItem>
                         ))}
               </StyledContentWrapper>
          </StyledResultContainer>
     );
};

export default SearchBox;
