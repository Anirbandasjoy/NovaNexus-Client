import { useAxios } from "../axios/useAxios";
import useFetchNews from "./useFetchNews";
import toast from "react-hot-toast";

const useUpdateStatus = () => {
  const { refetch: newsRefetch } = useFetchNews();
  const { axiosInstance } = useAxios();
  const handleUpdateStatus = async (id?: string, status?: string) => {
    console.log({ id, status });
    try {
      const toastId = toast.loading("Updating status...");
      const { data } = await axiosInstance.patch(`news/update-status/${id}`, {
        status,
      });
      console.log(data);
      newsRefetch();
      toast.success("Status updated", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { handleUpdateStatus };
};

export default useUpdateStatus;
