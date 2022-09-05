import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { CityObj, Result } from "../SearchBox/types";
import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";
import { useLocation } from "react-router-dom";
import { StyledIcon } from "../../shared/Icons/Icon";
import DiscoverIcon from "../../shared/utils/Components/DiscoverIcon/DiscoverIcon";
import {
     toggleDeggres,
     DeggresType,
} from "../../shared/utils/Functions/toggleDeggres";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { toggleMap } from "../../redux/headerSlice";
import { useDispatch } from "react-redux";
import { StyledContainer, StyledText } from "./style";
import { Props } from "./types";
import { Coords } from "./types";
const containerStyle = {
     width: "100vw",
     height: "100vh",
};

const DisplayMap: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     const location = useLocation();
     const { isLoaded } = useJsApiLoader({
          id: "google-map-script",
          googleMapsApiKey: "AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs",
     });
     const [position, setPosition] = React.useState<any>(
          props.coords || JSON.parse(localStorage.getItem("coords"))
     );
     const degressType: DeggresType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
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
                                                  props?.citiesHourlyForcast[
                                                       index
                                                  ]?.data?.temp &&
                                                  toggleDeggres(
                                                       degressType,
                                                       props
                                                            ?.citiesHourlyForcast[
                                                            index
                                                       ]?.data?.temp,
                                                       props
                                                            ?.citiesHourlyForcast[
                                                            index
                                                       ]?.data?.unit
                                                  )}
                                             °
                                        </StyledText>
                                        <StyledIcon width="35px" height="35px">
                                             {props.citiesHourlyForcast &&
                                                  props?.citiesHourlyForcast[
                                                       index
                                                  ]?.data?.icon && (
                                                       <DiscoverIcon
                                                            IconPhrase={
                                                                 props
                                                                      ?.citiesHourlyForcast[
                                                                      index
                                                                 ]?.data
                                                                      ?.iconParshe
                                                            }
                                                            Icon={
                                                                 props
                                                                      ?.citiesHourlyForcast[
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
