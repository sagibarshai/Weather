import axios from "axios";
import { Result } from "../../components/SearchBox";
import useDebounce from "./useDebouncedSearch";
// const key = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const key = "Iz6k8zAGFuniAMgAaqUnvRl09PTaAG57";
export const search = async (value: string) => {
     const arr: Result[] = [];
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${value}`,
               {
                    headers: { "Content-type": "application/json" },
               }
          );
          const data = await response.data;
          for (let item of data) {
               arr.push(item);
          }
          return arr;
     } catch (err) {
          return console.log(err);
     }
};
