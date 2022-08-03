import { useEffect, useState } from "react";
import styled from "styled-components";
import themes from "../shared/themes/themes";
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
import { getForcastEveryHour } from "../shared/utils/getForcastEveryHour";
export type SelectedCityType = {
     selectedCity?: {};
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
     setSelectedCity: (x: Result) => void;
};
type StyledProps = {
     fontSize?: string;
     fontWeight?: string;
     gap?: string;
     justifayContent?: string;
     height?: string;
     marginTop?: string;
     alignItems?: string;
     borderRadius?: string;
     border?: string;
};
const StyledContainer = styled.div`
     display: flex;
     width: 1180px;
     margin: 120px auto 0 auto;
     flex-direction: column;
`;
const StyledCityName = styled.h2`
     all: unset;
     color: ${themes.white};
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     line-height: 1.2;
`;
const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     align-items: ${(props) => props.alignItems || "center"};
     justify-content: ${(props) => props.justifayContent};
     height: ${(props) => props.height};
     margin-top: ${(props) => props.marginTop};
     text-align: center;
     border-radius: ${(props) => props.borderRadius};
     border: ${(props) => props.border};
`;
const StyledMinTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "5rem"};

     color: ${themes.white};
`;
const StyledMaxTemperatureText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "13rem"};
     line-height: 1;
     color: ${themes.white};
`;
const StyledDescription = styled.p<StyledProps>`
     all: unset;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "3.2rem"};
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.white};
     margin-top: 16px;
`;
const StyledDate = styled.p`
     margin-top: 16px;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 2.4rem;
     font-weight: 500;
     line-height: 1.25;
     color: ${themes.white};
`;
const StyledText = styled.span<StyledProps>`
     font-family: inherit;
     font-size: ${(props) => props.fontSize || "24px"};
     font-weight: ${(props) => props.fontWeight || "normal"};
     line-height: 1.25;
     text-align: center;
     color: ${themes.white};
`;
const StyledColumnDiv = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
`;
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const [description, setDescription] = useState<string>("");
     const [now, setNow] = useState<string>(convertDateToText());
     const existingResult = props.searchResults?.find(
          (result) => result.Key === props.selectedCityKey
     );
     const { data: forcast5DaysData } = useQuery(
          ["5daysForcast", existingResult && existingResult.Key],
          () => selectCity(existingResult && existingResult.Key),
          { cacheTime: twelveHours, staleTime: twelveHours }
     );
     const { data: forcastEveryHour } = useQuery(
          ["forcastEveryHour", existingResult && existingResult.Key],
          () => getForcastEveryHour(existingResult && existingResult.Key),
          { cacheTime: twelveHours / 12, staleTime: twelveHours / 12 }
     );
     console.log(forcastEveryHour);
     useEffect(() => {
          forcast5DaysData && props.setSelectedCity(forcast5DaysData);
     }, [props.selectedCityKey, forcast5DaysData]);
     // forcast5DaysData && console.log(forcast5DaysData);
     setInterval(() => {
          setNow(convertDateToText());
     }, 1000 * 60);
     return (
          <>
               {existingResult && forcast5DaysData && forcastEveryHour && (
                    <StyledContainer>
                         <StyledCityName>
                              {existingResult.LocalizedName}
                         </StyledCityName>
                         <StyledDivRow alignItems="flex-end">
                              <DiscoverIcon
                                   width="180px"
                                   height="180px"
                                   margin="32px 0 0 -24px"
                                   IconPhrase={forcastEveryHour[0].IconPhrase}
                                   setDescription={setDescription}
                              />

                              <StyledMaxTemperatureText>
                                   {
                                        forcast5DaysData.DailyForecasts[0]
                                             .Temperature.Maximum.Value
                                   }{" "}
                                   °
                              </StyledMaxTemperatureText>
                              <StyledMinTemperatureText>
                                   -{" "}
                                   {
                                        forcast5DaysData.DailyForecasts[0]
                                             .Temperature.Minimum.Value
                                   }
                                   °
                              </StyledMinTemperatureText>
                         </StyledDivRow>
                         <StyledDescription>{description}</StyledDescription>
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
                              {forcast5DaysData &&
                                   forcast5DaysData.DailyForecasts.map(
                                        (day, index: number) => {
                                             return (
                                                  <StyledColumnDiv
                                                       key={index}
                                                       gap="40px"
                                                  >
                                                       <StyledText>
                                                            {returnShortDayFromDate(
                                                                 day.Date
                                                            )}
                                                            -{description}
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
                              {forcast5DaysData &&
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
