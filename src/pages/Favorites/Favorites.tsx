import { useEffect, useState } from "react";
import { StyledIcon } from "../../shared/Icons/Icon";
import { ReactComponent as IconSearchWhite } from "../../shared/svg/search-white.svg";
import { ReactComponent as IconStars } from "../../shared/svg/stars.svg";
import { ReactComponent as IconFavoriteFull } from "../../shared/svg/fav-full.svg";
import { ReactComponent as IconSuccses } from "../../shared/svg/check-v.svg";
import { togglePopup } from "../../redux/headerSlice";
import { useDispatch } from "react-redux";
import Notification from "../../shared/notifacation/Notification";
import Popup from "../../components/Popup/Popup";
import { logout } from "../../redux/authSlice";
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
} from "./style";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { getFromFavorites } from "../../shared/utils/Services/Abra-Server/getFromFavorites";
import { favoritesHandler } from "../../shared/utils/Services/Abra-Server/favoritesHandler";
import { useMutation, useQuery, useQueries, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { SharedPageProps } from "../SharedTemplate/types";
import { getCoordsOfCity } from "../../shared/utils/Services/Geocoding-Api/getCoordsOfCity";
import DisplayMap from "../../components/Map/Map";
import { Coords } from "../../components/Map/types";
import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";
import { getHourlyForcast } from "../../shared/utils/Services/Accuweather-Api/getHourlyForcast";
import { FavoriteType } from "./types";
import HashLoading from "../../shared/Loaing-elements/HashLoading";
const Favorites: React.FC<SharedPageProps> = ({ pageProps }) => {
     const queryClient = useQueryClient();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [favoritesList, setFavoritesList] = useState<[] | FavoriteType[]>(
          []
     );
     const [filteredSearch, setFilteredSearch] = useState<FavoriteType[] | []>(
          favoritesList
     );
     const [favoritesSearch, setFavoritesSearch] = useState<string>("");
     const renderPraimaryBackground = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openPopup = useSelector(
          (state: StoreState) => state.headerSlice.openPopup
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
          onSuccess: (data: { data: { results: [] | FavoriteType[] } }) => {
               setFilteredSearch(data.data.results);
               setFavoritesList(data.data.results);
          },
          onError: () => {},
     });
     const { mutate } = useMutation(favoritesHandler, {
          onSuccess: () => {
               queryClient.invalidateQueries("favorites");
          },
          onError: (e: any) => console.log(e),
     });
     const removeFromFavoritesHandler = async () => {
          if (exsistingItem) {
               setOpenNotification(true);
               setTimeout(() => setOpenNotification(false), 4000);
               setOpenPopupRemoveFavorites(false);
               let favObj = {
                    key: Number(exsistingItem.key),
                    city: exsistingItem.city,
                    country: exsistingItem.country,
               };
               mutate(favObj);
          } else return;
     };
     const openMap = useSelector(
          (state: StoreState) => state.headerSlice.openMap
     );
     useEffect(() => setFilteredSearch(favoritesList), [favoritesList]);
     useEffect(() => {
          if (!data) setFavoritesList([]);
          else setFavoritesList(data?.data?.results);
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
     let enabled = false;
     if (openMap && location.pathname === "/favorites") enabled = true;
     const markerCoordsArray: { data: Coords }[] | [] = useQueries(
          favoritesList.map((fav) => {
               return {
                    queryKey: ["getCoords", fav.city],
                    queryFn: () =>
                         getCoordsOfCity(fav.city)
                              .then((res) => {
                                   return {
                                        lat: res[0].lat,
                                        lng: res[0].lon,
                                   };
                              })
                              .catch((err) => console.log(err)),
                    staleTime: Infinity,
                    cacheTime: Infinity,
                    enabled,
               };
          })
     );
     const citiesKeys: { data: string }[] | [] = useQueries(
          markerCoordsArray.map((coords: { data: Coords }) => {
               return {
                    queryKey: ["coords", coords],
                    queryFn: () =>
                         searchCityByCoords(coords.data)
                              .then((res) => res.Key)
                              .catch((err) => console.log(err)),
                    staleTime: Infinity,
                    cacheTime: Infinity,
                    enabled,
               };
          })
     );
     const citiesHourlyForcast = useQueries(
          citiesKeys.map((cityKey) => {
               return {
                    queryKey: ["hourlyForcastForCityInMap", cityKey.data],
                    queryFn: () =>
                         getHourlyForcast(cityKey.data)
                              .then((res) => {
                                   return {
                                        temp: res[0].Temperature.Value,
                                        unit: res[0].Temperature.Unit,
                                        iconPhrase: res[0].IconPhrase,
                                        icon: res[0].WeatherIcon,
                                   };
                              })
                              .catch((err) => console.log(err)),
                    staleTime: 1000 * 60 * 60,
                    cacheTime: 1000 * 60 * 60,
                    enabled,
               };
          })
     );
     console.log(markerCoordsArray);
     const onClickHandler = () => {
          if (openPopup) dispatch(togglePopup());
          if (openPopupRemoveFavorites) setOpenPopupRemoveFavorites(false);
          if (pageProps.openSearchBoxMobile)
               pageProps.setOpenSearchBoxMobile(false);
     };
     if (isLoading)
          return (
               <HashLoading
                    fixedCenter={true}
                    loading={isLoading}
                    size={30}
                    color="#FFFFFFF"
               />
          );
     else if (openMap) {
          return (
               <>
                    <DisplayMap
                         citiesHourlyForcast={citiesHourlyForcast}
                         markerCoordsArray={markerCoordsArray}
                         coords={pageProps.coords}
                         zoom={4}
                         center={markerCoordsArray[0]?.data}
                    />
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
     } else if (
          favoritesList &&
          !favoritesList.length &&
          favoritesSearch === ""
     )
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
                         {filteredSearch && filteredSearch.length > 0 && (
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
                              mobileWidth="300px"
                              mobileHeigt="50px"
                              mobileTransform="translate(-50%, -100%)"
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
