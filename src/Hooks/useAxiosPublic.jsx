import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://sge-project01-backend.vercel.app",
  // baseURL: "https://careful-panoramic-willow.glitch.me/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
