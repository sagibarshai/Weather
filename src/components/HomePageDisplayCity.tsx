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
import {
     StyledContainer,
     StyledCityName,
     StyledDivRow,
     StyledMinTemperatureText,
     StyledMaxTemperatureText,
     StyledText,
     StyledDate,
     StyledDescription,
     StyledColumnDiv,
} from "./styles/StyledHomePageDisplayCity";
export type SelectedCityType = {
     selectedCity?: {};
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
     setSelectedCity: (x: DataType) => void;
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

const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const [description, setDescription] = useState<string>("");
     const [now, setNow] = useState<string>(convertDateToText());
     const existingResult = props.searchResults?.find(
          (result) => result.Key === props.selectedCityKey
     );
     const { data } = useQuery(
          ["5daysForcast", existingResult && existingResult.Key],
          () => selectCity(existingResult && existingResult.Key),
          { cacheTime: twelveHours, staleTime: twelveHours }
     ) as DataType;

     useEffect(() => {
          data && props.setSelectedCity(data as any);
     }, [props.selectedCityKey, data]);
     setInterval(() => {
          setNow(convertDateToText());
     }, 1000 * 60);
     return (
          <>
               {existingResult && data && (
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
                                        data.DailyForecasts[0].Day.IconPhrase
                                   }
                              />

                              <StyledMaxTemperatureText>
                                   {
                                        data.DailyForecasts[0].Temperature
                                             .Maximum.Value
                                   }{" "}
                                   °
                              </StyledMaxTemperatureText>
                              <StyledMinTemperatureText>
                                   -{" "}
                                   {
                                        data.DailyForecasts[0].Temperature
                                             .Minimum.Value
                                   }
                                   °
                              </StyledMinTemperatureText>
                         </StyledDivRow>
                         <DiscoverDescription
                              IconPhrase={data.DailyForecasts[0].Day.IconPhrase}
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
                              {data &&
                                   data.DailyForecasts.map(
                                        (day, index: number) => {
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
                              {data &&
                                   forcast5DaysData.DailyForecasts.map(
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
