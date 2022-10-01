import { useEffect, useState, memo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useMutation } from "react-query";

import DiscoverIcon from "../../shared/utils/Components/DiscoverIcon/DiscoverIcon";
import { StyledIcon } from "../../shared/Icons/Icon";

import { toggleMap } from "../../redux/headerSlice";
import {
     toggleDeggres,
     DeggresType,
} from "../../shared/utils/Functions/toggleDeggres";
import { searchCityByCoords } from "../../shared/utils/Services/Accuweather-Api/searchCityByCoords";

import { StyledContainer, StyledText } from "./style";

import { Props } from "./types";
import { Coords } from "./types";
import { StoreState } from "../../redux/store";
import { SearchResult } from "../SearchBox/types";

const containerStyle = { width: "100vw", height: "100vh", overflow: "hidden" };

const DisplayMap: React.FC<Props> = (props) => {
     const dispatch = useDispatch();
     const location = useLocation();

     const [position, setPosition] = useState<Coords | undefined>(props.coords);
     const [center, setCenter] = useState<Coords | undefined>(undefined);

     const degressType: DeggresType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );

     const { isLoaded } = useJsApiLoader({
          id: "google-map-script",
          googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
     });
     let coordsFromLocalStorage = localStorage.getItem("coords");
     if (coordsFromLocalStorage)
          coordsFromLocalStorage = JSON.parse(coordsFromLocalStorage);
     useEffect(() => {
          if (
               props.markerCoordsArray &&
               Array.isArray(props.markerCoordsArray)
          ) {
               setCenter(props.markerCoordsArray[0]?.data);
          }
     }, [props.markerCoordsArray]);

     const { mutate } = useMutation(searchCityByCoords, {
          onSuccess: (data: SearchResult) => {
               props.setSelectedCityDataFromMap &&
                    props.setSelectedCityDataFromMap({
                         ...data,
                         key: Number(data.Key),
                    });
          },
          onError: (err: any) => {
               props.setServerError(true);
               console.log(err);
          },
     });
     if (!isLoaded) return <></>;
     else if (props.coords && location.pathname === "/home")
          return (
               <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={props.center || position || coordsFromLocalStorage}
                    zoom={props.zoom || 10}
                    onClick={(e) => {
                         const coords: Coords = {
                              lat: e.latLng?.lat(),
                              lng: e.latLng?.lng(),
                         };

                         dispatch(toggleMap());
                         mutate(coords);
                    }}
               />
          );
     else if (
          props.markerCoordsArray &&
          props.citiesHourlyForcast &&
          location.pathname === "/favorites" &&
          center
     )
          return (
               <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={props.center || center}
                    zoom={props.zoom || 10}
               >
                    {props.markerCoordsArray.map(
                         (fav, index) =>
                              fav.data?.lat &&
                              fav.data?.lng &&
                              !props.serverError && (
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
                                                            props
                                                                 ?.citiesHourlyForcast[
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
                                                  <StyledIcon
                                                       width="35px"
                                                       height="35px"
                                                  >
                                                       {props.citiesHourlyForcast &&
                                                            props
                                                                 ?.citiesHourlyForcast[
                                                                 index
                                                            ]?.data?.icon && (
                                                                 <DiscoverIcon
                                                                      IconPhrase={
                                                                           props
                                                                                ?.citiesHourlyForcast[
                                                                                index
                                                                           ]
                                                                                ?.data
                                                                                ?.iconParshe
                                                                      }
                                                                      Icon={
                                                                           props
                                                                                ?.citiesHourlyForcast[
                                                                                index
                                                                           ]
                                                                                ?.data
                                                                                ?.icon
                                                                      }
                                                                 />
                                                            )}
                                                  </StyledIcon>
                                             </StyledContainer>
                                        </InfoWindow>
                                   </Marker>
                              )
                    )}
               </GoogleMap>
          );
     return (
          <>
               <GoogleMap
                    id="map"
                    mapContainerStyle={containerStyle}
                    center={props.center || position || coordsFromLocalStorage}
                    zoom={props.zoom || 10}
               />
          </>
     );
};

export default memo(DisplayMap);
