import axios from "./axios";

const api = async ({ method = "GET", url, data, params, headers, auth }) => {
  let res;

  try {
    res = await axios({ method, url, data, params, headers, auth });
    return res?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export default api;