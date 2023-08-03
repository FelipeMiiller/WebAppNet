import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7077/api",
});

export default api;
