import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueries, useQueryClient } from "react-query";

import { getFromFavorites } from "../../shared/utils/Services/Abra-Server/getFromFavorites";
import { favoritesHandler } from "../../shared/utils/Services/Abra-Server/favoritesHandler";
import { getCoordsOfCity } from "../../shared/utils/Services/Geocoding-Api/getCoordsOfCity";
import { getHourlyForcast } from "../../shared/utils/Services/Accuweather-Api/getHourlyForcast";
import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";

import { StyledIcon } from "../../shared/Icons/Icon";
import { useFilteredSearch } from "../../shared/utils/hooks/useFiteredSearch";
import { toggleMobileMenu, togglePopup } from "../../redux/headerSlice";
import HashLoading from "../../shared/Loaing-elements/HashLoading/HashLoading";
import themes from "../../shared/themes/themes";
import Notification from "../../shared/notifacation/Notification";
import Popup from "../../components/Popup/Popup";
import DisplayMap from "../../components/Map/Map";

import { ReactComponent as IconSearchWhite } from "../../shared/svg/search-white.svg";
import { ReactComponent as IconStars } from "../../shared/svg/stars.svg";
import { ReactComponent as IconFavoriteFull } from "../../shared/svg/fav-full.svg";
import { ReactComponent as IconSuccses } from "../../shared/svg/check-v.svg";
import { ReactComponent as IconLogo } from "../../shared/svg/logo-small.svg";

import { StoreState } from "../../redux/store";
import { SharedPageProps } from "../SharedTemplate/types";
import { Coords } from "../../components/Map/types";
import { FavoriteType } from "./types";

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
     const [openNotification, setOpenNotification] = useState<boolean>(false);
     const [exsistingItem, setExsistingItem] = useState<null | FavoriteType>(
          null
     );
     const [openPopupRemoveFavorites, setOpenPopupRemoveFavorites] =
          useState<boolean>(false);
     const [showInfo, setShowInfo] = useState<boolean>(false);

     const renderPraimaryBackground = useSelector(
          (state: StoreState) => state.headerSlice.renderPraimaryBackground
     );
     const openPopup = useSelector(
          (state: StoreState) => state.headerSlice.openPopup
     );
     const openMap = useSelector(
          (state: StoreState) => state.headerSlice.openMap
     );
     const openMenuMobile = useSelector(
          (state: StoreState) => state.headerSlice.openMobileMenu
     );

     const filteredFavorites = useFilteredSearch(
          favoritesList,
          favoritesSearch,
          ["city", "country"]
     );

     useEffect(() => {
          if (markerCoordsArray.length === 0) {
               setShowInfo(true);
               setTimeout(() => setShowInfo(false), 5000);
          }
     }, []);
     useEffect(() => {
          if (pageProps.noResultAndEnter) {
               navigate("/home", {
                    state: { noResultAndEnter: pageProps.noResultAndEnter },
               });
          }
     }, [pageProps.noResultAndEnter]);
     useEffect(() => {
          if (!queryClient.getQueryData("favorites")) {
               const queryGetFavoritesData = async () => {
                    try {
                         const queryResponse: {
                              data: { results: FavoriteType[] };
                         } = await queryClient.fetchQuery(
                              "favorites",
                              getFromFavorites
                         );
                         setFavoritesList(queryResponse?.data?.results);
                    } catch (err) {
                         pageProps.setServerError(true);
                         console.log(err);
                    }
               };
               queryGetFavoritesData();
          } else
               setFavoritesList(
                    queryClient.getQueryData("favorites").data.results
               );
     }, []);
     useEffect(() => {
          setFilteredSearch(filteredFavorites);
     }, [filteredFavorites]);
     const { isLoading } = useQuery("favorites", getFromFavorites, {
          cacheTime: Infinity,
          staleTime: Infinity,
          onSuccess: (data: { data: { results: [] | FavoriteType[] } }) => {
               setFavoritesList(data?.data?.results);
          },
          onError: (err: any) => {
               console.log(err);
               pageProps.setServerError(true);
          },
     });
     const { mutate } = useMutation(favoritesHandler, {
          onSuccess: () => {
               queryClient.invalidateQueries("favorites");
               setOpenNotification(true);
               setTimeout(() => setOpenNotification(false), 4000);
               setOpenPopupRemoveFavorites(false);
          },
          onError: (err: any) => {
               console.log(err);
               pageProps.setServerError(true);
          },
     });

     let enabledMapApisCalls = false;
     if (openMap && location.pathname === "/favorites")
          enabledMapApisCalls = true;

     const markerCoordsArray: { data: Coords }[] | [] = useQueries(
          favoritesList.map((fav) => {
               return {
                    queryKey: ["getCoords", fav.city],
                    queryFn: () =>
                         getCoordsOfCity(fav.city)
                              .then((res) => {
                                   if (res && res[0]) {
                                        return {
                                             lat: res[0]?.lat,
                                             lng: res[0]?.lon,
                                        };
                                   }
                              })
                              .catch((err) => {
                                   console.log(err);
                              }),
                    staleTime: Infinity,
                    cacheTime: Infinity,
                    enabled: enabledMapApisCalls,
               };
          })
     );
     const citiesKeys: { data: string }[] | [] = useQueries(
          markerCoordsArray.map((coords: { data: Coords }) => {
               return {
                    queryKey: ["coords", coords],
                    queryFn: () =>
                         searchCityByCoords(coords.data)
                              .then((res) => res?.Key)
                              .catch((err) => {
                                   console.log(err);
                              }),
                    staleTime: Infinity,
                    cacheTime: Infinity,
                    enabled: enabledMapApisCalls,
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
                                   if (res && res[0]) {
                                        return {
                                             temp: res[0]?.Temperature?.Value,
                                             unit: res[0]?.Temperature?.Unit,
                                             iconPhrase: res[0]?.IconPhrase,
                                             icon: res[0]?.WeatherIcon,
                                        };
                                   }
                              })
                              .catch((err) => {
                                   console.log(err);
                              }),
                    staleTime: 1000 * 60 * 60,
                    cacheTime: 1000 * 60 * 60,
                    enabled: enabledMapApisCalls,
               };
          })
     );

     const removeFromFavoritesHandler = async () => {
          if (exsistingItem) {
               let favObj = {
                    key: Number(exsistingItem.key),
                    city: exsistingItem.city,
                    country: exsistingItem.country,
               };
               mutate(favObj);
          }
     };

     const onClickHandler = () => {
          if (openPopup) dispatch(togglePopup({ popupType: "logout" }));
          if (openPopupRemoveFavorites) setOpenPopupRemoveFavorites(false);
          if (pageProps.openSearchBoxMobile)
               pageProps.setOpenSearchBoxMobile(false);
          if (openMenuMobile) dispatch(toggleMobileMenu());
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
               <StyledFavoritePageContainer
                    openPopup={
                         openMenuMobile || openPopup || openPopupRemoveFavorites
                    }
               >
                    <DisplayMap
                         setServerError={pageProps.setServerError}
                         citiesHourlyForcast={citiesHourlyForcast}
                         markerCoordsArray={markerCoordsArray}
                         coords={pageProps.coords}
                         zoom={4}
                         center={markerCoordsArray[0]?.data}
                    />
                    {markerCoordsArray.length === 0 && showInfo && (
                         <Notification
                              variant="success"
                              backgroundColor={themes.fadeText}
                              mobileWidth="80vw"
                              position="fixed"
                              mobileBottom="70%"
                              icon={<IconLogo />}
                              message="add cites to your favorites and watch their forecast on map"
                         />
                    )}
               </StyledFavoritePageContainer>
          );
     } else if (
          favoritesList &&
          !favoritesList.length &&
          favoritesSearch === ""
     )
          return (
               <>
                    <StyledFavoritePageContainer
                         openPopup={
                              openMenuMobile ||
                              openPopup ||
                              openPopupRemoveFavorites
                         }
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
               </>
          );
     return (
          <>
               <StyledFavoritePageContainer
                    onClick={onClickHandler}
                    renderPraimaryBackground={renderPraimaryBackground}
                    openPopup={
                         openMenuMobile || openPopup || openPopupRemoveFavorites
                    }
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
                              padding="10px"
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
               {openPopupRemoveFavorites && (
                    <Popup
                         popupType="removeFromFavorites"
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
