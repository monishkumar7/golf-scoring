import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.allcal.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
