import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (request) => {
    const sid = localStorage.getItem("sid");
    if (sid) {
      request.headers["X-Frappe-Session"] = sid;
    }
    console.log("Start Request", request);
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);

    return response.data;
  },
  (error) => {
    console.log("RESPONSE ERROR", { error });
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("sid");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
    }
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.message ||
      "Unknown Error";
    return Promise.reject({ message });
  }
);

export default apiService;
