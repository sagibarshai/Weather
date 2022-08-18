import axios from "axios";
export const axiosAbraInstence = axios.create({
     baseURL: "https://weather-abra.herokuapp.com/api",
     
});
