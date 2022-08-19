import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useScreenWidth } from "../shared/utils/getScreenWidth";
import MobileHeader from "../components/MobileHeader";
import { Result } from "../components/SearchBox";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconSearchWhite } from "../shared/svg/search-white.svg";
import { ReactComponent as IconStars } from "../shared/svg/stars.svg";
import { ReactComponent as IconFavoriteFull } from "../shared/svg/fav-full.svg";
import {
     StyledFavoritePageContainer,
     StyledCenteredDiv,
     StyledContentContainer,
     StyledPageTitle,
     StyledSearchInput,
     StyledInputContainer,
     StyledSubtitle,
     StyledItemsContainer,
     StyledFavoriteItem,
     StyledHr,
} from "./styles/StyledFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getFromFavorites } from "../shared/utils/Services/Abra-Server/getFromFavorites";
type FavoriteType = {
     key: string;
     city: string;
     country: string;
};
const Favorites = () => {
     const deviceValue = useScreenWidth()[0];
     const [renderMobile, setRenderMobile] = useState<boolean>(true);
     const [renderLaptopAnDesktop, setRenderLaptopAnDesktop] =
          useState<boolean>(true);
     const [noResultAndEnter, setNoResultAndEnter] = useState<boolean>(false);
     const [searchInput, setSearchInput] = useState<string>("");
     const [searchResults, setSearchResults] = useState<[] | Result[]>([]);
     const [selectedCityKey, setSelectedCityKey] = useState<
          string | number | null
     >(null);
     const [favoritesList, setFavoritesList] = useState<[] | FavoriteType[]>(
          []
     );
     const [favoritesSearch, setFavoritesSearch] = useState<string>("");
     const [filteredSearch, setFilteredSearch] = useState<FavoriteType[] | []>(
          favoritesList
     );
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     useEffect(() => {
          if (deviceValue === "bigDesktop" || deviceValue === "laptop") {
               setRenderLaptopAnDesktop(true);
               setRenderMobile(false);
          } else {
               setRenderLaptopAnDesktop(false);
               setRenderMobile(true);
          }
     }, [deviceValue]);
     console.log(filteredSearch);
     useEffect(() => {
          getFromFavorites()
               .then((res) => {
                    setFavoritesList(res?.data.results);
                    setFilteredSearch(res?.data.results);
               })
               .catch((err) => console.log(err));
     }, []);
     useEffect(() => {
          const filteredArr: FavoriteType[] | [] = [];
          if (favoritesSearch === "") {
               setFilteredSearch(favoritesList);
               return;
          }
          for (let item of favoritesList) {
               if (
                    item.city
                         .toLocaleLowerCase()
                         .includes(favoritesSearch.toLocaleLowerCase()) ||
                    item.country
                         .toLocaleLowerCase()
                         .includes(favoritesSearch.toLocaleLowerCase())
               )
                    filteredArr.push(item);
          }
          setFilteredSearch(filteredArr);
     }, [favoritesSearch]);
     if (!favoritesList.length && favoritesSearch === "")
          return (
               <>
                    {renderLaptopAnDesktop && (
                         <Header
                              searchResults={searchResults}
                              setSearchResults={setSearchResults}
                              searchInput={searchInput}
                              setSearchInput={setSearchInput}
                              setNoResultAndEnter={setNoResultAndEnter}
                              noResultAndEnter={noResultAndEnter}
                              setSelectedCityKey={setSelectedCityKey}
                         />
                    )}
                    {renderMobile && <MobileHeader />}
                    <StyledFavoritePageContainer
                         renderPraimaryBackground={renderPraimaryBackground}
                    >
                         <StyledCenteredDiv
                              flexDeirection="column"
                              marginTop="66px"
                         >
                              <StyledIcon>
                                   <IconStars />
                              </StyledIcon>
                              <StyledPageTitle
                                   fontSize="3.2rem"
                                   marginTop="36px"
                              >
                                   My favorites
                              </StyledPageTitle>
                              <StyledSubtitle>
                                   Favorites list is empty.
                              </StyledSubtitle>
                         </StyledCenteredDiv>
                    </StyledFavoritePageContainer>
               </>
          );
     return (
          <>
               {renderLaptopAnDesktop && (
                    <Header
                         searchResults={searchResults}
                         setSearchResults={setSearchResults}
                         searchInput={searchInput}
                         setSearchInput={setSearchInput}
                         setNoResultAndEnter={setNoResultAndEnter}
                         noResultAndEnter={noResultAndEnter}
                         setSelectedCityKey={setSelectedCityKey}
                    />
               )}
               {renderMobile && <MobileHeader />}
               <StyledFavoritePageContainer
                    renderPraimaryBackground={renderPraimaryBackground}
               >
                    <StyledContentContainer>
                         <StyledPageTitle>Favorites</StyledPageTitle>
                         <StyledInputContainer>
                              <StyledSearchInput
                                   placeholder="Search from favorite..."
                                   value={favoritesSearch}
                                   onChange={(e: any) =>
                                        setFavoritesSearch(e.target.value)
                                   }
                              />
                              <StyledIcon
                                   position="absolute"
                                   right="24px"
                                   top="50%"
                                   transform="translate(0%,-50%)"
                              >
                                   <IconSearchWhite />
                              </StyledIcon>
                         </StyledInputContainer>
                         <StyledItemsContainer>
                              {filteredSearch.map((fav) => {
                                   return (
                                        <StyledFavoriteItem key={fav.key}>
                                             <StyledSubtitle
                                                  fontSize="3.2rem"
                                                  fontWeight="bold"
                                             >
                                                  {fav.city}
                                             </StyledSubtitle>
                                             <StyledSubtitle
                                                  fontSize="2.4rem"
                                                  fontWeight="500"
                                                  marginTop="4px"
                                             >
                                                  {fav.country}
                                             </StyledSubtitle>
                                             <StyledHr />
                                             <StyledIcon
                                                  position="absolute"
                                                  top="50%"
                                                  right="10px"
                                                  transform="translateY(-50%)"
                                             >
                                                  <IconFavoriteFull />
                                             </StyledIcon>
                                        </StyledFavoriteItem>
                                   );
                              })}
                         </StyledItemsContainer>
                    </StyledContentContainer>
               </StyledFavoritePageContainer>
          </>
     );
};

export default Favorites;
