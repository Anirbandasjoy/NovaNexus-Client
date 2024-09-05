import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchNews = (searchQuery = "") => {
  const { axiosInstance } = useAxios();
  const {
    data: newsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["news", searchQuery],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/news`, {
        params: { search: searchQuery },
      });
      return data;
    },
  });

  return { newsData, isLoading, refetch };
};

export default useFetchNews;
