import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useScreenWidth } from "../shared/utils/getScreenWidth";
import MobileHeader from "../components/MobileHeader";
import { Result } from "../components/SearchBox";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconSearchWhite } from "../shared/svg/search-white.svg";
import { ReactComponent as IconStars } from "../shared/svg/stars.svg";
import { ReactComponent as IconFavoriteFull } from "../shared/svg/fav-full.svg";
import { ReactComponent as IconSuccses } from "../shared/svg/check-v.svg";
import { toggleLogoutPopup } from "../redux/headerSlice";
import { useDispatch } from "react-redux";
import Notification from "../shared/notifacation/Notification";
import Popup from "../components/Popup";
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
     StyledRemoveFromFavButton,
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
     const dispatch = useDispatch();
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
     const openLogoutPopup = useSelector(
          (state: RootState) => state.headerSlice.openLogoutPopup
     );
     const [openNotification, setOpenNotification] = useState<boolean>(false);
     const [exsistingItem, setExsistingItem] = useState<null | FavoriteType>(
          null
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

     const removeFromFavoritesHandler = async () => {
          setOpenNotification(true);
          setTimeout(() => setOpenNotification(false), 4000);
     };

     useEffect(() => {
          getFromFavorites()
               .then((res) => {
                    setFavoritesList(res?.data.results);
                    setFilteredSearch(res?.data.results);
               })
               .catch((err) => console.log(err));
     }, []);
     useEffect(() => {
          const filteredArr: FavoriteType[] | [] | any = [];
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
     const onClickHandler = () => {
          if (openLogoutPopup) dispatch(toggleLogoutPopup());
     };
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
                         openLogoutPopup={openLogoutPopup}
                         onClick={onClickHandler}
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
                    {openLogoutPopup && <Popup />}
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
                    onClick={onClickHandler}
                    renderPraimaryBackground={renderPraimaryBackground}
                    openLogoutPopup={openLogoutPopup}
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
                         {filteredSearch.length > 0 && (
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
                                                  <StyledRemoveFromFavButton
                                                       onClick={() => {
                                                            removeFromFavoritesHandler();
                                                            setExsistingItem(
                                                                 fav
                                                            );
                                                       }}
                                                  >
                                                       <StyledIcon
                                                            position="absolute"
                                                            top="50%"
                                                            right="10px"
                                                            transform="translateY(-50%)"
                                                       >
                                                            <IconFavoriteFull />
                                                       </StyledIcon>
                                                  </StyledRemoveFromFavButton>
                                             </StyledFavoriteItem>
                                        );
                                   })}
                              </StyledItemsContainer>
                         )}
                         {filteredSearch.length === 0 &&
                              favoritesSearch !== "" && (
                                   <StyledCenteredDiv
                                        flexDeirection="column"
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50% , -50%)"
                                        width="364px"
                                   >
                                        <StyledIcon>
                                             <IconStars />
                                        </StyledIcon>
                                        <StyledSubtitle marginTop="36px">
                                             We couldn’t find any city named "
                                             {favoritesSearch}" in the Favorites
                                             list, please try again.
                                        </StyledSubtitle>
                                   </StyledCenteredDiv>
                              )}
                    </StyledContentContainer>
                    {openNotification && exsistingItem && (
                         <Notification
                              animation={true}
                              variant="success"
                              icon={<IconSuccses />}
                              message={`${exsistingItem.city} - ${exsistingItem.country} has removed from favorites`}
                         />
                    )}
               </StyledFavoritePageContainer>
               {openLogoutPopup && <Popup />}
          </>
     );
};

export default Favorites;
