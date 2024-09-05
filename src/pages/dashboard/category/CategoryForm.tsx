/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAxios } from "@/hooks/axios/useAxios";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type CategoryFormData = {
  name: string;
};

const CategoryForm = ({ refetch }: { refetch: any }) => {
  const { axiosInstance } = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      console.log("Category added:", data);
      const res = await axiosInstance.post("/categories", {
        name: data?.name,
      });
      console.log(res);
      toast.success("Category added successfully!");
      refetch();
      reset();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-sm shadow-sm mb-8">
      <h2 className="text-2xl font-semibold mb-6">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Category name is required" })}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter category name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-800 transition"
        >
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
