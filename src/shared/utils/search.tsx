import axios from "axios";
const key = "8d76Gqi2HkQC428aZ2LXS07F871Eybcq";
export const search = async (value: string) => {
     const arr: string[] = [];
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
