import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAxios } from "@/hooks/axios/useAxios";
import useFetchSignleNew from "@/hooks/news/useFetchSignleNew";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
const PostEditSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();
type EditFormType = {
  title: string | undefined;
  description: string | undefined;
};
const EditNews = () => {
  const { id } = useParams();
  const { newsDetails, refetch: SingleNewsRefetch } = useFetchSignleNew(id);
  const navigate = useNavigate();
  const news = newsDetails?.payload;
  const { axiosInstance } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PostEditSchema),
  });
  const onSubmit = async (data: EditFormType) => {
    try {
      const toastId = toast.loading("Post Updateing...");
      const { data: NewsUpdatedData } = await axiosInstance.put(`/news/${id}`, {
        title: data?.title,
        details: data?.description,
      });
      toast.success("Updated post", { id: toastId });
      console.log(NewsUpdatedData);
      SingleNewsRefetch();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="lg:w-4/12 w-full ">
        <h1 className="mb-5 text-xl font-bold text-blue-400">Edit Your Post</h1>
        <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1.5">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-500"
            >
              Title
            </label>
            <Input
              {...register("title")}
              type="text"
              id="email"
              placeholder="Type news title"
              className="w-full py-5"
              defaultValue={news?.title}
            />
            <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
              {errors.title?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-500"
            >
              Description
            </label>
            <Textarea
              {...register("description")}
              placeholder="Type your description..."
              className="h-48 resize-none py-3"
              defaultValue={news?.details}
            />
            <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
              {errors.description?.message}
            </p>
          </div>
          <div className="mt-6">
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
