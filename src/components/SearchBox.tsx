import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
type Props = {
     display?: boolean;
     results?: string[] | [];
     hoverIndexResult?: number;
     index?: number;
     onClick?: () => void;
     id?: any;
};
const StyledigContainer = styled.div<Props>`
     display: ${(props) => (props.display === true ? "inline-block" : "none")};
     width: 476px;
     border-radius: 30px;
     box-shadow: 0 4px 80px 0 rgba(0, 0, 0, 0.16);
     background-color: ${themes.white};
     position: absolute;
     top: 86px;
     left: 50%;
     transform: translate(-50%, 0);
     z-index: 2;
     padding: 12px 0;
     max-height: 372px;
`;
const StyledResultContainer = styled.div<Props>`
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
`;
const StyledContentWrapper = styled.div<Props>`
     margin: 24px auto auto 36px;
     width: 100%;
`;
const StyledItem = styled.p<Props>`
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
const SearchBox: React.FC<Props> = (props) => {
     return (
          <StyledigContainer display={props.display}>
               <StyledResultContainer id="scroll">
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
                                             onClick={() => {}}
                                        >
                                             {item.LocalizedName}
                                        </StyledItem>
                                   );
                              })}
                    </StyledContentWrapper>
               </StyledResultContainer>
          </StyledigContainer>
     );
};

export default SearchBox;
