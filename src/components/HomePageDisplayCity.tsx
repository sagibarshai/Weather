import { useEffect, useState } from "react";
import { selectCity } from "../shared/utils/Services/Accuweather-Api/selectCity";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { convertDateToText } from "../shared/utils/Dates/convertDateToText";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconFavWhiteFull } from "../shared/svg/fav-full.svg";
import { ReactComponent as IconFavWhite } from "../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconMapBlack } from "../shared/svg/map-black.svg";
import { returnShortDayFromDate } from "../shared/utils/Dates/returnShortDayFromDate";
import { getForcastFor12Hours } from "../shared/utils/Services/Accuweather-Api/getForcastFor12Hours";
import LineChart from "./LineChart";
import DisplayDailyData from "./DisplayForcastData/DisplayDailyData";
import { getDayNumber } from "../shared/utils/Dates/getDateNumber";
import {
     StyledContainer,
     StyledMobileAddToFavButton,
} from "./HomePageDisplayCity/StyledHomePageDisplayCity";
import LineChartMobile from "./LineChartMobile";
import { favoritesHandler } from "../shared/utils/Services/Abra-Server/favoritesHandler";
import Notification from "../shared/notifacation/Notification";
import { ReactComponent as IconSuccses } from "../shared/svg/check-v.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
     DeggresType,
     toggleDeggres,
} from "../shared/utils/Functions/toggleDeggres";
import { FavoriteType } from "../pages/Favorites";
import { getFromFavorites } from "../shared/utils/Services/Abra-Server/getFromFavorites";
import {
     DataType,
     SelectedCityType,
     forcast12HoursTypeData,
} from "./HomePageDisplayCity/types";
import { toggleMap } from "../redux/headerSlice";
import DisplayWeeklyData from "./DisplayForcastData/DisplayWeeklyData";
import DisplayCityMetaData from "./DisplayForcastData/DisplayCityMetaData";
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
     useQuery("favorites", getFromFavorites, {
          cacheTime: Infinity,
          staleTime: Infinity,
          refetchOnMount: true,
          refetchOnReconnect: true,
          onSuccess: (data: { data: { results: FavoriteType[] | [] } }) => {
               setFavoritesList(data.data.results);
          },
          onError: (e: any) => {
               console.log(e);
          },
     });
     const degressType: DeggresType = useSelector(
          (state: RootState) => state.headerSlice.degressType
     );
     const [open5daysForcastMobile, setOpen5daysForcastMobile] =
          useState<boolean>(false);
     const { data: forcasst5Days } = useQuery(
          ["5daysForcast", props?.existingCity?.key],
          () => selectCity(props?.existingCity?.key),
          { cacheTime: twelveHours, staleTime: twelveHours, enabled }
     ) as DataType;

     setInterval(() => {
          setNow(convertDateToText());
     }, 1000 * 60);
     const { data: forcast12Hours } = useQuery(
          ["forcast12Hours", props?.existingCity?.key],
          () => getForcastFor12Hours(props?.existingCity?.key),
          { cacheTime: twelveHours / 6, staleTime: twelveHours / 6, enabled }
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
     return (
          <>
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
                                             mutate(cityObj, "remove");
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
                                        onClick={() => dispatch(toggleMap())}
                                   >
                                        <StyledIcon marginRight="8px">
                                             <IconMapBlack />
                                        </StyledIcon>
                                        Map
                                   </StyledButton>
                              )}
                              {showAddToFavoritesNotification && (
                                   <Notification
                                        variant="success"
                                        animation={true}
                                        mobileWidth="300px"
                                        mobileHeigt="50px"
                                        message={`${
                                             props.existingCity.LocalizedName
                                        } has ${
                                             !itemIsOnFavorites
                                                  ? "removed from"
                                                  : "add to"
                                        } favorites `}
                                        icon={<IconSuccses />}
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
