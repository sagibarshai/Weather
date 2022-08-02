import axios from "axios";
const key = "zM88EAJOyO21yWdjPEFbbYWWy6iN4iFN";
export const selectCity = async (cityKey: string | number) => {
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
