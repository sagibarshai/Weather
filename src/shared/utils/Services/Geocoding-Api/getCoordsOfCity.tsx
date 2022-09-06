import axios from "axios";

const key = process.env.REACT_APP_GEO_LOCATION_API_KEY;
export const getCoordsOfCity = async (cityName: string | undefined) => {
     if (!cityName) return;
     try {
          const response = await axios.get(
               `//api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`
          );
          const data = await response.data;
          return data;
     } catch (err) {
          console.log(err);
     }
};
