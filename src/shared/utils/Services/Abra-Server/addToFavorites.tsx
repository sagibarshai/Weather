import { axiosAbraInstence } from "./axiosAbraInstence";
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
          return res;
     } catch (err) {
          console.log(err);
     }
     console.log(data);
};
