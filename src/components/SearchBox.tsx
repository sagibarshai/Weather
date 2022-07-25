import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
import { useRef } from "react";
type Props = {
     display?: boolean;
     results?: string[] | [];
     hoverIndexResult?: number;
     index?: number;
     onClick?: () => void;
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
     &::-webkit-scrollbar {
          width: 6px;
     }
     &::-webkit-scrollbar-track {
          background-color: ${themes.grayBackground};
          opacity: 0.5;
          height: 50px;
     }
     &::-webkit-scrollbar-thumb {
          background-color: ${themes.scroll};
          opacity: 1;
     }
`;
const StyledContentWrapper = styled.div`
     margin: 24px auto auto 36px;
     width: 100%;
`;
const StyledItem = styled.p<Props>`
     font-family: inherit;
     font-size: 2rem;
     height: 45px;
     font-weight: bold;
     line-height: 1.5;
     color: ${themes.secondary};
     background-color: transparent;
     border: none;
     display: block;
     cursor: pointer;
     width: 100%;
     ${(props) =>
          props.hoverIndexResult === props.index &&
          css`
               background-color: ${themes.grayBackground};
          `}
`;
const SearchBox: React.FC<Props> = (props) => {
     return (
          <StyledResultContainer display={props.display} id="scroll">
               <StyledContentWrapper>
                    {props.results &&
                         props.results.map((item, index) => {
                              return (
                                   <StyledItem
                                        id={index}
                                        key={index}
                                        hoverIndexResult={
                                             props.hoverIndexResult
                                        }
                                        index={index}
                                        onClick={() =>
                                             console.log(props.results[index])
                                        }
                                   >
                                        {item}
                                   </StyledItem>
                              );
                         })}
               </StyledContentWrapper>
          </StyledResultContainer>
     );
};

export default SearchBox;
