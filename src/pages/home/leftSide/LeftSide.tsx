import useFetchCategories from "../../../hooks/category/useFetchCategories";

const LeftSide = () => {
  const { categories } = useFetchCategories();
  console.log(categories);
  return (
    <div className="bg-gray-300 dark:bg-gray-800  py-2 px-2  w-5/12 dark:border dark:border-gray-700">
      <h1 className="tex-lg sm:text-lg dark:text-gray-300 text-center text-gray-700  font-bold  ">
        All Categories
      </h1>
    </div>
  );
};

export default LeftSide;
