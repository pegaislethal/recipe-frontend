import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl ="http://localhost:8000/api"

export const Axios = axios.create({
  baseURL: baseUrl,
});

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    console.log('Request URL:', config.url); // Check the URL
    console.log('Token present:', !!token);  // Check if the token is present

    if (token && !config.url.includes('/recipes/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
