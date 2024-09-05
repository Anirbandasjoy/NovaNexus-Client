/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import { useAxios } from "@/hooks/axios/useAxios";

type Category = {
  _id: string;
  name: string;
};

type CategoryTableProps = {
  categories: Category[];
  refetch: any;
};

type EditFormValues = {
  name: string;
};

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  refetch,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { axiosInstance } = useAxios();
  const { register, handleSubmit, reset } = useForm<EditFormValues>();

  // Function to handle opening the edit modal
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    reset({ name: category.name });
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  // Handle the form submission for editing a category
  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    if (selectedCategory) {
      console.log(data, selectedCategory);
      try {
        await axiosInstance.put(`/categories/edit/${selectedCategory._id}`, {
          name: data?.name,
        });
        refetch();
        toast.success("Category updated successfully!");
        closeModal();
      } catch (error) {
        toast.error("Failed to update category.");
      }
    }
  };

  // Function to handle delete operation
  const handleDeleteClick = async (categoryId: string) => {
    try {
      await axiosInstance.delete(`/categories/delete/${categoryId}`);
      refetch(); // Refresh the category list after deletion
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-[21rem] overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category: any) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {category?._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {category.name}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteClick(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
