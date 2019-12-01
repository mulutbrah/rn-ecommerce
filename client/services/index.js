import axios from "axios";

export const rnComs = axios.create({
  baseURL: "https://localhost:3000"
});
