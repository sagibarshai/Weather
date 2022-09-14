import { memo } from "react";
import { useSelector } from "react-redux";

import DiscoverDescription from "../../shared/utils/Components/DiscoverDescription/DiscoverDescription";
import DiscoverIcon from "../../shared/utils/Components/DiscoverIcon/DiscoverIcon";
import { StyledButton } from "../../shared/UIElements/Button/Button";
import { StyledIcon } from "../../shared/Icons/Icon";

import { toggleDeggres } from "../../shared/utils/Functions/toggleDeggres";

import { ReactComponent as IconFavroiteOutline } from "../../shared/svg/fav-outline.svg";

import {
     StyledCityName,
     StyledDivRow,
     StyledMaxTemperatureText,
     StyledMinTemperatureText,
     StyledTempratureSpan,
     StyledDate,
} from "../HomePageDisplayCity/style";

import { FavoriteType } from "../../pages/Favorites/types";
import { StoreState } from "../../redux/store";
import { CityObj } from "../SearchBox/types";
import {
     forcast12HoursType,
     DailyForecastsType,
} from "../HomePageDisplayCity/types";

type Props = {
     renderMobile: boolean | undefined;
     renderLaptopAnDesktop: boolean | undefined;
     existingCity: CityObj;
     forcasst5Days: { DailyForecasts: DailyForecastsType[] };
     forcast12Hours: forcast12HoursType;
     now: string;
     showAddToFavoritesNotification: boolean;
     itemIsOnFavorites: boolean;
     mutate: (x: FavoriteType) => any;
};

const DisplayCityMetaData: React.FC<Props> = (props) => {
     const degressType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );

     return (
          <>
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
                         renderLaptopAnDesktop={props.renderLaptopAnDesktop}
                         mobileHeight="80px"
                         mobileWidth="80px"
                         height="180px"
                         width="180px"
                         margin="16px 32px 0 0"
                         Icon={props.forcast12Hours[0].WeatherIcon}
                         IconPhrase={props.forcast12Hours[0].IconPhrase}
                    />
                    <StyledDivRow alignItems="baseline">
                         <StyledMaxTemperatureText
                              marginRightMobile="10px"
                              fontSizeMobile="8rem"
                              positionMobile="relative"
                         >
                              {toggleDeggres(
                                   degressType,
                                   props.forcasst5Days.DailyForecasts[0]
                                        .Temperature.Maximum.Value,
                                   props.forcasst5Days.DailyForecasts[0]
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
                                   props.forcasst5Days.DailyForecasts[0]
                                        .Temperature.Minimum.Value,
                                   props.forcasst5Days.DailyForecasts[0]
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
                         props.forcasst5Days.DailyForecasts[0].Day.IconPhrase
                    }
               />
               <StyledDivRow justifayContent="space-between">
                    <StyledDate>{props.now}</StyledDate>
                    {props.renderLaptopAnDesktop && (
                         <StyledButton
                              onClick={() => {
                                   if (props.existingCity) {
                                        const cityObj = {
                                             key: Number(
                                                  props.existingCity.key
                                             ),
                                             city: props.existingCity
                                                  .LocalizedName,
                                             country: props.existingCity.Country
                                                  .LocalizedName,
                                        };
                                        props.mutate(cityObj);
                                   }
                              }}
                              variant="white"
                              display="flex"
                              alignItem="revert"
                              fontWeight="bold"
                              width="220px"
                              height="58px"
                              disabled={props.showAddToFavoritesNotification}
                              flexBasis="fit-content"
                         >
                              <StyledIcon marginRight="8px">
                                   <IconFavroiteOutline />
                              </StyledIcon>
                              {props.itemIsOnFavorites
                                   ? "Remove from "
                                   : "Add to "}
                              favorite
                         </StyledButton>
                    )}
               </StyledDivRow>
          </>
     );
};

export default memo(DisplayCityMetaData);
