import { useEffect, useState, useRef } from "react";
import { selectCity } from "../shared/utils/Services/Accuweather-Api/selectCity";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { convertDateToText } from "../shared/utils/Dates/convertDateToText";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconFavroiteOutline } from "../shared/svg/fav-outline.svg";
import { ReactComponent as IconFavWhiteFull } from "../shared/svg/fav-full.svg";
import { ReactComponent as IconArrowWind } from "../shared/svg/arrow-wind.svg";
import { ReactComponent as IconArrowLeft } from "../shared/svg/arrow-square-left.svg";
import { ReactComponent as IconFavWhite } from "../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconMapBlack } from "../shared/svg/map-black.svg";
import { returnShortDayFromDate } from "../shared/utils/Dates/returnShortDayFromDate";
import DiscoverDescription from "../shared/utils/Components/DiscoverDescription";
import { getForcastFor12Hours } from "../shared/utils/Services/Accuweather-Api/getForcastFor12Hours";
import { epochConverter } from "../shared/utils/Times/epochConverter";
import LineChart from "./LineChart";
import { getDayNumber } from "../shared/utils/Dates/getDateNumber";
import {
     StyledContainer,
     StyledCityName,
     StyledDivRow,
     StyledMinTemperatureText,
     StyledMaxTemperatureText,
     StyledText,
     StyledDate,
     StyledColumnDiv,
     StyledMobileAddToFavButton,
     StyledTempratureSpan,
     StyleSimpleButton,
} from "./HomePageDisplayCity/StyledHomePageDisplayCity";
import LineChartMobile from "./LineChartMobile";
import DiscoverIcon from "../shared/utils/Components/DiscoverIcon";
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
     DailyForecastsType,
     forcast12HoursType,
} from "./HomePageDisplayCity/types";
import { toggleMap } from "../redux/headerSlice";
import { scrollBarHandlerXAxis } from "../shared/utils/Functions/scrollbarHandler";
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const twelveHoursRefs = useRef([]);
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
     const { data, isLoading } = useQuery("favorites", getFromFavorites, {
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
     ) as forcast12HoursType;
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
                              <StyledCityName width="100%">
                                   {props.existingCity.LocalizedName}
                              </StyledCityName>
                              <StyledDivRow
                                   alignItems="center"
                                   marginTopMobile="30px"
                                   mobileWidth="auto"
                                   marginLeft="-40px"
                              >
                                   <DiscoverIcon
                                        renderMobile={props.renderMobile}
                                        renderLaptopAnDesktop={
                                             props.renderLaptopAnDesktop
                                        }
                                        mobileHeight="80px"
                                        mobileWidth="80px"
                                        height="180px"
                                        width="180px"
                                        margin="16px 32px 0 0"
                                        Icon={forcast12Hours[0].WeatherIcon}
                                        IconPhrase={
                                             forcast12Hours[0].IconPhrase
                                        }
                                   />
                                   <StyledDivRow alignItems="baseline">
                                        <StyledMaxTemperatureText
                                             marginRightMobile="10px"
                                             fontSizeMobile="8rem"
                                             positionMobile="relative"
                                        >
                                             {toggleDeggres(
                                                  degressType,
                                                  forcasst5Days
                                                       .DailyForecasts[0]
                                                       .Temperature.Maximum
                                                       .Value,
                                                  forcasst5Days
                                                       .DailyForecasts[0]
                                                       .Temperature.Maximum.Unit
                                             )}
                                             <StyledTempratureSpan
                                                  fontSizeMobile="5rem"
                                                  positionMobile="absolute"
                                                  topMobile="0"
                                                  leftMobile="125%"
                                             >
                                                  °
                                             </StyledTempratureSpan>
                                        </StyledMaxTemperatureText>
                                        <StyledMinTemperatureText positionMobile="relative">
                                             -{" "}
                                             {toggleDeggres(
                                                  degressType,
                                                  forcasst5Days
                                                       .DailyForecasts[0]
                                                       .Temperature.Minimum
                                                       .Value,
                                                  forcasst5Days
                                                       .DailyForecasts[0]
                                                       .Temperature.Minimum.Unit
                                             )}
                                             <StyledTempratureSpan
                                                  positionMobile="absolute"
                                                  topMobile="0"
                                                  leftMobile="125%"
                                             >
                                                  °
                                             </StyledTempratureSpan>
                                        </StyledMinTemperatureText>
                                   </StyledDivRow>
                              </StyledDivRow>
                              <DiscoverDescription
                                   alignSelf="flex-start"
                                   alignSelfMobile="center"
                                   fontWeightMobile="normal"
                                   IconPhrase={
                                        forcasst5Days.DailyForecasts[0].Day
                                             .IconPhrase
                                   }
                              />
                              <StyledDivRow justifayContent="space-between">
                                   <StyledDate>{now}</StyledDate>
                                   {props.renderLaptopAnDesktop && (
                                        <StyledButton
                                             onClick={() => {
                                                  if (props.existingCity) {
                                                       const cityObj = {
                                                            key: Number(
                                                                 props
                                                                      .existingCity
                                                                      .key
                                                            ),
                                                            city: props
                                                                 .existingCity
                                                                 .LocalizedName,
                                                            country: props
                                                                 .existingCity
                                                                 .Country
                                                                 .LocalizedName,
                                                       };
                                                       mutate(cityObj);
                                                  }
                                             }}
                                             variant="white"
                                             display="flex"
                                             alignItem="revert"
                                             fontWeight="bold"
                                             width="220px"
                                             height="58px"
                                             disabled={
                                                  showAddToFavoritesNotification
                                             }
                                             flexBasis="fit-content"
                                        >
                                             <StyledIcon marginRight="8px">
                                                  <IconFavroiteOutline />
                                             </StyledIcon>
                                             {itemIsOnFavorites
                                                  ? "Remove from "
                                                  : "Add to "}
                                             favorite
                                        </StyledButton>
                                   )}
                                   {showAddToFavoritesNotification && (
                                        <Notification
                                             variant="success"
                                             animation={true}
                                             mobileWidth="300px"
                                             mobileHeigt="50px"
                                             message={`${
                                                  props.existingCity
                                                       .LocalizedName
                                             } has ${
                                                  !itemIsOnFavorites
                                                       ? "removed from"
                                                       : "add to"
                                             } favorites `}
                                             icon={<IconSuccses />}
                                        />
                                   )}
                              </StyledDivRow>
                              <StyledDivRow
                                   flexDeiractionMobile="column"
                                   justifayContent="space-around"
                                   marginTop="88px"
                                   height="181px"
                                   border="solid 1px white"
                                   borderRadius="20px"
                                   marginTopMobile="20px"
                              >
                                   {forcasst5Days &&
                                        forcasst5Days.DailyForecasts.map(
                                             (
                                                  day: DailyForecastsType,
                                                  index: number
                                             ) => {
                                                  forcast5daystemperatureDay.push(
                                                       toggleDeggres(
                                                            degressType,
                                                            day.Temperature
                                                                 .Maximum.Value,
                                                            day.Temperature
                                                                 .Maximum.Unit
                                                       )
                                                  );
                                                  forcast5daystemperatureNight.push(
                                                       toggleDeggres(
                                                            degressType,
                                                            day.Temperature
                                                                 .Minimum.Value,
                                                            day.Temperature
                                                                 .Minimum.Unit
                                                       )
                                                  );

                                                  forcast5daysLablesDays.push(
                                                       String(
                                                            returnShortDayFromDate(
                                                                 day.Date
                                                            )
                                                       )
                                                  );
                                                  forcast5daysLablesDates.push(
                                                       getDayNumber(
                                                            String(day.Date)
                                                       )
                                                  );

                                                  if (index === 0) return;
                                                  if (
                                                       props.renderLaptopAnDesktop
                                                  )
                                                       return (
                                                            <StyledColumnDiv
                                                                 flexDeiractionMobile="row"
                                                                 key={index}
                                                                 gap="40px"
                                                            >
                                                                 <StyledText fontSizeMobile="1.8rem">
                                                                      {returnShortDayFromDate(
                                                                           day.Date
                                                                      )}
                                                                      -{" "}
                                                                      <DiscoverDescription
                                                                           renderLaptopAnDesktop={
                                                                                props.renderLaptopAnDesktop
                                                                           }
                                                                           fontWeightMobile="normal"
                                                                           fontSize="2.4rem"
                                                                           fontSizeMobile="1.8rem"
                                                                           IconPhrase={
                                                                                day
                                                                                     .Day
                                                                                     .IconPhrase
                                                                           }
                                                                      />
                                                                 </StyledText>
                                                                 <StyledDivRow>
                                                                      <DiscoverIcon
                                                                           height="40px"
                                                                           width="40px"
                                                                           margin="0 4px 0 0 "
                                                                           Icon={
                                                                                day
                                                                                     .Day
                                                                                     .Icon
                                                                           }
                                                                           IconPhrase={
                                                                                day
                                                                                     .Day
                                                                                     .IconPhrase
                                                                           }
                                                                      />
                                                                      <StyledMaxTemperatureText fontSize="3.2rem">
                                                                           {toggleDeggres(
                                                                                degressType,
                                                                                day
                                                                                     .Temperature
                                                                                     .Maximum
                                                                                     .Value,
                                                                                day
                                                                                     .Temperature
                                                                                     .Maximum
                                                                                     .Unit
                                                                           )}{" "}
                                                                           °
                                                                      </StyledMaxTemperatureText>
                                                                      <StyledMinTemperatureText fontSize="1.6rem">
                                                                           -{" "}
                                                                           {toggleDeggres(
                                                                                degressType,
                                                                                day
                                                                                     .Temperature
                                                                                     .Minimum
                                                                                     .Value,
                                                                                day
                                                                                     .Temperature
                                                                                     .Minimum
                                                                                     .Unit
                                                                           )}{" "}
                                                                           °
                                                                      </StyledMinTemperatureText>
                                                                 </StyledDivRow>
                                                            </StyledColumnDiv>
                                                       );
                                                  else
                                                       return (
                                                            <StyledColumnDiv
                                                                 mobileWidth="90vw"
                                                                 flexDeiractionMobile="row"
                                                                 key={index}
                                                                 justifyContentMobile="space-between"
                                                                 alignItems="center"
                                                                 gap="11px"
                                                            >
                                                                 <StyledDivRow
                                                                      gap="4px"
                                                                      minMobileWidth="70vw"
                                                                      justifyContentMobile="flex-start"
                                                                 >
                                                                      <DiscoverIcon
                                                                           height="40px"
                                                                           width="40px"
                                                                           margin="0 4px 0 0 "
                                                                           Icon={
                                                                                day
                                                                                     .Day
                                                                                     .Icon
                                                                           }
                                                                           IconPhrase={
                                                                                day
                                                                                     .Day
                                                                                     .IconPhrase
                                                                           }
                                                                      />
                                                                      <StyledText fontSizeMobile="1.8rem">
                                                                           {returnShortDayFromDate(
                                                                                day.Date
                                                                           )}
                                                                           -{" "}
                                                                           <DiscoverDescription
                                                                                fontWeightMobile="normal"
                                                                                renderLaptopAnDesktop={
                                                                                     props.renderLaptopAnDesktop
                                                                                }
                                                                                fontSize="2.4rem"
                                                                                fontSizeMobile="1.8rem"
                                                                                IconPhrase={
                                                                                     day
                                                                                          .Day
                                                                                          .IconPhrase
                                                                                }
                                                                           />
                                                                      </StyledText>
                                                                 </StyledDivRow>
                                                                 <StyledDivRow
                                                                      minMobileWidth="20vw"
                                                                      justifyContentMobile="flex-start"
                                                                 >
                                                                      <StyledMinTemperatureText
                                                                           fontSize="1.6rem"
                                                                           fontSizeMobile="1.8rem"
                                                                           fontWeightMobile="bold"
                                                                      >
                                                                           {toggleDeggres(
                                                                                degressType,
                                                                                day
                                                                                     .Temperature
                                                                                     .Minimum
                                                                                     .Value,
                                                                                day
                                                                                     .Temperature
                                                                                     .Minimum
                                                                                     .Unit
                                                                           )}
                                                                           ° -
                                                                      </StyledMinTemperatureText>
                                                                      <StyledMaxTemperatureText
                                                                           fontSize="3.2rem"
                                                                           fontSizeMobile="1.6rem"
                                                                      >
                                                                           {toggleDeggres(
                                                                                degressType,
                                                                                day
                                                                                     .Temperature
                                                                                     .Maximum
                                                                                     .Value,
                                                                                day
                                                                                     .Temperature
                                                                                     .Maximum
                                                                                     .Unit
                                                                           )}{" "}
                                                                           °
                                                                      </StyledMaxTemperatureText>
                                                                 </StyledDivRow>
                                                            </StyledColumnDiv>
                                                       );
                                             }
                                        )}
                              </StyledDivRow>
                              {props.renderMobile && (
                                   <StyledButton
                                        onClick={() =>
                                             setOpen5daysForcastMobile(true)
                                        }
                                        boxShadow="none"
                                        variant="ghost"
                                        margin="25px auto 0 auto"
                                        width="264px"
                                        height="54px"
                                   >
                                        5 Days Forecast
                                   </StyledButton>
                              )}
                              <StyledDivRow
                                   height="293px"
                                   justifayContent="space-between"
                                   mobileHeight="auto"
                                   overFlowXMobile="scroll"
                                   mobileWidth="90vw"
                                   justifyContentMobile="flex-start"
                                   mobileGap="10px"
                                   marginMobile="48px 25px 0 25px"
                                   marginTop="140px"
                                   overFlowX="scroll"
                                   id="forcast12Hours"
                              >
                                   {forcast12Hours &&
                                        forcast12Hours.map((day, index) => {
                                             return (
                                                  <StyledColumnDiv
                                                       id={`forcast12hours-${index}`}
                                                       key={index}
                                                       mobilePadding="16px 4px"
                                                       padding="40px 17px 39.9px 16px"
                                                       gap="24px"
                                                       mobileGap="4px"
                                                       height="293px"
                                                       mobileHeight="120px"
                                                       minMobileWidth="80px"
                                                       alignItemsMobile="center"
                                                       borderRadius="20px"
                                                       minWidth="153px"
                                                       selected={
                                                            index === selected
                                                                 ? true
                                                                 : false
                                                       }
                                                  >
                                                       <StyledText fontSizeMobile="1.4rem">
                                                            {epochConverter(
                                                                 day.EpochDateTime
                                                            )}
                                                       </StyledText>
                                                       <StyledText
                                                            fontWeight="bold"
                                                            fontSize="3.2rem"
                                                            fontSizeMobile="1.8rem"
                                                       >
                                                            {toggleDeggres(
                                                                 degressType,
                                                                 day.Temperature
                                                                      .Value,
                                                                 day.Temperature
                                                                      .Unit
                                                            )}
                                                            °
                                                       </StyledText>
                                                       <DiscoverIcon
                                                            height="40px"
                                                            width="40px"
                                                            Icon={
                                                                 day.WeatherIcon
                                                            }
                                                            IconPhrase={
                                                                 day.IconPhrase
                                                            }
                                                       />
                                                       <StyledText
                                                            fontSizeMobile="1.2rem"
                                                            marginTopMobile="25.7px"
                                                       >
                                                            <StyledIcon
                                                                 mobileWidth="16px"
                                                                 mobileHeight="16px"
                                                            >
                                                                 <IconArrowWind
                                                                      style={{
                                                                           transform: `rotate(${day.Wind.Direction.Degrees}deg)`,
                                                                           width: 16.5,
                                                                           height: 16.5,
                                                                      }}
                                                                 />{" "}
                                                            </StyledIcon>
                                                            {toggleDeggres(
                                                                 degressType,
                                                                 day.Wind.Speed
                                                                      .Value,
                                                                 day.Temperature
                                                                      .Unit
                                                            )}{" "}
                                                            {
                                                                 day.Wind.Speed
                                                                      .Unit
                                                            }
                                                       </StyledText>
                                                  </StyledColumnDiv>
                                             );
                                        })}
                              </StyledDivRow>
                              {props.renderLaptopAnDesktop && (
                                   <StyledDivRow
                                        justifayContent="flex-end"
                                        gap="24px"
                                        padding="0 20px 0 0 "
                                   >
                                        <StyleSimpleButton
                                             onClick={() => {
                                                  if (selected <= 0) return;
                                                  let newIndex = selected - 1;
                                                  setSelected(newIndex);
                                                  scrollBarHandlerXAxis(
                                                       "forcast12Hours",
                                                       `forcast12hours-${selected}`,
                                                       "-"
                                                  );
                                             }}
                                        >
                                             <IconArrowLeft />
                                        </StyleSimpleButton>
                                        <StyleSimpleButton
                                             rotate="rotate(180deg)"
                                             onClick={() => {
                                                  if (selected >= 11)
                                                       return setSelected(11);
                                                  let newIndex = selected + 1;
                                                  setSelected(newIndex);
                                                  scrollBarHandlerXAxis(
                                                       "forcast12Hours",
                                                       `forcast12hours-${selected}`,
                                                       "+"
                                                  );
                                             }}
                                        >
                                             <IconArrowLeft />
                                        </StyleSimpleButton>
                                   </StyledDivRow>
                              )}
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
