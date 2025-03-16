import axios from "axios";
import config from "../config.json";

const mAxios = axios.create({
  baseURL: config.apiUrl,
  withCredentials: false,
  crossDomain: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default mAxios;