import axios from "axios";
import { Result } from "../../components/SearchBox";
// const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const key = "kIbjvvrrd7TCA1OWlyA0btQeNmp92CA4";
export const search = async (value: string) => {
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${value}`,
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
