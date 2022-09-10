import { axiosAbraInstenceInterceptor } from "./axiosAbraInstence";
import { FavoriteType } from "../../../../pages/Favorites/types";
export const favoritesHandler = async (data: FavoriteType) => {
     const res = await axiosAbraInstenceInterceptor.post("/favorites/", data);
     return res;
};
