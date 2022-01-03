import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44345/",
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
});