// AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs
import React, { useEffect } from "react";
import styled from "styled-components";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { CityObj, Result } from "./SearchBox";
import { searchCityByCoords } from "../shared/utils/Services/Accuweather-Api/searchCityByCoords";
import { useLocation } from "react-router-dom";
import themes from "../shared/themes/themes";
import { StyledIcon } from "../shared/Icons/Icon";
import DiscoverIcon from "../shared/utils/Components/DiscoverIcon";
import {
     toggleDeggres,
     DeggresType,
} from "../shared/utils/Functions/toggleDeggres";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleMap } from "../redux/headerSlice";
import { useDispatch } from "react-redux";
const StyledContainer = styled.div`
     overflow: hidden;
     min-width: 130px;
     min-height: 60px;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 5px;
`;
const StyledText = styled.span`
     color: ${themes.black};
     font-weight: bold;
     font-size: 1.8rem;
`;
const containerStyle = {
     width: "100vw",
     height: "100vh",
};
export type Coords = {
     lat: number | undefined;
     lng: number | undefined;
};
type Props = {
     coords: Coords;

     setSelectedCityDataFromMap?: (x: CityObj) => void;
     markerCoordsArray?: { data: Coords }[];
     zoom?: number;
     center?: Coords;
     citiesHourlyForcast?: {
          data: {
               temp: number;
               unit: DeggresType;
               iconParshe: string;
               icon: number;
          };
     }[];
};
const DisplayMap: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     const location = useLocation();
     const { isLoaded } = useJsApiLoader({
          id: "google-map-script",
          googleMapsApiKey: "AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs",
     });
     const [position, setPosition] = React.useState<any>(props.coords);
     const degressType: DeggresType = useSelector(
          (state: RootState) => state.headerSlice.degressType
     );
     if (!isLoaded) return <></>;
     else if (props.coords && location.pathname === "/home")
          return (
               <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={props.center || position}
                    zoom={props.zoom || 10}
                    onClick={(e) => {
                         const coords: Coords = {
                              lat: e.latLng?.lat(),
                              lng: e.latLng?.lng(),
                         };

                         dispatch(toggleMap());
                         searchCityByCoords(coords)
                              .then((res) => {
                                   props.setSelectedCityDataFromMap &&
                                        props.setSelectedCityDataFromMap({
                                             ...res,
                                             key: Number(res.Key),
                                        });
                              })
                              .catch((err) => console.log(err));
                    }}
               />
          );
     else if (
          props.markerCoordsArray &&
          props.citiesHourlyForcast &&
          location.pathname === "/favorites"
     )
          return (
               <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={props.center || position}
                    zoom={props.zoom || 10}
               >
                    {props.markerCoordsArray.map((fav, index) => (
                         <Marker
                              position={
                                   {
                                        lat: fav.data?.lat,
                                        lng: fav.data?.lng,
                                   } as { lat: number; lng: number }
                              }
                              key={index}
                         >
                              <InfoWindow
                                   position={{
                                        lat: Number(fav.data?.lat),
                                        lng: Number(fav.data?.lng),
                                   }}
                              >
                                   <StyledContainer>
                                        <StyledText>
                                             {props.citiesHourlyForcast &&
                                                  toggleDeggres(
                                                       degressType,
                                                       props
                                                            .citiesHourlyForcast[
                                                            index
                                                       ]?.data?.temp,
                                                       props
                                                            .citiesHourlyForcast[
                                                            index
                                                       ]?.data?.unit
                                                  )}
                                             °
                                        </StyledText>
                                        <StyledIcon width="35px" height="35px">
                                             {props.citiesHourlyForcast && (
                                                  <DiscoverIcon
                                                       IconPhrase={
                                                            props
                                                                 .citiesHourlyForcast[
                                                                 index
                                                            ]?.data?.iconParshe
                                                       }
                                                       Icon={
                                                            props
                                                                 .citiesHourlyForcast[
                                                                 index
                                                            ]?.data?.icon
                                                       }
                                                  />
                                             )}
                                        </StyledIcon>
                                   </StyledContainer>
                              </InfoWindow>
                         </Marker>
                    ))}
               </GoogleMap>
          );
     return <></>;
};

export default DisplayMap;
