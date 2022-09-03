import { axiosAbraInstence } from "./axiosAbraInstence";

export const getFromFavorites = async (shoudFetch = true) => {
     console.log(shoudFetch);
     if (!shoudFetch) return;
     const token = localStorage.getItem("token");
     try {
          const res = await axiosAbraInstence.get("/favorites/", {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          return res;
     } catch (err) {
          console.log(err);
     }
};
