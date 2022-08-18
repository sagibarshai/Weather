import { axiosAbraInstence } from "./axiosAbraInstence";
import { checkToken } from "./checkToken";
type DataType = {
     key: number;
     city: string;
     country: string;
};
export const addToFavorites = async (data: DataType) => {
     const token = localStorage.getItem("token");
     try {
          const res = await axiosAbraInstence.post("/favorites/", data, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log(res);
     } catch (err) {
          console.log(err);
     }
     console.log(data);
};
