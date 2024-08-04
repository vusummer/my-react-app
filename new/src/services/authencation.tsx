import { AxiosResponse } from "axios";
import axios from "../api/api";
import { RegisterDto } from "../models/authencation-model/register";
import { LoginDto } from "../models/authencation-model/login";
 
const controller = "Authentication";

export const postRegister = async(url: string, data: RegisterDto) => {
  console.log(data);
    const res = await axios
    .post<RegisterDto>(`${controller}/${url}`,data)
    .then((response: AxiosResponse)=>{
        return response.data;
    })
    .catch((error)=>{
        console.log(error);
    });
    return res;
};

export const postLogin = async(url: string, data: LoginDto) => {
    const res = await axios
    .post<LoginDto>(`${controller}/${url}`,data)
    .then((response: AxiosResponse)=>{
        return response.data;
    })
    .catch((error)=>{
        console.log(error);
    });
    return res;
};