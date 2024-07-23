import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const headers = {};
      if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      }

      const result = await axiosInstance({
        url: "http://localhost:4000" + baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data || {} }; // Return an empty object if no data
    } catch (axiosError) {
      let err = axiosError;
      console.log("error: ", err);
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default axiosBaseQuery;
