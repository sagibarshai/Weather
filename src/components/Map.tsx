// AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Result } from "./SearchBox";
import { searchCityByCoords } from "../shared/utils/searchCityByCoords";

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
     setCoordsForCityDisplay: (x: Coords) => void;
     setShowOnMap: (x: boolean) => void;
     setSelectedCityDataFromMap?: (x: Result) => void;
};
const DisplayMap: React.FC<Props> = (props) => {
     const mapRef = React.useRef<any>(null);
     const [center, setCenter] = React.useState<any>(props.coords);
     const { isLoaded } = useJsApiLoader({
          id: "google-map-script",
          googleMapsApiKey: "AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs",
     });
     const [position, setPosition] = React.useState<any>(
          props.coords || localStorage.getItem("coords")
     );
     const [map, setMap] = React.useState<any>(null);

     const onLoad = React.useCallback(function callback(map: any) {
          const bounds = new window.google.maps.LatLngBounds(
               props.coords || localStorage.getItem("coords")
          );
          map.fitBounds(bounds);
          setMap(map);
     }, []);

     const onUnmount = React.useCallback(function callback(map: any) {
          setMap(null);
     }, []);
     function handleCenter() {
          if (!mapRef.current) return;

          const newPos = mapRef.current.getCenter().toJSON();
          setCenter(newPos);
     }
     function handleLoad(map: any) {
          mapRef.current = map;
     }
     return isLoaded ? (
          <GoogleMap
               id="map"
               mapContainerStyle={containerStyle}
               center={position}
               zoom={10}
               onClick={(e) => {
                    const coords = {
                         lat: e.latLng?.lat(),
                         lng: e.latLng?.lng(),
                    };
                    if (coords) {
                         props.setCoordsForCityDisplay(coords);
                         props.setShowOnMap(false);
                         searchCityByCoords(coords)
                              .then((res) =>
                                   props.setSelectedCityDataFromMap(res)
                              )
                              .catch((err) => console.log(err));
                    }
               }}
               onLoad={handleLoad}
               onUnmount={onUnmount}
               onDragEnd={handleCenter}
          >
               {/* Child components, such as markers, info windows, etc. */}
               <></>
          </GoogleMap>
     ) : (
          <></>
     );
};

export default React.memo(DisplayMap);
