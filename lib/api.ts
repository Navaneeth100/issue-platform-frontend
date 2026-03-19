import axios from "axios";

const API = axios.create({
  baseURL: "https://issue-platform-backend.onrender.com",
});

export default API;