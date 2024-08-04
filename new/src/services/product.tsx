import { AxiosResponse } from "axios";
import axios from "../api/api";
import { ProductDto } from "../models/product";

export const getAllProducts = async (url: string): Promise<ProductDto[]> => {
    try {
      const response: AxiosResponse<{ products: ProductDto[] }> = await axios.get(url);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  };

export const getProduct = async (url: string, id: string | undefined)=> {
    try {
        const response: AxiosResponse<{ product: ProductDto }> = await axios.get(`${url}/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};
