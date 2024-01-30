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
type categoriesType = {
  _id: string;
  name: string;
  slug: string;
};
const LeftSide = () => {
  const { categories } = useFetchCategories();
  return (
    <div className="w-5/12 hidden sm:block overflow-hidden">
      <h1 className="tex-lg bg-gray-300 py-2 dark:bg-gray-800  dark:border dark:border-gray-700 px-2 sm:text-lg dark:text-gray-300 text-center text-gray-700  font-bold  ">
        All Categories
      </h1>
      <div className="mt-6 ml-5 flex gap-3">
        <div className="space-y-4">
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
        </div>
        <div className="space-y-4 w-full">
          {categories?.payload?.map((category: categoriesType) => {
            return (
              <div key={category?._id} className="">
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
