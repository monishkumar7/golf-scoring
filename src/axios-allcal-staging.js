import axios from "axios";

const instance = axios.create({
  baseURL: "https://staging.api.dashboard.allcal.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
