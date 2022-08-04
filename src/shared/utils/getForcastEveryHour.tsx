import axios from "axios";
const key = "RJKVxmDN2eeFnAl1MmCUUqJYKQkA3WPI";
export const getForcastEveryHour = async (
     cityKey: number | string | undefined
) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${cityKey}?apikey=${key}`,
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
