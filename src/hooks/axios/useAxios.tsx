import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  // baseURL: "https://nova-nexus-server.vercel.app/api/v1",
});
export const useAxios = () => {
  return { axiosInstance };
};
