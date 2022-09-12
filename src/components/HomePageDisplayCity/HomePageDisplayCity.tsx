import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { toggleMap } from "../../redux/headerSlice";

import { StyledButton } from "../../shared/UIElements/Button/Button";
import { StyledIcon } from "../../shared/Icons/Icon";
import HashLoading from "../../shared/Loaing-elements/HashLoading/HashLoading";
import Notification from "../../shared/notifacation/Notification";
import LineChart from "../Chart/LineChart";
import LineChartMobile from "../Chart-mobile/LineChartMobile";
import DisplayDailyData from "../DisplayForcastData/DisplayDailyData";
import DisplayWeeklyData from "../DisplayForcastData/DisplayWeeklyData";
import DisplayCityMetaData from "../DisplayForcastData/DisplayCityMetaData";

import { selectCity } from "../../shared/utils/Services/Accuweather-Api/selectCity";
import { getForcastFor12Hours } from "../../shared/utils/Services/Accuweather-Api/getForcastFor12Hours";
import { getFromFavorites } from "../../shared/utils/Services/Abra-Server/getFromFavorites";
import { favoritesHandler } from "../../shared/utils/Services/Abra-Server/favoritesHandler";

import { convertDateToText } from "../../shared/utils/Dates/convertDateToText";
import { getDayNumber } from "../../shared/utils/Dates/getDateNumber";

import { ReactComponent as IconFavWhiteFull } from "../../shared/svg/fav-full.svg";
import { ReactComponent as IconFavWhite } from "../../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconMapBlack } from "../../shared/svg/map-black.svg";
import { ReactComponent as IconError } from "../../shared/svg/info-circle.svg";
import { returnShortDayFromDate } from "../../shared/utils/Dates/returnShortDayFromDate";
import { ReactComponent as IconSuccses } from "../../shared/svg/check-v.svg";

import { StyledContainer, StyledMobileAddToFavButton } from "./style";

import { StoreState } from "../../redux/store";
import {
     DeggresType,
     toggleDeggres,
} from "../../shared/utils/Functions/toggleDeggres";
import { FavoriteType } from "../../pages/Favorites/types";
import { DataDailyForecastsType, Props, forcast12HoursTypeData } from "./types";

const twelveHours = 1000 * 60 * 60 * 12;

const HomePageDisplayCity: React.FC<Props> = (props) => {
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
     const [open5daysForcastMobile, setOpen5daysForcastMobile] =
          useState<boolean>(false);

     const token = useSelector((state: StoreState) => state.authSlice.token);
     const degressType: DeggresType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );
     setInterval(() => {
          setNow(convertDateToText());
     }, 1000 * 60);

     useEffect(() => {
          if (favoritesList && props.existingCity) {
               const favoriteItem = favoritesList?.find(
                    (fav) => fav.key == props?.existingCity?.key
               );
               if (favoriteItem) setItemIsOnFavorites(true);
               else setItemIsOnFavorites(false);
          }
     }, [props.existingCity, favoritesList]);

     const { mutate } = useMutation(favoritesHandler, {
          onSuccess: (data: { status: number }) => {
               queryClient.invalidateQueries("favorites");
               setShowAddToFavoritesNotification(true);
               setTimeout(() => setShowAddToFavoritesNotification(false), 4000);
               if (data.status === 204) setItemIsOnFavorites(false);
               else if (data.status === 200 || 201) setItemIsOnFavorites(true);
          },
          onError: (e: any) => console.log(e),
          enabled: !token,
     });
     let enabled = false;
     if (props.existingCity) enabled = true;

     useQuery("favorites", getFromFavorites, {
          cacheTime: Infinity,
          staleTime: Infinity,
          onSuccess: (data: { data: { results: FavoriteType[] | [] } }) => {
               setFavoritesList(data.data.results);
          },
          onError: (e: any) => {
               console.log(e);
          },
     });
     const { data: forcasst5Days, isLoading: forcast5DaysLoading } = useQuery(
          ["5daysForcast", props?.existingCity?.key],
          () => selectCity(props?.existingCity?.key),
          { cacheTime: twelveHours, staleTime: twelveHours, enabled }
     ) as DataDailyForecastsType;

     const { data: forcast12Hours, isLoading: forcast12HoursLoading } =
          useQuery(
               ["forcast12Hours", props?.existingCity?.key],
               () => getForcastFor12Hours(props?.existingCity?.key),
               {
                    cacheTime: twelveHours,
                    staleTime: twelveHours,
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
