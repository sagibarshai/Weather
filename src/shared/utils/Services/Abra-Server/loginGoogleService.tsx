import { axiosAbraInstence } from "./axiosAbraInstence";
interface LoginGoogleData {
     access_token: string;
     id_token?: string;
}
export const loginGoogleService = async (data: LoginGoogleData) => {
     const response = await axiosAbraInstence.post("/auth/login/google/", data);
     const returenData = await response.data;
     return returenData;
};
