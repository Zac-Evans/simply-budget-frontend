import axios from "axios";

const baseURL = "https://simply-budget-backend.herokuapp.com";

export default axios.create({
  baseURL: baseURL,
});
