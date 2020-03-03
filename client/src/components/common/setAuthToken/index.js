import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    localStorage.setItem("authToken", token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("authToken");
  }
};

export default setAuthToken;
