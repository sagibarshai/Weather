import { useEffect, useState } from "react";
import { selectCity } from "../shared/utils/selectCity";
import { Result } from "./SearchBox";
import { useQuery } from "react-query";
import DiscoverIcon from "../shared/utils/DiscoverIcon";
import { convertDateToText } from "../shared/utils/convertDateToText";
import { StyledButton } from "../shared/UIElements/Button/Button";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconFavroiteOutline } from "../shared/svg/fav-outline.svg";
import { ReactComponent as IconArrowWind } from "../shared/svg/arrow-wind.svg";
import { returnShortDayFromDate } from "../shared/utils/returnShortDayFromDate";
import DiscoverDescription from "../shared/utils/DiscoverDescription";
import { getForcastFor12Hours } from "../shared/utils/getForcastFor12Hours";
import { epochConverter } from "../shared/utils/epochConverter";

import {
     StyledContainer,
     StyledCityName,
     StyledDivRow,
     StyledMinTemperatureText,
     StyledMaxTemperatureText,
     StyledText,
     StyledDate,
     StyledColumnDiv,
} from "./styles/StyledHomePageDisplayCity";
export type SelectedCityType = {
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
};

export type DailyForecastsType = {
     Date: Date;
     Temperature: {
          Minimum: { Value: number };
          Maximum: { Value: number };
     };
     Day: { IconPhrase: string };
};

export type DataType = {
     data: {
          DailyForecasts: DailyForecastsType[];
     };
};
type forcast12HoursType = {
     data: {
          EpochDateTime: number;
          Temperature: { Value: number };
          IconPhrase: string;
     }[];
};
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const [now, setNow] = useState<string>(convertDateToText());
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
     }, 1000 * 60);

     const { data: forcast12Hours } = useQuery(
          ["forcast12Hours", existingResult && existingResult.Key],
          () => getForcastFor12Hours(existingResult && existingResult.Key),
          { cacheTime: twelveHours / 6, staleTime: twelveHours / 6 }
     ) as forcast12HoursType;
     forcast12Hours && console.log(forcast12Hours);
     return (
          <>
               {existingResult && forcasst5Days && (
                    <StyledContainer>
                         <StyledCityName>
                              {existingResult.LocalizedName}
                         </StyledCityName>
                         <StyledDivRow alignItems="flex-end">
                              <DiscoverIcon
                                   width="180px"
                                   height="180px"
                                   margin="32px 0 0 -24px"
                                   IconPhrase={
                                        forcasst5Days.DailyForecasts[0].Day
                                             .IconPhrase
                                   }
                              />

                              <StyledMaxTemperatureText>
                                   {
                                        forcasst5Days.DailyForecasts[0]
                                             .Temperature.Maximum.Value
                                   }{" "}
                                   °
                              </StyledMaxTemperatureText>
                              <StyledMinTemperatureText>
                                   -{" "}
                                   {
                                        forcasst5Days.DailyForecasts[0]
                                             .Temperature.Minimum.Value
                                   }
                                   °
                              </StyledMinTemperatureText>
                         </StyledDivRow>
                         <DiscoverDescription
                              IconPhrase={
                                   forcasst5Days.DailyForecasts[0].Day
                                        .IconPhrase
                              }
                         />
                         <StyledDivRow justifayContent="space-between">
                              <StyledDate>{now}</StyledDate>
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
                         </StyledDivRow>
                         <StyledDivRow
                              justifayContent="space-around"
                              marginTop="88px"
                              height="181px"
                              border="solid 1px white"
                              borderRadius="20px"
                         >
                              {forcasst5Days &&
                                   forcasst5Days.DailyForecasts.map(
                                        (
                                             day: DailyForecastsType,
                                             index: number
                                        ) => {
                                             if (index === 0) return;
                                             return (
                                                  <StyledColumnDiv
                                                       key={index}
                                                       gap="40px"
                                                  >
                                                       <StyledText>
                                                            {returnShortDayFromDate(
                                                                 day.Date
                                                            )}
                                                            -{" "}
                                                            <DiscoverDescription
                                                                 fontSize="2.4rem"
                                                                 IconPhrase={
                                                                      day.Day
                                                                           .IconPhrase
                                                                 }
                                                            />
                                                       </StyledText>
                                                       <StyledDivRow>
                                                            <DiscoverIcon
                                                                 IconPhrase={
                                                                      day.Day
                                                                           .IconPhrase
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
                                        }
                                   )}
                         </StyledDivRow>
                         <StyledDivRow
                              marginTop="88px"
                              height="181px"
                              justifayContent="space-between"
                         >
                              {forcast12Hours &&
                                   forcast12Hours.map((day, index) => {
                                        if (index % 2 !== 0) return;
                                        return (
                                             <StyledColumnDiv
                                                  gap="24px"
                                                  key={index}
                                             >
                                                  <StyledText>
                                                       {epochConverter(
                                                            day.EpochDateTime
                                                       )}
                                                  </StyledText>
                                                  <StyledText fontWeight="bold">
                                                       {day.Temperature.Value} °
                                                  </StyledText>
                                                  <DiscoverIcon
                                                       IconPhrase={
                                                            day.IconPhrase
                                                       }
                                                  />
                                                  <StyledText>
                                                       <IconArrowWind /> 21.4
                                                       km/h
                                                  </StyledText>
                                             </StyledColumnDiv>
                                        );
                                   })}
                         </StyledDivRow>
                    </StyledContainer>
               )}
          </>
     );
};

export default HomePageDisplayCity;
/*
 <StyledDivRow
                              marginTop="88px"
                              height="181px"
                              justifayContent="space-between"
                         >
                              {forcast12Hours &&
                                   forcast12Hours.DailyForecasts.map(
                                        (day, index) => {
                                             return (
                                                  <StyledColumnDiv gap="24px">
                                                       <StyledText>
                                                            08:00
                                                       </StyledText>
                                                       <StyledText fontWeight="bold">
                                                            5
                                                       </StyledText>
                                                       <DiscoverIcon IconPhrase="hot" />
                                                       <StyledText>
                                                            <IconArrowWind />{" "}
                                                            21.4 km/h
                                                       </StyledText>
                                                  </StyledColumnDiv>
                                             );
                                        }
                                   )}
                         </StyledDivRow>
*/
