import { AxiosResponse } from "axios";
import axios from "../api/api";
import { CategoryDto } from "../models/category";

export const getAllCategories = async (url:string)=> {
    const res = await axios.get<CategoryDto[]>(url).then((response:AxiosResponse)=>{
        return response.data.categories;
    })
    .catch((error)=>{
        console.log(error);
    })
    return res;
};
export const getCategory = async (url:string, id:number) => {
    const res = await axios.get<CategoryDto>(`${url}/${id}`).then((response:AxiosResponse)=>{
        return response.data;
    })
    .catch((error)=>{
        console.log(error);
    })
    return res;
};