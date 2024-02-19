import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const useGetSingleUserProfile = (email: string | undefined | null) => {
  const { axiosInstance } = useAxios();
  const {
    data: sigleUserProfile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleUserProfile", email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/profile/single-user-profile/${email}`
      );
      return data;
    },
  });

  return { sigleUserProfile, isLoading, refetch };
};

export default useGetSingleUserProfile;
