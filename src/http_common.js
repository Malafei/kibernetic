import axios from "axios";
import { HOST } from "./constants/ActionConst";

export default axios.create({
  baseURL: HOST,
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
});