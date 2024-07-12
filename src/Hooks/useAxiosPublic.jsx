import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://sge-project01-backend.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;