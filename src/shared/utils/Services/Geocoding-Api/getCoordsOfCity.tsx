import axios from "axios";

const key = "e92fab503e7882cf036a92fa156ba435";
export const getCoordsOfCity = async (cityName: string | undefined) => {
     if (!cityName) return;
     try {
          const response = await axios.get(
               `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`
          );
          const data = await response.data;
          return data;
     } catch (err) {
          console.log(err);
     }
};
