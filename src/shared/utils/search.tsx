import axios from "axios";
const key = "a0fAeh4WNQogoSnGgTgtd1jurQ55rYAD";
export const search = async (value: string) => {
     const arr: string[] = [];
     try {
          const response = await axios.get(
               `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${value}`
          );
          const data = await response.data;
          for (let item of data) {
               arr.push(item.LocalizedName);
          }
          return arr;
     } catch (err) {
          return console.log(err);
     }
};
