import axios from "axios";
const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
export const search = async (value: string) => {
     try {
          const response = await axios.get(
               `//dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${value}`,
               {
                    headers: { "Content-type": "application/json" },
               }
          );
          const data = await response.data;

          return data;
     } catch (err) {
          return console.log(err);
     }
};
