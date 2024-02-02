import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchNews = () => {
  const { axiosInstance } = useAxios();
  const {
    data: newsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/news");
      return data;
    },
  });

  return { newsData, isLoading, refetch };
};

export default useFetchNews;
