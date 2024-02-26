import { BsFillSendArrowDownFill } from "react-icons/bs";
import useFetchCategories from "../../../../hooks/category/useFetchCategories";
import { AuthContextType, categoriesType } from "@/helper/Type";
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
import React, { ChangeEvent, useContext, useState } from "react";
import { uploadImage } from "@/api";
import { AuthContext } from "@/contex/AuthProvider";
import useGetSingleUserProfile from "@/hooks/userProfile/useGetSingleUserProfile";
import { useAxios } from "@/hooks/axios/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetchNews from "@/hooks/news/useFetchNews";
// import { useState } from "react";

const NewsSchema = yup.object({
  title: yup.string().required(),
  details: yup.string().required(),
});

const CreateNews = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  const { axiosInstance } = useAxios();
  const { sigleUserProfile } = useGetSingleUserProfile(user?.email);
  const profileId = sigleUserProfile?.payload?._id;
  const navigate = useNavigate();
  const { categories } = useFetchCategories();
  const category = categories?.payload;
  const { refetch: allNewsRefetch } = useFetchNews();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValueType>({
    mode: "onChange",
    resolver: yupResolver(NewsSchema),
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectNewsImage, setSelectNewsImage] = useState<File | null>(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setImageUploadLoading(true);
        const NewsImage = await uploadImage(file);
        setSelectNewsImage(NewsImage);
        setImageUploadLoading(false);
      } catch (error) {
        console.log(error);
        setImageUploadLoading(false);
      }
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const onSubmit = async (data: NewsFormValueType) => {
    const uploadNewsInfo = {
      title: data?.title,
      details: data?.details,
      thumbnail_url: selectNewsImage,
      category: selectedCategory || categories?.payload[0]?._id,
      profileId: profileId,
    };
    try {
      const toastId = toast.loading("Creating a new news...");
      const { data } = await axiosInstance.post("/news", uploadNewsInfo);
      console.log(data);
      toast.success("News created", {
        id: toastId,
      });
      allNewsRefetch();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" ">
      <div className="max-w-3xl mx-auto ">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col  gap-4">
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
            <div
              className="flex flex-col gap-1 w-full "
              onChange={handleSelectChange}
            >
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
                      value={cat._id}
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
              required
              onChange={handleFileInputChange}
              type="file"
              placeholder="thumbnail"
              className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
            />
            <p className="text-red-500 text-xs dark:text-red-400 font-semibold"></p>
            {imageUploadLoading ? (
              <p className="text-blue-500 text-xs dark:text-red-400 font-semibold">
                Uploading...
              </p>
            ) : (
              ""
            )}
          </div>
          {imageUploadLoading ? (
            <button
              disabled
              className="py-2 px-3 cursor-not-allowed w-full rounded-md bg-[#1abc9c] text-white  flex items-center justify-center gap-1 "
            >
              <span className="font-bold">Save to Submit</span>
              <BsFillSendArrowDownFill />
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-white  flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="font-bold">Save to Submit</span>
              <BsFillSendArrowDownFill />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
