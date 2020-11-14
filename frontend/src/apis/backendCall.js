import axios from "axios";

const baseURL = "http://localhost:8000";

const backendCall = axios.create({
  baseURL: baseURL,
});

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
