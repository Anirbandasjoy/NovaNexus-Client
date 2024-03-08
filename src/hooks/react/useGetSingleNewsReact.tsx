import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useGetSingleNewsReact = (id: string | undefined | null) => {
  const { axiosInstance } = useAxios();
  const {
    data: singleNewsReacts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleNewsReacts", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/react/${id}`);
      return data;
    },
  });

  return { singleNewsReacts, isLoading, refetch };
};

export default useGetSingleNewsReact;
