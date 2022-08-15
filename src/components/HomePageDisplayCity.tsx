import { useEffect, useState } from "react";
import { selectCity } from "../shared/utils/selectCity";
import { Result } from "./SearchBox";
import { useQuery } from "react-query";
import { convertDateToText } from "../shared/utils/convertDateToText";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconFavroiteOutline } from "../shared/svg/fav-outline.svg";
import { ReactComponent as IconArrowWind } from "../shared/svg/arrow-wind.svg";
import { ReactComponent as IconArrowLeft } from "../shared/svg/arrow-square-left.svg";
import { ReactComponent as IconFavWhite } from "../shared/svg/fav-outline-white.svg";
import { ReactComponent as IconMapBlack } from "../shared/svg/map-black.svg";
import { returnShortDayFromDate } from "../shared/utils/returnShortDayFromDate";
import DiscoverDescription from "../shared/utils/DiscoverDescription";
import { getForcastFor12Hours } from "../shared/utils/getForcastFor12Hours";
import { epochConverter } from "../shared/utils/epochConverter";
import ReturnIconForcast from "../shared/utils/ReturnIconForcast";
import LineChart from "./LineChart";
import { getDayNumber } from "../shared/utils/getDateNumber";
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
} from "./styles/StyledHomePageDisplayCity";
export type SelectedCityType = {
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
     renderMobile?: boolean;
     renderLaptopAnDesktop?: boolean;
};
export type DailyForecastsType = {
     Date: Date;
     Temperature: {
          Minimum: { Value: number };
          Maximum: { Value: number };
     };
     Day: { IconPhrase: string; Icon: number };
};
export type DataType = {
     data: {
          DailyForecasts: DailyForecastsType[];
     };
};
type forcast12HoursType = {
     data: {
          EpochDateTime: number;
          DateTime: string;
          Temperature: { Value: number };
          IconPhrase: string;
          WeatherIcon: number;
          Wind: {
               Speed: { Value: number; Unit: string };
               Direction: { Degrees: number };
          };
     }[];
};
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const [now, setNow] = useState<string>(convertDateToText());
     const [currentDateTime, setCurrentDateTime] = useState(
          new Date().toLocaleString()
     );
     const [selected, setSelected] = useState<null | string>(null);
     const existingResult = props.searchResults?.find(
          (result) => result.Key === props.selectedCityKey
     );
     const { data: forcasst5Days } = useQuery(
          ["5daysForcast", existingResult && existingResult.Key],
          () => selectCity(existingResult && existingResult.Key),
          { cacheTime: twelveHours, staleTime: twelveHours }
     ) as DataType;
     setInterval(() => {
          setNow(convertDateToText());
          setCurrentDateTime(new Date().toLocaleString());
     }, 1000 * 60);

     const { data: forcast12Hours } = useQuery(
          ["forcast12Hours", existingResult && existingResult.Key],
          () => getForcastFor12Hours(existingResult && existingResult.Key),
          { cacheTime: twelveHours / 6, staleTime: twelveHours / 6 }
     ) as forcast12HoursType;
     useEffect(() => {
          forcast12Hours && setSelected(forcast12Hours[0].DateTime);
     }, [forcast12Hours]);
     const forcast5daystemperatureDay: number[] = [];
     const forcast5daystemperatureNight: number[] = [];
     const forcast5daysLablesDays: string[] = [];
     const forcast5daysLablesDates: string[] = [];
     return (
          <>
               {existingResult && forcasst5Days && forcast12Hours && (
                    <StyledContainer>
                         {props.renderMobile && (
                              <StyledMobileAddToFavButton>
                                   <IconFavWhite />
                              </StyledMobileAddToFavButton>
                         )}
                         <StyledCityName>
                              {existingResult.LocalizedName}
                         </StyledCityName>
                         <StyledDivRow
                              alignItems="flex-end"
                              marginLeft="-35px"
                              marginTopMobile="30px"
                         >
                              <ReturnIconForcast
                                   renderMobile={props.renderMobile}
                                   renderLaptopAnDesktop={
                                        props.renderLaptopAnDesktop
                                   }
                                   height="200px"
                                   width="200px"
                                   mobileHeight="80px"
                                   mobileWidth="80px"
                                   margin="16px 32px 0 0"
                                   WeatherIcon={forcast12Hours[0].WeatherIcon}
                              />
                              <StyledDivRow alignItemsMobile="baseline">
                                   <StyledMaxTemperatureText
                                        marginRightMobile="10px"
                                        fontSizeMobile="8rem"
                                        positionMobile="relative"
                                   >
                                        {
                                             forcasst5Days.DailyForecasts[0]
                                                  .Temperature.Maximum.Value
                                        }{" "}
                                        <StyledTempratureSpan
                                             fontSizeMobile="5rem"
                                             positionMobile="absolute"
                                             topMobile="0"
                                             leftMobile="100%"
                                        >
                                             °
                                        </StyledTempratureSpan>
                                   </StyledMaxTemperatureText>
                                   <StyledMinTemperatureText positionMobile="relative">
                                        -{" "}
                                        {
                                             forcasst5Days.DailyForecasts[0]
                                                  .Temperature.Minimum.Value
                                        }
                                        <StyledTempratureSpan
                                             positionMobile="absolute"
                                             topMobile="0"
                                             leftMobile="100%"
                                        >
                                             °
                                        </StyledTempratureSpan>
                                   </StyledMinTemperatureText>
                              </StyledDivRow>
                         </StyledDivRow>
                         <DiscoverDescription
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
                                        variant="white"
                                        display="flex"
                                        alignItem="revert"
                                        fontWeight="bold"
                                   >
                                        <StyledIcon marginRight="8px">
                                             <IconFavroiteOutline />
                                        </StyledIcon>
                                        Add to favorite
                                   </StyledButton>
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
                                                  day.Temperature.Maximum.Value
                                             );
                                             forcast5daystemperatureNight.push(
                                                  day.Temperature.Minimum.Value
                                             );

                                             forcast5daysLablesDays.push(
                                                  String(
                                                       returnShortDayFromDate(
                                                            day.Date
                                                       )
                                                  )
                                             );
                                             forcast5daysLablesDates.push(
                                                  getDayNumber(String(day.Date))
                                             );

                                             if (index === 0) return;
                                             if (props.renderLaptopAnDesktop)
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
                                                                 <ReturnIconForcast
                                                                      height="40px"
                                                                      width="40px"
                                                                      margin="0 4px 0 0 "
                                                                      WeatherIcon={
                                                                           day
                                                                                .Day
                                                                                .Icon
                                                                      }
                                                                 />
                                                                 <StyledMaxTemperatureText fontSize="3.2rem">
                                                                      {
                                                                           day
                                                                                .Temperature
                                                                                .Maximum
                                                                                .Value
                                                                      }{" "}
                                                                      °
                                                                 </StyledMaxTemperatureText>
                                                                 <StyledMinTemperatureText fontSize="1.6rem">
                                                                      -{" "}
                                                                      {
                                                                           day
                                                                                .Temperature
                                                                                .Minimum
                                                                                .Value
                                                                      }{" "}
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
                                                                 minMobileWidth="40vw"
                                                                 justifyContentMobile="flex-start"
                                                            >
                                                                 <ReturnIconForcast
                                                                      height="40px"
                                                                      width="40px"
                                                                      margin="0 4px 0 0 "
                                                                      WeatherIcon={
                                                                           day
                                                                                .Day
                                                                                .Icon
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
                                                                      {
                                                                           day
                                                                                .Temperature
                                                                                .Minimum
                                                                                .Value
                                                                      }
                                                                      ° -
                                                                 </StyledMinTemperatureText>
                                                                 <StyledMaxTemperatureText
                                                                      fontSize="3.2rem"
                                                                      fontSizeMobile="1.6rem"
                                                                 >
                                                                      {
                                                                           day
                                                                                .Temperature
                                                                                .Maximum
                                                                                .Value
                                                                      }{" "}
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
                              justifyContentMobile="flex-start"
                              mobileGap="10px"
                              marginMobile="48px 25px 0 25px"
                         >
                              {forcast12Hours &&
                                   forcast12Hours.map((day, index) => {
                                        if (index % 2 !== 0) return;
                                        return (
                                             <StyledColumnDiv
                                                  key={index}
                                                  mobilePadding="16px 4px"
                                                  padding="40px 17px 39.9px 16px"
                                                  gap="24px"
                                                  mobileGap="4px"
                                                  height="293px"
                                                  mobileHeight="120px"
                                                  minMobileWidth="80px"
                                                  alignItemsMobile="center"
                                                  selected={
                                                       day.DateTime.toLocaleString() ==
                                                       selected
                                                            ? true
                                                            : false
                                                  }
                                                  borderRadius="20px"
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
                                                       {Math.round(
                                                            day.Temperature
                                                                 .Value
                                                       )}
                                                       °
                                                  </StyledText>
                                                  <ReturnIconForcast
                                                       height="40px"
                                                       width="40px"
                                                       WeatherIcon={
                                                            day.WeatherIcon
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
                                                       {day.Wind.Speed.Value}{" "}
                                                       {day.Wind.Speed.Unit}
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
                                   <IconArrowLeft
                                        style={{ cursor: "pointer" }}
                                   />
                                   <IconArrowLeft
                                        style={{
                                             transform: "rotate(180deg)",
                                             cursor: "pointer",
                                        }}
                                   />
                              </StyledDivRow>
                         )}
                         {props.renderLaptopAnDesktop && (
                              <LineChart
                                   forcast5daysLablesDates={
                                        forcast5daysLablesDates
                                   }
                                   forcast5daysLablesDays={
                                        forcast5daysLablesDays
                                   }
                                   forcast5daystemperatureNight={
                                        forcast5daystemperatureNight
                                   }
                                   forcast5daystemperatureDay={
                                        forcast5daystemperatureDay
                                   }
                              />
                         )}
                         {props.renderMobile && (
                              <StyledButton
                                   variant="white"
                                   width="114px"
                                   margin="60px auto 0 auto"
                                   fontWeight="bold"
                              >
                                   <StyledIcon marginRight="8px">
                                        <IconMapBlack />
                                   </StyledIcon>
                                   Map
                              </StyledButton>
                         )}
                    </StyledContainer>
               )}
          </>
     );
};

export default HomePageDisplayCity;
