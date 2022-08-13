import axios from "axios";
const key = "GiDRLW0CerLLF00AqI8FvtEKQIyg0G73";
export const selectCity = async (cityKey: string | number | undefined) => {
     if (!cityKey) return;
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${key}`,
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
