import axios, { AxiosInstance } from "axios";
import { getAsyncStorageValue } from "../utilities/get-async-storage-contents.utility";

// export const baseURL = 'http://192.168.89.51:3000';
// export const baseURL = 'http://192.168.0.244:3000'; // --> Danubio
// export const baseURL = 'http://192.168.0.102:3000'; // --> Elizeth
// export const baseURL = 'http://192.168.1.13:3000'; // --> Nala
// export const baseURL = 'http://192.168.0.244:3000/api'; // --> test back local
// export const baseURL = 'http://192.168.20.45:3000'; // --> Pospin 5G
export const baseURL = "http://206.189.238.131:3000/api/"; // --> cloud

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAsyncStorageValue("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
