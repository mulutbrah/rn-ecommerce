import Constants from "expo-constants";
import axios from "axios";

const { manifest } = Constants;

const local =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000`)
    : `api.example.com`;

const createAPI = (baseURL = local, config = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    },
    ...config
  });

  // setup axios.intercept
  return axiosInstance;
};

const api = createAPI();

export function customAPI(url) {
  return createAPI(url);
}

export default api;
