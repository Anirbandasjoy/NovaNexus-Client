import { useAxios } from "../axios/useAxios";
import useFetchNews from "./useFetchNews";
import toast from "react-hot-toast";

const useDeleteNews = () => {
  const { refetch: newsRefetch } = useFetchNews();
  const { axiosInstance } = useAxios();
  const handleDeleteNews = async (id?: string) => {
    try {
      const toastId = toast.loading("Deleting news...");
      const { data } = await axiosInstance.delete(`/news/${id}`);
      console.log(data);
      newsRefetch();
      toast.success("News deleted", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { handleDeleteNews };
};

export default useDeleteNews;
