import React from "react";
import {
     StyledDivRow,
     StyledColumnDiv,
     StyledText,
     StyledMaxTemperatureText,
     StyledMinTemperatureText,
} from "../HomePageDisplayCity/StyledHomePageDisplayCity";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import DiscoverDescription from "../../shared/utils/Components/DiscoverDescription";
import DiscoverIcon from "../../shared/utils/Components/DiscoverIcon";
import { returnShortDayFromDate } from "../../shared/utils/Dates/returnShortDayFromDate";
import { toggleDeggres } from "../../shared/utils/Functions/toggleDeggres";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DailyForecastsType } from "../HomePageDisplayCity/types";
type Props = {
     forcasst5Days: { DailyForecasts: DailyForecastsType[] };
     renderMobile: boolean | undefined;
     renderLaptopAnDesktop: boolean | undefined;
     setOpen5daysForcastMobile: (x: boolean) => void;
};
const DisplayWeeklyData: React.FC<Props> = (props) => {
     const degressType = useSelector(
          (state: RootState) => state.headerSlice.degressType
     );
     return (
          <>
               <StyledDivRow
                    flexDeiractionMobile="column"
                    justifayContent="space-around"
                    marginTop="88px"
                    height="181px"
                    border="solid 1px white"
                    borderRadius="20px"
                    marginTopMobile="20px"
               >
                    {props.forcasst5Days &&
                         props.forcasst5Days.DailyForecasts.map(
                              (day: DailyForecastsType, index: number) => {
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
                                                                 day.Day
                                                                      .IconPhrase
                                                            }
                                                       />
                                                  </StyledText>
                                                  <StyledDivRow>
                                                       <DiscoverIcon
                                                            height="40px"
                                                            width="40px"
                                                            margin="0 4px 0 0 "
                                                            Icon={day.Day.Icon}
                                                            IconPhrase={
                                                                 day.Day
                                                                      .IconPhrase
                                                            }
                                                       />
                                                       <StyledMaxTemperatureText fontSize="3.2rem">
                                                            {toggleDeggres(
                                                                 degressType,
                                                                 day.Temperature
                                                                      .Maximum
                                                                      .Value,
                                                                 day.Temperature
                                                                      .Maximum
                                                                      .Unit
                                                            )}{" "}
                                                            °
                                                       </StyledMaxTemperatureText>
                                                       <StyledMinTemperatureText fontSize="1.6rem">
                                                            -{" "}
                                                            {toggleDeggres(
                                                                 degressType,
                                                                 day.Temperature
                                                                      .Minimum
                                                                      .Value,
                                                                 day.Temperature
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
                                                            Icon={day.Day.Icon}
                                                            IconPhrase={
                                                                 day.Day
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
                                                                      day.Day
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
                                                                 day.Temperature
                                                                      .Minimum
                                                                      .Value,
                                                                 day.Temperature
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
                                                                 day.Temperature
                                                                      .Maximum
                                                                      .Value,
                                                                 day.Temperature
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
                         onClick={() => props.setOpen5daysForcastMobile(true)}
                         boxShadow="none"
                         variant="ghost"
                         margin="25px auto 0 auto"
                         width="264px"
                         height="54px"
                    >
                         5 Days Forecast
                    </StyledButton>
               )}
          </>
     );
};

export default DisplayWeeklyData;
