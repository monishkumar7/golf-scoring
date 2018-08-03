import axios from "axios";

const instance = axios.create({
  baseURL: "https://staging.api.allcal.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
