import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useFetchCategories = () => {
  const { axiosInstance } = useAxios();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/categories");
      return data;
    },
  });

  return { categories, isLoading };
};

export default useFetchCategories;
