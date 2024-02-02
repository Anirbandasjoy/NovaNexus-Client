import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchNewsBookmark = () => {
  const { axiosInstance } = useAxios();
  const {
    data: bookmarkNews,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["bookmarkNews"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/news-bookmark");
      return data;
    },
  });

  return { bookmarkNews, isLoading, isError, refetch };
};

export default useFetchNewsBookmark;
