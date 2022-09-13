import { axiosAbraInstence } from "../Abra-Server/axiosAbraInstence";
interface LoginFacebook {
     access_token: string;
     id_token?: string;
}
export const loginFacebookService = async (data: LoginFacebook) => {
     const response = await axiosAbraInstence.post(
          "/auth/login/facebook/",
          data
     );
     const returenData = await response.data;
     return returenData;
};
