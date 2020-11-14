import axios from "axios";

const baseURL = "http://localhost:8000/";

const register = (email, password, first_name, last_name, income) => {
  return axios.post(baseURL + "register", {
    first_name,
    last_name,
    income,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(baseURL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.id) {
        localStorage.setItem("userId", JSON.stringify(response.data.id));
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("userId");
};

const update = (income, email, first_name, last_name) => {
  return axios.put(baseURL + `user/\${localStorage.getItem('userId')`, {
    email,
    first_name,
    last_name,
    income,
    password,
  });
};

export default {
  register,
  login,
  logout,
  update,
};
