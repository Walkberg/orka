import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // ton backend NestJS
  headers: { "Content-Type": "application/json" },
});

export default instance;
