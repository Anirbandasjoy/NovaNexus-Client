import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchAllComments = () => {
  const { axiosInstance } = useAxios();
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/news-comments");
      return data;
    },
  });

  return { comments, isLoading, refetch };
};

export default useFetchAllComments;
