import { axiosAbraInstence } from "./axiosAbraInstence";
export const loginService = async (email: string, password: string) => {
     const response = await axiosAbraInstence.post("/auth/login/", {
          email,
          password,
     });
     return response;
};