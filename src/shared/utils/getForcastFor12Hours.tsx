import axios from "axios";
const key = "yXrT65x8TG2XpEH2Aatvz9vey0QnECKl";
export const getForcastFor12Hours = async (
     cityKey: number | string | undefined
) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityKey}?apikey=${key}`,
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
