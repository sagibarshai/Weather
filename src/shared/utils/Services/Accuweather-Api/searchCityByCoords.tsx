import axios from "axios";
import { Coords } from "../../../../components/Map/types";
const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
export const searchCityByCoords = async (coords: Coords | undefined) => {
     if (!coords) return;
     let lat = coords.lat;
     let lng = coords.lng;
     let coordsStringTamplate = `${lat},${lng}`;
     const response = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${coordsStringTamplate}`
     );
     const data = await response.data;
     return data;
};
