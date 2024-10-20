import axios from "axios";
const port = import.meta.env.VITE_PORT

const axiosInstance = axios.create({
  baseURL: `https://evangadi-forum-server-p9h0.onrender.com/api`,
});

export default axiosInstance;
