import axios from "axios";
const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
export const getForcastFor12Hours = async (
     cityKey: number | string | undefined
) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `//dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityKey}?apikey=${key}&details=true&metric=true`,
               {
                    headers: { "Content-type": "application/json" },
               }
          );
          const data = await response.data;
          return data;
     } catch (err) {
          console.log(err);
     }
};
