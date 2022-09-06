import { useEffect, useState } from "react";
import HashLoading from "../../shared/Loaing-elements/HashLoading";
import { selectCity } from "../../shared/utils/Services/Accuweather-Api/selectCity";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { convertDateToText } from "../../shared/utils/Dates/convertDateToText";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import { StyledIcon } from "../../shared/Icons/Icon";
import { ReactComponent as IconFavWhiteFull } from "../../shared/svg/fav-full.svg";
import { ReactComponent as IconFavWhite } from "../../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconMapBlack } from "../../shared/svg/map-black.svg";
import { ReactComponent as IconError } from "../../shared/svg/info-circle.svg";
import { returnShortDayFromDate } from "../../shared/utils/Dates/returnShortDayFromDate";
import { getForcastFor12Hours } from "../../shared/utils/Services/Accuweather-Api/getForcastFor12Hours";
import LineChart from "../Chart/LineChart";
import DisplayDailyData from "../DisplayForcastData/DisplayDailyData";
import { getDayNumber } from "../../shared/utils/Dates/getDateNumber";
import { StyledContainer, StyledMobileAddToFavButton } from "./style";
import LineChartMobile from "../Chart-mobile/LineChartMobile";
import { favoritesHandler } from "../../shared/utils/Services/Abra-Server/favoritesHandler";
import Notification from "../../shared/notifacation/Notification";
import { ReactComponent as IconSuccses } from "../../shared/svg/check-v.svg";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import {
     DeggresType,
     toggleDeggres,
} from "../../shared/utils/Functions/toggleDeggres";
import { FavoriteType } from "../../pages/Favorites/types";
import { getFromFavorites } from "../../shared/utils/Services/Abra-Server/getFromFavorites";
import { DataType, SelectedCityType, forcast12HoursTypeData } from "./types";
import { toggleMap } from "../../redux/headerSlice";
import DisplayWeeklyData from "../DisplayForcastData/DisplayWeeklyData";
import DisplayCityMetaData from "../DisplayForcastData/DisplayCityMetaData";
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const dispatch = useDispatch();
     const queryClient = useQueryClient();
     const [itemIsOnFavorites, setItemIsOnFavorites] = useState<boolean>(false);
     const [favoritesList, setFavoritesList] = useState<
          null | [] | FavoriteType[]
     >(queryClient.getQueryData("favorites")?.data?.results);
     const [now, setNow] = useState<string>(convertDateToText());
     const [showAddToFavoritesNotification, setShowAddToFavoritesNotification] =
          useState<boolean>(false);
     const [errorNotification, setErrorNotification] = useState<boolean>(false);
     const [selected, setSelected] = useState<number>(0);
     const { mutate } = useMutation(favoritesHandler, {
          onSuccess: (data: { status: number }) => {
               queryClient.invalidateQueries("favorites");
               setShowAddToFavoritesNotification(true);
               setTimeout(() => setShowAddToFavoritesNotification(false), 4000);
               if (data.status === 204) setItemIsOnFavorites(false);
               else if (data.status === 200 || 201) setItemIsOnFavorites(true);
          },
          onError: (e: any) => console.log(e),
     });
     let enabled = false;
     if (props.existingCity) enabled = true;
     useEffect(() => {
          if (favoritesList && props.existingCity) {
               const favoriteItem = favoritesList?.find(
                    (fav) => fav.key == props?.existingCity?.key
               );
               if (favoriteItem) setItemIsOnFavorites(true);
               else setItemIsOnFavorites(false);
          }
     }, [props.existingCity, favoritesList]);
     const { isLoading: getFromFavoritesLoading } = useQuery(
          "favorites",
          getFromFavorites,
          {
               cacheTime: Infinity,
               staleTime: Infinity,
               refetchOnMount: true,
               refetchOnReconnect: true,
               onSuccess: (data: {
                    data: { results: FavoriteType[] | [] };
               }) => {
                    setFavoritesList(data.data.results);
               },
               onError: (e: any) => {
                    console.log(e);
               },
          }
     );
     const degressType: DeggresType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );
     const [open5daysForcastMobile, setOpen5daysForcastMobile] =
          useState<boolean>(false);
     const { data: forcasst5Days, isLoading: forcast5DaysLoading } = useQuery(
          ["5daysForcast", props?.existingCity?.key],
          () => selectCity(props?.existingCity?.key),
          { cacheTime: twelveHours, staleTime: twelveHours, enabled }
     ) as DataType;

     setInterval(() => {
          setNow(convertDateToText());
     }, 1000 * 60);
     const { data: forcast12Hours, isLoading: forcast12HoursLoading } =
          useQuery(
               ["forcast12Hours", props?.existingCity?.key],
               () => getForcastFor12Hours(props?.existingCity?.key),
               {
                    cacheTime: twelveHours / 6,
                    staleTime: twelveHours / 6,
                    enabled,
               }
          ) as forcast12HoursTypeData;
     const forcast5daystemperatureDay: number[] = [];
     const forcast5daystemperatureNight: number[] = [];
     const forcast5daysLablesDays: string[] = [];
     const forcast5daysLablesDates: string[] = [];
     const lineChartData = {
          forcast5daystemperatureDay,
          forcast5daystemperatureNight,
          forcast5daysLablesDates,
          forcast5daysLablesDays,
     };
     let isLoading = false;
     if (forcast5DaysLoading || forcast12HoursLoading) isLoading = true;
     return (
          <>
               <HashLoading
                    loading={isLoading}
                    color="#FFFFFF"
                    fixedCenter={true}
                    size={40}
               />
               {props.existingCity && forcasst5Days && forcast12Hours && (
                    <>
                         {forcasst5Days.DailyForecasts.map((day) => {
                              forcast5daystemperatureDay.push(
                                   toggleDeggres(
                                        degressType,
                                        day.Temperature.Maximum.Value,
                                        day.Temperature.Maximum.Unit
                                   )
                              );
                              forcast5daystemperatureNight.push(
                                   toggleDeggres(
                                        degressType,
                                        day.Temperature.Minimum.Value,
                                        day.Temperature.Minimum.Unit
                                   )
                              );

                              forcast5daysLablesDays.push(
                                   String(returnShortDayFromDate(day.Date))
                              );
                              forcast5daysLablesDates.push(
                                   getDayNumber(String(day.Date))
                              );
                         })}
                         {props.renderMobile && (
                              <StyledMobileAddToFavButton
                                   onClick={() => {
                                        if (props.existingCity) {
                                             const cityObj = {
                                                  key: Number(
                                                       props.existingCity.key
                                                  ),
                                                  city: props.existingCity
                                                       .LocalizedName,
                                                  country: props.existingCity
                                                       .Country.LocalizedName,
                                             };
                                             mutate(cityObj);
                                        }
                                   }}
                              >
                                   {itemIsOnFavorites ? (
                                        <IconFavWhiteFull />
                                   ) : (
                                        <IconFavWhite />
                                   )}
                              </StyledMobileAddToFavButton>
                         )}
                         <StyledContainer
                              onClick={() =>
                                   open5daysForcastMobile &&
                                   setOpen5daysForcastMobile(false)
                              }
                         >
                              <DisplayCityMetaData
                                   renderLaptopAnDesktop={
                                        props.renderLaptopAnDesktop
                                   }
                                   renderMobile={props.renderMobile}
                                   now={now}
                                   forcasst5Days={forcasst5Days}
                                   forcast12Hours={forcast12Hours}
                                   mutate={mutate}
                                   showAddToFavoritesNotification={
                                        showAddToFavoritesNotification
                                   }
                                   existingCity={props.existingCity}
                                   itemIsOnFavorites={itemIsOnFavorites}
                              />

                              <DisplayWeeklyData
                                   renderLaptopAnDesktop={
                                        props.renderLaptopAnDesktop
                                   }
                                   renderMobile={props.renderMobile}
                                   forcasst5Days={forcasst5Days}
                                   setOpen5daysForcastMobile={
                                        setOpen5daysForcastMobile
                                   }
                              />
                              <DisplayDailyData
                                   renderLaptopAnDesktop={
                                        props.renderLaptopAnDesktop
                                   }
                                   renderMobile={props.renderMobile}
                                   selected={selected}
                                   setSelected={setSelected}
                                   forcast12Hours={forcast12Hours}
                              />

                              {props.renderLaptopAnDesktop && (
                                   <LineChart lineChartData={lineChartData} />
                              )}
                              {props.renderMobile && (
                                   <StyledButton
                                        variant="white"
                                        width="114px"
                                        margin="60px auto 0 auto"
                                        fontWeight="bold"
                                        onClick={() => {
                                             if (
                                                  localStorage.getItem("coords")
                                             ) {
                                                  dispatch(toggleMap());
                                             } else {
                                                  setErrorNotification(true);
                                                  setTimeout(
                                                       () =>
                                                            setErrorNotification(
                                                                 false
                                                            ),
                                                       8000
                                                  );
                                             }
                                        }}
                                   >
                                        <StyledIcon marginRight="8px">
                                             <IconMapBlack />
                                        </StyledIcon>
                                        Map
                                   </StyledButton>
                              )}
                              {(showAddToFavoritesNotification ||
                                   errorNotification) && (
                                   <Notification
                                        onClick={() => {
                                             if (errorNotification) {
                                                  localStorage.setItem(
                                                       "coords",
                                                       JSON.stringify({
                                                            lat: 32.852247,
                                                            lng: 35.201315,
                                                       })
                                                  );
                                                  localStorage.setItem(
                                                       "openOnMap",
                                                       "true"
                                                  );
                                                  window.location.reload();
                                             }
                                        }}
                                        mobileTransform={
                                             showAddToFavoritesNotification
                                                  ? "translate(-50%, -100%)"
                                                  : "translate(0%, -100%)"
                                        }
                                        variant={
                                             showAddToFavoritesNotification
                                                  ? "success"
                                                  : "error"
                                        }
                                        animation={true}
                                        animationTime={8000}
                                        mobileWidth={
                                             showAddToFavoritesNotification
                                                  ? "300px"
                                                  : "325px"
                                        }
                                        mobileHeigt={
                                             showAddToFavoritesNotification
                                                  ? "70px"
                                                  : "85px"
                                        }
                                        message={
                                             showAddToFavoritesNotification
                                                  ? `${
                                                         props.existingCity
                                                              .LocalizedName
                                                    } has ${
                                                         !itemIsOnFavorites
                                                              ? "removed from"
                                                              : "add to"
                                                    } favorites `
                                                  : `We having some issues to get your location, please check your device setting and allow location,
                                                       if you want to continue with random location click on this popup.`
                                        }
                                        icon={
                                             showAddToFavoritesNotification ? (
                                                  <IconSuccses />
                                             ) : (
                                                  <IconError />
                                             )
                                        }
                                        positionFixiedBottom={
                                             showAddToFavoritesNotification
                                                  ? false
                                                  : true
                                        }
                                   />
                              )}
                         </StyledContainer>
                    </>
               )}
               {open5daysForcastMobile && props.renderMobile && (
                    <LineChartMobile lineChartData={lineChartData} />
               )}
          </>
     );
};
export default HomePageDisplayCity;
