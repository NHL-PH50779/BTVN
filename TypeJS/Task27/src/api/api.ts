import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-class-o1lo.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
