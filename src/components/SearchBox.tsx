import styled, { css } from "styled-components";
import themes from "../shared/themes/themes";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { StyledIcon } from "../shared/Icons/Icon";
export type Result = {
     LocalizedName: string;
     Country: { LocalizedName: string };
};

type Props = {
     display?: boolean;
     results?: Result[] | [];
     noResultAndEnter?: boolean;
     hoverIndexResult?: number;
     index?: number;
     onClick?: () => void;
     id?: any;
     searchInput?: string;
     height?: string;
     backgroundColor?: string;
     top?: string;
     overflow?: string;
     boxShadow?: string;
     color?: string;
};
const StyledBigContainer = styled.div<Props>`
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
     z-index: 2;
     padding: 12px 0;
     max-height: 372px;
     height: ${(props) => props.height};
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
     overflow: ${(props) => props.overflow};
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
const StyledText = styled.p<Props>`
     width: 416px;
     font-family: inherit;
     font-size: 1.8rem;
     line-height: 1.5;
     text-align: center;
     color: ${(props) => props.color || themes.secondary};
     margin-top: 208px;
`;
const SearchBox: React.FC<Props> = (props) => {
     if (props.noResultAndEnter) {
          console.log("props");
          return (
               <StyledBigContainer
                    id="scroll"
                    display={props.display}
                    height="326px"
                    backgroundColor="transparent"
                    top="216px"
                    boxShadow="none"
               >
                    <StyledResultContainer overflow="hidden">
                         <StyledContentWrapper>
                              <StyledIcon
                                   position="absolute"
                                   top="64px"
                                   left="50%"
                                   transform="translate(-50%,0)"
                              >
                                   <IconCity />
                              </StyledIcon>
                              <StyledText color={themes.white}>
                                   We couldn’t find any city named "
                                   {props.searchInput}", please try again.
                              </StyledText>
                         </StyledContentWrapper>
                    </StyledResultContainer>
               </StyledBigContainer>
          );
     }

     if (props.results?.length === 0)
          return (
               <StyledBigContainer
                    id="scroll"
                    display={props.display}
                    height="326px"
               >
                    <StyledResultContainer>
                         <StyledContentWrapper>
                              <StyledIcon
                                   position="absolute"
                                   top="64px"
                                   left="50%"
                                   transform="translate(-50%,0)"
                              >
                                   <IconCity />
                              </StyledIcon>
                              <StyledText>
                                   We couldn’t find any city named "
                                   {props.searchInput}", please try again.
                              </StyledText>
                         </StyledContentWrapper>
                    </StyledResultContainer>
               </StyledBigContainer>
          );

     return (
          <StyledBigContainer display={props.display}>
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
                                             {item.LocalizedName},
                                             {item.Country.LocalizedName}
                                        </StyledItem>
                                   );
                              })}
                    </StyledContentWrapper>
               </StyledResultContainer>
          </StyledBigContainer>
     );
};

export default SearchBox;
