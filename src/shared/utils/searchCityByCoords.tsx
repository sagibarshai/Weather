import axios from "axios";
import { Coords } from "../../components/Map";
const key = "HzrijhpGAVKFhKoEY3ivKakM4eiJoQJH";
export const searchCityByCoords = async (coords: Coords) => {
     let lat = coords.lat;
     let lng = coords.lng;
     let coordsStringTamplate = `${lat},${lng}`;
     if (!coords) return;
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${coordsStringTamplate}`
          );
          const data = await response.data;
          return data;
     } catch (err) {
          console.log(err);
     }
};
