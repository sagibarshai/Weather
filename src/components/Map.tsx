import { Map as GoogleMap, GoogleApiWrapper } from "google-maps-react";
import { useRef, useEffect, useState } from "react";
// AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs
type Props = {
     coords: { lat: number; lng: number };
     google: any;
};
const DisplayMap: React.FC<Props> = (props) => {
     const [map, setMap] = useState<google.maps.Map>();

     const googleRef = useRef();
     useEffect(() => {
          if (googleRef.current && !map) {
               setMap(new window.google.maps.Map(googleRef.current, {}));
          }
     }, [googleRef, map]);
     return (
          <div ref={googleRef.current}>
               <GoogleMap
                    initialCenter={props.coords}
                    zoom={10}
                    style={{ width: "100%", height: "100%" }}
                    google={props.google}
                    onClick={(e) => console.log(e)}
               />
          </div>
     );
};
export default GoogleApiWrapper({
     apiKey: "AIzaSyAgLCyxSADazy6Orz55RLmosWpVRjQeFcs",
})(DisplayMap);
