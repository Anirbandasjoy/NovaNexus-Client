import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchAllReacts = () => {
  const { axiosInstance } = useAxios();
  const {
    data: reacts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["react"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/react");
      return data;
    },
  });

  return { reacts, isLoading, refetch };
};

export default useFetchAllReacts;
