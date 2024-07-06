import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // Ensures cookies are sent and received
});

// Request interceptor to include the JWT token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
