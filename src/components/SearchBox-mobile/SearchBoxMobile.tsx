import { useEffect, useState } from "react";
import HashLoading from "../../shared/Loaing-elements/HashLoading";
import { ReactComponent as IconArrowLeft } from "../../shared/svg/arrow-left.svg";
import { ReactComponent as IconSearch } from "../../shared/svg/search-dark.svg";
import { ReactComponent as IconCity } from "../../shared/svg/city.svg";
import { StyledIcon } from "../../shared/Icons/Icon";
import Input from "../../shared/UIElements/Inputs/Input/Input";
import { search } from "../../shared/utils/Services/Accuweather-Api/search";
import { Result } from "../SearchBox/types";
import { useQuery, useQueryClient } from "react-query";
import useDebounce from "../../shared/utils/hooks/useDebouncedSearch";
import { useNavigate, useLocation } from "react-router-dom";
import { Props } from "./types";
import {
     StyledButton,
     StyledMobileSearchBoxContainer,
     StyledResultCountry,
     StyledResultDiv,
     StyledResultItem,
     StyledResultList,
     StyledText,
} from "./style";

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
     const { isLoading, data } = useQuery(
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
               <HashLoading
                    loading={isLoading}
                    fixedCenter={true}
                    color="#000000"
                    size={30}
               />
               {Array.isArray(searchResults) && (
                    <StyledResultDiv>
                         <StyledResultList>
                              {searchResults.map((item: any, index: number) => (
                                   <StyledResultItem
                                        key={index}
                                        onClick={() => {
                                             props.setOpenSearchBoxMobile(
                                                  false
                                             );
                                             props.setExistingCity &&
                                                  props.setExistingCity({
                                                       ...item,
                                                       key: item.Key,
                                                  });
                                             {
                                                  location.pathname !==
                                                       "/home" &&
                                                       navigate("/home", {
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
                                                       });
                                             }
                                        }}
                                   >
                                        {item.LocalizedName},
                                        <StyledResultCountry>
                                             {" "}
                                             {item.Country.LocalizedName}
                                        </StyledResultCountry>
                                   </StyledResultItem>
                              ))}
                         </StyledResultList>
                         {!searchResults.length && (
                              <StyledIcon margin="20px 0 0 0">
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
