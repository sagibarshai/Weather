import { axiosAbraInstence } from "./axiosAbraInstence";
import store from "../../../../redux/store";
import authSlice from "../../../../redux/authSlice";
const token = store.getState().authSlice.token;
export const checkToken = async () => {
     const res = await axiosAbraInstence.post("/auth/verify-token/", {
          token,
     });
     if (res.status === 200) return true;
     return false;
};
