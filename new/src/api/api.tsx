import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7122/api/",
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response && error.response.error === 401) {
      console.log("Đóe xác minh thì làm sao mà vào đc :V");
    }
    if (error.response && error.response.error === 403) {
      console.log("Đóe Quyền :V");
    }
    return Promise.reject(error);
  }
);
export default instance;