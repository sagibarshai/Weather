import { useEffect, useState } from "react";
import styled from "styled-components";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
import themes from "../shared/themes/themes";
import { ReactComponent as IconArrowLeft } from "../shared/svg/arrow-left.svg";
import { ReactComponent as IconSearch } from "../shared/svg/search-dark.svg";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { StyledIcon } from "../shared/Icons/Icon";
import Input from "../shared/UIElements/Inputs/Input";
import { search } from "../shared/utils/Services/Accuweather-Api/search";
import { Result } from "./SearchBox";
import { useQuery, useQueryClient } from "react-query";
import useDebounce from "../shared/utils/hooks/useDebouncedSearch";
import { useNavigate, useLocation } from "react-router-dom";

const StyledMobileSearchBoxContainer = styled.div`
     display: none;
     height: 90vh;
     width: 100vw;
     background-color: #fcfcfc;
     position: fixed;
     z-index: 2;
     bottom: 0;
     border-radius: 30px 30px 0 0;
     @media ${cssBreakPoints.mobile} {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
     }
`;
const StyledResultDiv = styled.div`
     height: 83vh;
     display: flex;
     flex-direction: column;
     width: 100%;
     align-items: center;
     overflow-y: auto;
`;
const StyledText = styled.p`
     width: 270px;
     height: 18px;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.secondary};
     margin-top: 36px;
     text-align: center;
`;
const StyledButton = styled.button`
     background-color: transparent;
     border: none;
     align-self: flex-start;
     margin: 36px auto auto 30px;
`;
const StyledResultList = styled.div`
     margin: 21px 0 0 30px;
     align-self: flex-start;
     display: flex;
     flex-direction: column;
     gap: 16px;
     margin-bottom: 50px;
`;
const StyledResultItem = styled.button`
     all: unset;
     display: block;
     height: 27px;
     font-family: inherit;
     font-size: 1.8rem;
     font-weight: bold;
     line-height: 1.2;
     color: ${themes.secondary};
`;
const StyledResultCountry = styled.span`
     font-weight: normal;
`;
type Props = {
     setOpenSearchBoxMobile: (x: boolean) => void;
     setExistingCity?: (x: Result) => void;
     existingCity?: Result | null;
};

const SearchBoxMobile: React.FC<Props> = (props) => {
     const location = useLocation();
     const navigate = useNavigate();
     const [searchResults, setSearchResults] = useState<[] | Result[]>([]);
     const [searchInput, setSearchInput] = useState<string>("");

     const [noResults, setNoResults] = useState<boolean>(false);
     const client = useQueryClient();

     const isCached = client.getQueryData(["autocomplete", searchInput], {
          exact: true,
     });
     const debounce = useDebounce(searchInput, 300);
     const { data } = useQuery(
          ["autocomplete", isCached ? searchInput : debounce],
          () => search(isCached ? searchInput : debounce),
          {
               refetchOnmount: false,
               refetchOnReconnect: false,
               cacheTime: Infinity,
               staleTime: Infinity,
          }
     );
     useEffect(() => {
          setSearchResults(data);
          setNoResults(false);
     }, [searchInput, data, debounce]);
     return (
          <StyledMobileSearchBoxContainer>
               <StyledButton
                    onClick={() => props.setOpenSearchBoxMobile(false)}
               >
                    <StyledIcon>
                         <IconArrowLeft />
                    </StyledIcon>
               </StyledButton>
               <Input
                    value={searchInput}
                    onChange={(e: any) => setSearchInput(e.target.value)}
                    variant="inactive"
                    mobileWidth="75vw"
                    height="54px"
                    placeHolder="Try “Tel Aviv - Jaffa”..."
                    fontWeight="bold"
                    marginTop="16px"
               >
                    <StyledIcon
                         position="absolute"
                         right="24px"
                         top="50%"
                         transform="translate(0 , -50%)"
                    >
                         <IconSearch />
                    </StyledIcon>
               </Input>
               {Array.isArray(searchResults) && (
                    <StyledResultDiv>
                         {Array.isArray(searchResults) && (
                              <StyledResultList>
                                   {searchResults.map(
                                        (item: any, index: number) => (
                                             <StyledResultItem
                                                  key={index}
                                                  onClick={() => {
                                                       props.setOpenSearchBoxMobile(
                                                            false
                                                       );
                                                       props.setExistingCity &&
                                                            props.setExistingCity(
                                                                 item
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
                                                  <StyledResultCountry>
                                                       {" "}
                                                       {
                                                            item.Country
                                                                 .LocalizedName
                                                       }
                                                  </StyledResultCountry>
                                             </StyledResultItem>
                                        )
                                   )}
                              </StyledResultList>
                         )}
                         {!searchResults.length && (
                              <StyledIcon margin="103px 0 0 0">
                                   <IconCity />
                              </StyledIcon>
                         )}
                         {!searchResults.length && (
                              <StyledText>
                                   {searchInput === "" && noResults === false
                                        ? "Please search any city in the search button."
                                        : `We couldn’t find any city named "${searchInput}",  
                                             please try again.`}
                              </StyledText>
                         )}
                    </StyledResultDiv>
               )}
               {!searchResults && <StyledResultDiv />}
          </StyledMobileSearchBoxContainer>
     );
};

export default SearchBoxMobile;
