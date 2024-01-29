import useFetchCategories from "../../../hooks/category/useFetchCategories";
type categoriesType = {
  _id: string;
  name: string;
  slug: string;
};
const LeftSide = () => {
  const { categories } = useFetchCategories();
  console.log(categories);
  return (
    <div className="    w-5/12 ">
      <h1 className="tex-lg bg-gray-300 py-2 dark:bg-gray-800  dark:border dark:border-gray-700 px-2 sm:text-lg dark:text-gray-300 text-center text-gray-700  font-bold  ">
        All Categories
      </h1>
      <div className="space-y-3 mt-6 ml-5">
        {categories?.payload?.map((category: categoriesType) => {
          return (
            <div key={category?._id} className="">
              <h1 className="font-semibold cursor-pointer  dark:text-gray-400 text-gray-500">
                {category?.name}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSide;
