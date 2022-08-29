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
import { togglePopup } from "../redux/headerSlice";
import { useDispatch } from "react-redux";
import Notification from "../shared/notifacation/Notification";
import Popup from "../components/Popup";
import { logout } from "../redux/authSlice";
import FooterMobile from "../components/FooterMobile";
import SearchBoxMobile from "../components/SearchBoxMobile";
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
import { addToFavorites } from "../shared/utils/Services/Abra-Server/addToFavorites";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SharedPageProps } from "./Home";
export type FavoriteType = {
     key: number;
     city: string;
     country: string;
     title?: string;
};
const Favorites: React.FC<SharedPageProps> = ({ pageProps }) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

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
     const openPopup = useSelector(
          (state: RootState) => state.headerSlice.openPopup
     );
     const [openNotification, setOpenNotification] = useState<boolean>(false);
     const [exsistingItem, setExsistingItem] = useState<null | FavoriteType>(
          null
     );
     const [openPopupRemoveFavorites, setOpenPopupRemoveFavorites] =
          useState<boolean>(false);

     useEffect(() => {
          if (pageProps.noResultAndEnter) {
               navigate("/home", {
                    state: { noResultAndEnter: pageProps.noResultAndEnter },
               });
          }
     }, [pageProps.noResultAndEnter]);
     const { data, isLoading } = useQuery("favorites", getFromFavorites, {
          cacheTime: Infinity,
          staleTime: Infinity,
          refetchOnMount: true,
          refetchOnReconnect: true,
     });
     const { mutate } = useMutation(addToFavorites, {
          onSuccess: () => {
               setTimeout(() => {
                    setFavoritesList(updatedListFunction());
                    setFilteredSearch(updatedListFunction());
               }, 500);
          },
          onError: (e: any) => console.log(e),
     });
     const removeFromFavoritesHandler = async () => {
          setOpenNotification(true);
          setTimeout(() => setOpenNotification(false), 4000);
          setOpenPopupRemoveFavorites(false);
          if (exsistingItem) {
               exsistingItem.title = "deleted item";
               let favObj = {
                    key: exsistingItem.key,
                    city: exsistingItem.city,
                    country: exsistingItem.country,
                    title: exsistingItem.title,
               };
               mutate(favObj);
          }
     };

     const updatedListFunction = () => {
          const updatedList: FavoriteType[] | [] | any = [];
          if (data) {
               const list = data.data.results;
               for (let item of list) {
                    if (item.title === "deleted item") continue;
                    else updatedList.push(item);
               }
          }
          return updatedList;
     };
     useEffect(() => setFilteredSearch(favoritesList), [favoritesList]);
     useEffect(() => {
          setFavoritesList(updatedListFunction());
          setFilteredSearch(updatedListFunction());
     }, [data]);

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
          if (openPopup) dispatch(togglePopup());
          if (openPopupRemoveFavorites) setOpenPopupRemoveFavorites(false);
          if (pageProps.openSearchBoxMobile)
               pageProps.setOpenSearchBoxMobile(false);
     };
     if (!favoritesList.length && favoritesSearch === "")
          return (
               <>
                    <StyledFavoritePageContainer
                         openPopup={openPopup}
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
                    {openPopup && (
                         <Popup
                              message="You about to log out from WeatherApp.
                        Are you sure you want to log out?"
                              cancelMessage="I want to stay"
                              callback={() => logout()}
                         />
                    )}
               </>
          );
     return (
          <>
               <StyledFavoritePageContainer
                    onClick={onClickHandler}
                    renderPraimaryBackground={renderPraimaryBackground}
                    openPopup={openPopup}
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
                                                       onClick={() => {
                                                            navigate("/home", {
                                                                 state: {
                                                                      selectedCityData:
                                                                           {
                                                                                key: fav.key,
                                                                                LocalizedName:
                                                                                     fav.city,
                                                                                Country: {
                                                                                     LocalizedName:
                                                                                          fav.country,
                                                                                },
                                                                           },
                                                                 },
                                                            });
                                                       }}
                                                  >
                                                       {fav.city}
                                                  </StyledSubtitle>
                                                  <StyledSubtitle
                                                       fontSize="2.4rem"
                                                       fontSizeMobile="1.8rem"
                                                       fontWeight="500"
                                                       marginTop="4px"
                                                  >
                                                       {fav.country}
                                                  </StyledSubtitle>
                                                  <StyledHr />
                                                  <StyledRemoveFromFavButton
                                                       onClick={() => {
                                                            if (
                                                                 !openPopupRemoveFavorites
                                                            ) {
                                                                 setExsistingItem(
                                                                      fav
                                                                 );
                                                                 setOpenPopupRemoveFavorites(
                                                                      true
                                                                 );
                                                                 dispatch(
                                                                      togglePopup()
                                                                 );
                                                            }
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
                                        <StyledSubtitle
                                             marginTop="36px"
                                             fontSizeMobile="1.4rem"
                                             mobileWidth="70vw"
                                        >
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
               {openPopup && (
                    <Popup
                         title="Log out"
                         message="You about to log out from WeatherApp.
                                  Are you sure you want to log out?"
                         cancelMessage="I want to stay"
                         callback={() => dispatch(logout())}
                         continueButtonText="Yes, log out"
                    />
               )}
               {openPopupRemoveFavorites && openPopup && (
                    <Popup
                         message={`Are you sure you want to remove ${exsistingItem?.city} from favorites list?`}
                         cancelMessage="Keep it"
                         title="Remove from favorites"
                         continueButtonText="Yes, remove"
                         callback={() => {
                              removeFromFavoritesHandler();
                         }}
                         cancelFunction={() => {
                              setOpenPopupRemoveFavorites(false);
                         }}
                    />
               )}
          </>
     );
};

export default Favorites;
