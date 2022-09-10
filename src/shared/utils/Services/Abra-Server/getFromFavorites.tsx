import { axiosAbraInstenceInterceptor } from "./axiosAbraInstence";

export const getFromFavorites = async () => {
     const res = await axiosAbraInstenceInterceptor.get("/favorites/");
     return res;
};
