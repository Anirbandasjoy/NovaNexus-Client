import { useAxios } from "../axios/useAxios";
import useFetchNews from "./useFetchNews";
import toast from "react-hot-toast";

type Comment = {
  _id: string;
};

const useDeleteNews = () => {
  const { refetch: newsRefetch } = useFetchNews();
  const { axiosInstance } = useAxios();

  const handleDeleteNews = async (
    id?: string,
    comments?: Comment[] | undefined
  ) => {
    try {
      const toastId = toast.loading("Deleting news...");

      // Delete the news item
      await axiosInstance.delete(`/news/${id}`);
      console.log({ comments });
      // Delete associated comments
      if (comments && comments.length > 0) {
        await Promise.all(
          comments.map((comment) =>
            axiosInstance.delete(`/news-comments/comments/${comment._id}`)
          )
        );
      }

      newsRefetch();
      toast.success("News Deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete news");
    }
  };

  return { handleDeleteNews };
};

export default useDeleteNews;
