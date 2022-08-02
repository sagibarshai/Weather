import { useEffect, useState } from "react";
import styled from "styled-components";
import themes from "../shared/themes/themes";
import { selectCity } from "../shared/utils/selectCity";
import { Result } from "./SearchBox";
import { useQuery } from "react-query";
import DiscoverIcon from "../shared/utils/DiscoverIcon";
export type SelectedCityType = {
     selectedCity?: {};
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
     setSelectedCity: (x: Result) => void;
};
type StyledProps = {
     gap?: string;
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
     align-items: flex-end;
`;
const StyledMinTemperatureText = styled.span`
     font-family: inherit;
     font-size: 13rem;
     line-height: 1;
     color: ${themes.white};
`;
const StyledMaxTemperatureText = styled.span`
     font-family: inherit;
     font-size: 5rem;
     color: ${themes.white};
`;
const StyledDescription = styled.p`
     all: unset;
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 3.2rem;
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
const twelveHours = 1000 * 60 * 60 * 12;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const [description, setDescription] = useState<string>("");
     const existingResult = props.searchResults?.find(
          (result) => result.Key === props.selectedCityKey
     );
     const { data } = useQuery(
          ["selectedCity", existingResult && existingResult.Key],
          () => selectCity(existingResult && existingResult.Key),
          { cacheTime: twelveHours, staleTime: twelveHours }
     );
     useEffect(() => {
          data && props.setSelectedCity(data);
     }, [props.selectedCityKey, data]);
     data && console.log(data, data.DailyForecasts[0].Day.IconPhrase);
     return (
          <>
               {existingResult && data && (
                    <StyledContainer>
                         <StyledCityName>
                              {existingResult.LocalizedName}
                         </StyledCityName>
                         <StyledDivRow>
                              <DiscoverIcon
                                   margin="32px 0 0 -24px"
                                   IconPhrase={
                                        data.DailyForecasts[0].Day.IconPhrase
                                   }
                                   setDescription={setDescription}
                              />

                              <StyledMinTemperatureText>
                                   {
                                        data.DailyForecasts[0].Temperature
                                             .Minimum.Value
                                   }
                                   °
                              </StyledMinTemperatureText>
                              <StyledMaxTemperatureText>
                                   -{" "}
                                   {
                                        data.DailyForecasts[0].Temperature
                                             .Maximum.Value
                                   }{" "}
                                   °
                              </StyledMaxTemperatureText>
                         </StyledDivRow>
                         <StyledDescription>{description}</StyledDescription>
                         <StyledDate>{data.Headline.EffectiveDate}</StyledDate>
                    </StyledContainer>
               )}
          </>
     );
};

export default HomePageDisplayCity;
