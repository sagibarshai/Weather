import { axiosAbraInstence } from "./axiosAbraInstence";
import { FavoriteType } from "../../../../pages/Favorites";
export const favoritesHandler = async (data: FavoriteType) => {
     const token = localStorage.getItem("token");
     try {
          const res = await axiosAbraInstence.post("/favorites/", data, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          return res;
     } catch (err) {
          console.log(err);
     }
     return data;
};
