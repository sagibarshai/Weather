import { axiosAbraInstence } from "./axiosAbraInstence";
export const checkToken = async () => {
     const res = await axiosAbraInstence.post("/auth/verify-token/", {
          token: localStorage.getItem("token"),
     });
     if (res.status === 200) return true;
     return false;
};
