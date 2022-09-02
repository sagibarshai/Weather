import { axiosAbraInstence } from "./axiosAbraInstence";
import { FavoriteType } from "../../../../pages/Favorites";
export const addToFavorites = async (data: FavoriteType) => {
     console.log(data);
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
