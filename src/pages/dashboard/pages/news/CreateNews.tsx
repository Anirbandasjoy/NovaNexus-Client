import { BsFillSendArrowDownFill } from "react-icons/bs";
import Title from "../../../../helper/dasboardTitle/Title";
import useFetchCategories from "../../../../hooks/category/useFetchCategories";
import { categoriesType } from "@/helper/Type";
// import { categoriesType } from "../../../../helper/Type";
import * as yup from "yup";
type NewsFormValueType = {
  title: string;
  details: string;
};
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";

const NewsSchema = yup.object({
  title: yup.string().required(),
  details: yup.string().required(),
});

const CreateNews = () => {
  const { categories } = useFetchCategories();
  const category = categories?.payload;
  // const [selectCategory, setSelectCategory] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValueType>({
    mode: "onChange",
    resolver: yupResolver(NewsSchema),
  });

  const onSubmit = (data: NewsFormValueType) => {
    console.log(data);
  };

  return (
    <div>
      <Title title="Post News" />

      <div className=" max-w-2xl mx-auto mt-5 sm:mt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1 w-full">
              <input
                {...register("title")}
                type="text"
                placeholder="Title"
                className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
              />
              <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                {errors.title?.message}
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full ">
              <Select>
                <SelectTrigger className="focus:outline-none py-3 bg-[#ecf0f1] px-3  border-gray-300 border text-gray-400 dark:text-gray-400 dark:bg-gray-800  dark:border-gray-600   text-sm rounded-md">
                  <SelectValue
                    className="dark:text-gray-600 focus:outline-none"
                    placeholder={category ? "Breaking News" : "Loading..."}
                  />
                </SelectTrigger>
                <SelectContent className=" bg-[#ecf0f1]   border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md ">
                  {category?.map((cat: categoriesType) => (
                    <SelectItem
                      key={cat._id}
                      value={cat.name}
                      className="cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-500"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs dark:text-red-400 font-semibold"></p>
            </div>
          </div>

          <div>
            <textarea
              {...register("details")}
              className="py-5 bg-[#ecf0f1] px-5 resize-none  border-gray-300 border  dark:text-white dark:bg-gray-800 dark:border-gray-600  outline-none text-sm rounded-md w-full h-52"
              placeholder="Details"
            ></textarea>
            <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
              {errors.details?.message}
            </p>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="file"
              placeholder="thumbnail"
              className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
            />
            <p className="text-red-500 text-xs dark:text-red-400 font-semibold"></p>
          </div>
          <button
            type="submit"
            className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-white  flex items-center justify-center gap-1 cursor-pointer"
          >
            <span className="font-bold">Save to Submit</span>
            <BsFillSendArrowDownFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
