import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useGetAllUsersProfile = (search: string | null | undefined) => {
  const { axiosInstance } = useAxios();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersProfile", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/profile?search=${search}`);
      return data;
    },
  });

  return { users, isLoading, refetch };
};

export default useGetAllUsersProfile;
