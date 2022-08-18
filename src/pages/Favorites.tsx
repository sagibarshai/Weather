import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useScreenWidth } from "../shared/utils/getScreenWidth";
import MobileHeader from "../components/MobileHeader";
import { Result } from "../components/SearchBox";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconSearchWhite } from "../shared/svg/search-white.svg";
import { ReactComponent as IconStars } from "../shared/svg/stars.svg";
import {
     StyledFavoritePageContainer,
     StyledCenteredDiv,
     StyledContentContainer,
     StyledPageTitle,
     StyledSearchInput,
     StyledInputContainer,
     StyledSubtitle,
} from "./styles/StyledFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getFromFavorites } from "../shared/utils/Services/Abra-Server/getFromFavorites";
type FavoriteType = {
     Key: string;
     cityName: string;
     countryName: string;
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
     const [favoritesList, setFavoritesList] = useState<[] | FavoriteType[]>([
          { Key: "f", cityName: "f,n", countryName: "sknf" },
     ]);
     const renderPraimaryBackground = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const [favoritesSearch, setFavoritesSearch] = useState<string>("");
     useEffect(() => {
          if (deviceValue === "bigDesktop" || deviceValue === "laptop") {
               setRenderLaptopAnDesktop(true);
               setRenderMobile(false);
          } else {
               setRenderLaptopAnDesktop(false);
               setRenderMobile(true);
          }
     }, [deviceValue]);
     useEffect(() => {
          getFromFavorites()
               .then((res) => console.log(res))
               .catch((err) => console.log(err));
     }, []);
     if (!favoritesList.length)
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
                    </StyledContentContainer>
               </StyledFavoritePageContainer>
          </>
     );
};

export default Favorites;
