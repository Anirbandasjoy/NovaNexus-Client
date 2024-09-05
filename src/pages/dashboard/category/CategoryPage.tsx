import Title from "@/helper/dasboardTitle/Title";
import CategoryForm from "./CategoryForm";
import useFetchCategories from "@/hooks/category/useFetchCategories";
import CategoryTable from "./CategoryTable";
// import CategoryTable from "./CategoryTable";

const CategoryPage: React.FC = () => {
  const { categories, refetch } = useFetchCategories();
  const allCategories = categories?.payload || [];
  return (
    <div className="">
      <Title title="Category" />
      <div className="mt-4">
        <CategoryForm refetch={refetch} />
        <CategoryTable categories={allCategories} refetch={refetch} />
      </div>
    </div>
  );
};

export default CategoryPage;
