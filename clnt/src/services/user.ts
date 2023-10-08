import * as http from "../utils/http";
import { endpoints } from "../constants/endpoints";
import { baseURL } from "../constants/Constants";

// export const getAllProductService = async (): Promise<any> => {
//   const res = await http.get(`${baseURL}${endpoints.user.GETALLPRODUCTS}`);
//   return res.data;
// };

export const searchProduct = async (data: any): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.SEARCH_PRODUCTS}?productname=${data}`);
  return res.data;
};

export const fetchCategory = async (): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.GET_CATEGORY}`);
  return res.data;
};

export const addProduct = async (data: any): Promise<any> => {
  const res = await http.post(`${baseURL}${endpoints.user.ADDPRODUCT}`, data);
  return res.data;
}

export const addCategory = async (data: any): Promise<any> => {
  const res = await http.post(`${baseURL}${endpoints.user.ADD_CATEGORY}`, data)
  return res.data;
}

export const getAllProductService = async (currentPage:any,limit:any): Promise<any> => {
  console.log(currentPage,limit);
  const res = await http.get(`${baseURL}${endpoints.user.GETALLPRODUCTS}?page=${currentPage}&perPage=${limit}`)
  return res.data;
}
