import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.alyoumsa.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);

export default api;
