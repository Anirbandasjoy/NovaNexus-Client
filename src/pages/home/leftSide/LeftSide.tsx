import Skeleton from "react-loading-skeleton";
import useFetchCategories from "../../../hooks/category/useFetchCategories";
import {
  FcAdvance,
  FcAdvertising,
  FcBinoculars,
  FcBusinessman,
  FcCandleSticks,
  FcCollaboration,
  FcDeployment,
  FcElectricity,
  FcEndCall,
  FcFrame,
} from "react-icons/fc";
import { categoriesType } from "../../../helper/Type";

const LeftSide = ({
  getCategoryId,
}: {
  getCategoryId: (id: string | undefined) => void;
}) => {
  const { categories, isLoading, isError } = useFetchCategories();
  const handleCategoryNews = (id: string) => {
    getCategoryId(id);
  };
  console.log({ length: categories?.payload?.length });
  return (
    <div className="w-6/12  hidden sm:block overflow-hidden">
      <h1 className="tex-lg bg-gray-300 py-2 dark:bg-gray-800  dark:border dark:border-gray-700 px-2 sm:text-lg dark:text-gray-300 text-center text-gray-700  font-bold  ">
        All Categories
      </h1>
      <div className="mt-6 ml-5 flex gap-3">
        <div
          className={`space-y-4 ${isLoading && "hidden"} ${
            isError && "hidden"
          } `}
        >
          <FcAdvertising className="text-[24px] cursor-pointer" />
          <FcAdvance className="text-[24px] cursor-pointer" />
          <FcEndCall className="text-[24px] cursor-pointer" />
          <FcBusinessman className="text-[24px] cursor-pointer" />
          <FcBinoculars className="text-[24px] cursor-pointer" />
          <FcCandleSticks className="text-[24px] cursor-pointer" />
          <FcCollaboration className="text-[24px] cursor-pointer" />
          <FcDeployment className="text-[24px] cursor-pointer" />
          <FcFrame className="text-[24px] cursor-pointer" />
          <FcElectricity className="text-[24px] cursor-pointer" />
          {categories?.payload && categories?.payload?.length > 10 ? (
            <>
              {Array.from({ length: categories?.payload?.length - 10 }).map(
                (_, index) => (
                  <div key={index}>
                    <FcAdvance className="text-[24px] cursor-pointer" />
                  </div>
                )
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="space-y-4 w-full">
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="h-6 w-6">
                <Skeleton
                  className="my-2 rounded-sm w-full h-full"
                  count={categories?.payload?.length || 10}
                />
              </div>
              <div className="h-6 w-44 ">
                <Skeleton
                  className="my-2 rounded-sm w-full h-full"
                  count={categories?.payload?.length || 10}
                />
              </div>
            </div>
          )}
          {categories?.payload?.map((category: categoriesType) => {
            return (
              <div
                key={category?._id}
                className=""
                onClick={() => handleCategoryNews(category?._id)}
              >
                <h1 className="font-semibold hover:text-red-400 duration-75 w-full cursor-pointer text-[16px]  dark:text-gray-400 text-gray-500">
                  {category?.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
