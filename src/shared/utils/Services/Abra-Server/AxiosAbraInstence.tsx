import axios from "axios";
import store from "../../../../redux/store";
import { logout } from "../../../../redux/authSlice";
const { dispatch } = store;

// const token = store.getState().authSlice.token;
// const token = localStorage.getItem("token");
export const axiosAbraInstence = axios.create({
     baseURL: "//weather-abra.herokuapp.com/api",
});
export const axiosAbraInstenceInterceptor = (token?: string) => {
     return axios.create({
          baseURL: "//weather-abra.herokuapp.com/api",
          headers: {
               Authorization: token ? `Bearer ${token} ` : "",
          },
     });
};

axiosAbraInstenceInterceptor().interceptors.response.use(
     (res) => res,
     (err) => {
          // if (token) {
          if (err.response.status === 401) dispatch(logout());
          // }
          return Promise.reject(err);
     }
);
