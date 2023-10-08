import { baseURL } from "../constants/Constants";
import { endpoints } from "../constants/endpoints";
import { ILoginData } from "../interfaces/authInterface";
import { http } from "../utils/http";


export const postSignupService = async (data: any): Promise<any> => {
    const res = await http.post(`${baseURL}${endpoints.auth.SIGNUP}`, data);
    return res.data;
};

export const postLoginService = async (data: ILoginData): Promise<any> => {
    const res = await http.post(`${baseURL}${endpoints.auth.SIGNIN}`, data);
    return res.data;
};

export const changePassword = async (data: any): Promise<any> => {
    const res = await http.put(`${baseURL}${endpoints.auth.CHANGE_PASSWORD}`, data)
    return res.data;
}

export const forgotPassword = async (data: string): Promise<any> => {
    const res = await http.post(`${baseURL}${endpoints.auth.FORGOT_PASSWORD}`, data)
    return res.data;
}

export const verifyOtp = async (data: any): Promise<any> => {
    const res = await http.post(`${baseURL}${endpoints.auth.VERIFY_OTP}`, data)
    return res.data;
}

export const resetPassword = async (data: any): Promise<any> => {
    const res = await http.post(`${baseURL}${endpoints.auth.RESET_PASSWORD}`, data);
    return res.data;
}
