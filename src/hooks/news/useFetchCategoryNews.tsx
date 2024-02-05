import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchCategoryNews = (id: string | undefined) => {
  const { axiosInstance } = useAxios();
  const {
    data: categoryNews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["CategoryNews", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/news/category-news/${id}`);
      return data;
    },
  });

  return { categoryNews, isLoading, refetch };
};

export default useFetchCategoryNews;
