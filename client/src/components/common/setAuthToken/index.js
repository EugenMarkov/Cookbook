import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    localStorage.setItem("cookBookAuthToken", token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("cookBookAuthToken");
  }
};

export default setAuthToken;
