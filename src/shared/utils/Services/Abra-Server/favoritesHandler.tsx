import { axiosAbraInstenceInterceptor } from "./axiosAbraInstence";
import { FavoriteType } from "../../../../pages/Favorites/types";
import store from "../../../../redux/store";

export const favoritesHandler = async (data: FavoriteType) => {
     const token = store.getState().authSlice.token;
     if (token) {
          const res = await axiosAbraInstenceInterceptor(token).post(
               "/favorites/",
               data
          );
          return res;
     }
};
