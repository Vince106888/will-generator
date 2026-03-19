// file: apps/web/src/lib/api.ts
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? window.location.origin : "http://localhost:4000");

export const api = axios.create({
  baseURL
});
