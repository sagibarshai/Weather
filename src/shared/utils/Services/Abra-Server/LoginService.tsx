import { axiosAbraInstence } from "./axiosAbraInstence";
export const loginService = async (data: {
     email: string;
     password: string;
}) => {
     const response = await axiosAbraInstence.post("/auth/login/", {
          email: data.email,
          password: data.password,
     });
     return response;
};
