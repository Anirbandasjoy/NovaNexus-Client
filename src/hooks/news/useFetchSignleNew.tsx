import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchSignleNew = (id: string | undefined) => {
  const { axiosInstance } = useAxios();
  const {
    data: newsDetails,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/news/${id}`);
      return data;
    },
  });

  return { newsDetails, isLoading, refetch };
};

export default useFetchSignleNew;
