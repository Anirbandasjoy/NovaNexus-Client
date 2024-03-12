import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useGetAllUsersProfile = () => {
  const { axiosInstance } = useAxios();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/profile?limit=20&page=1`);
      return data;
    },
  });

  return { users, isLoading, refetch };
};

export default useGetAllUsersProfile;
