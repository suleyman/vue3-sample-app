import Axios from "axios";

const http = Axios.create({
  baseURL: "/",
});

export default http;
