import { axiosAbraInstenceInterceptor } from "./axiosAbraInstence";
import store from "../../../../redux/store";
export const getFromFavorites = async () => {
     const token = store.getState().authSlice.token;
     if (token) {
          const res = await axiosAbraInstenceInterceptor(token).get(
               "/favorites/"
          );
          return res;
     }
};
