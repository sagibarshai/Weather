import axios from "axios";
export const axiosAbraInstence = axios.create({
     baseURL: "//weather-abra.herokuapp.com/api",
});

