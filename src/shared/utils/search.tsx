import axios from "axios";
import { Result } from "../../components/SearchBox";
const key = "GABTEO5IFpJa9LXq4Ixq4e9mCKE0HdCz";
export const search = async (value: string) => {
     const arr: Result[] = [];
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${value}`
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
