import axios from "axios";
import { Coords } from "../../../../components/Map/types";
const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
export const searchCityByCoords = async (coords: Coords | undefined) => {
     if (!coords || !coords.lat || !coords.lng) return;
     else if (coords) {
          const { lat, lng } = coords;
          if (lat && (lat < -90 || lat > 90)) return;
          if (lng && (lng < -180 || lng > 180)) return;
     }
     let lat = coords.lat;
     let lng = coords.lng;
     let coordsStringTamplate = `${lat},${lng}`;
     const response = await axios.get(
          `//dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${coordsStringTamplate}`
     );
     const data = await response.data;
     return data;
};
