import axios from "axios";
const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
export const getHourlyForcast = async (cityKey: string | undefined) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `//dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityKey}?apikey=${key}`
          );
          const data = await response.data;
          return data;
     } catch (err) {
          console.log(err);
     }
};
