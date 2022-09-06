import {
     StyledBigContainer,
     StyledContentWrapper,
     StyledConutryText,
     StyledItem,
     StyledResultContainer,
     StyledText,
} from "./style";
import { ReactComponent as IconCity } from "../../shared/svg/city.svg";
import { StyledIcon } from "../../shared/Icons/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { Props } from "./types";
import HashLoading from "../../shared/Loaing-elements/HashLoading/HashLoading";
const SearchBox: React.FC<Props> = (props) => {
     const navigate = useNavigate();
     const location = useLocation();
     if (props.searchIsLoading) {
          return (
               <StyledBigContainer
                    id="scroll"
                    display={props.display}
                    height="326px"
               >
                    <StyledResultContainer>
                         <HashLoading
                              color="#000000"
                              loading={props.searchIsLoading}
                              fixedCenter={true}
                              size={30}
                         />
                    </StyledResultContainer>
               </StyledBigContainer>
          );
     } else if (props.results?.length === 0 && !props.noResultAndEnter)
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
     else if (!props.noResultAndEnter)
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
                                                  onClick={() => {
                                                       let key = item.Key;

                                                       props.setExistingCity &&
                                                            props.setExistingCity(
                                                                 {
                                                                      ...item,
                                                                      key,
                                                                 }
                                                            );
                                                       {
                                                            location.pathname !==
                                                                 "/home" &&
                                                                 navigate(
                                                                      "/home",
                                                                      {
                                                                           state: {
                                                                                selectedCityData:
                                                                                     {
                                                                                          key: item.Key,
                                                                                          LocalizedName:
                                                                                               item.LocalizedName,
                                                                                          Country: {
                                                                                               LocalizedName:
                                                                                                    item
                                                                                                         .Country
                                                                                                         .LocalizedName,
                                                                                          },
                                                                                     },
                                                                           },
                                                                      }
                                                                 );
                                                       }
                                                  }}
                                             >
                                                  {item.LocalizedName},
                                                  <StyledConutryText>
                                                       {
                                                            item.Country
                                                                 .LocalizedName
                                                       }
                                                  </StyledConutryText>
                                             </StyledItem>
                                        );
                                   })}
                         </StyledContentWrapper>
                    </StyledResultContainer>
               </StyledBigContainer>
          );
     else return <></>;
};

export default SearchBox;
