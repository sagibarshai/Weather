import axios from "axios";
const key = "KKv26VA4AOQ3mn6FW1hpdRztJPAjfZ7o";
export const getForcastFor12Hours = async (
     cityKey: number | string | undefined
) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityKey}?apikey=${key}&details=true&metric=true`,
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
