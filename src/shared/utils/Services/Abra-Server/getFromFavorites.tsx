import { axiosAbraInstence } from "./axiosAbraInstence";
import { checkToken } from "./checkToken";

export const getFromFavorites = async () => {
     const token = localStorage.getItem("token");
     try {
          const res = await axiosAbraInstence.get("/favorites/", {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log(res);
     } catch (err) {
          console.log(err);
     }
};
