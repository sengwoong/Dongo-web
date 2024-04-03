import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";


export function getJWTHeader(userToken: string): Record<string, string> {
  return { 
      'Authorization': userToken
  };
}


const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
