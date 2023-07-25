import axios from "axios";

const env =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://projeto-barber-frontend-dev.vercel.app/api";

export const api = axios.create({
  baseURL: `${process.env.BASE_URL ?? env}`,
});
