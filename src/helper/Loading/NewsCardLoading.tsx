import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NewsCardLoading = () => {
  return (
    <div className=" border px-3 py-5 dark:border-none border-[#edf0f1] rounded-sm">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center w-full ">
          <div className="w-11 h-11">
            <Skeleton className=" w-full h-full rounded-full" />
          </div>
          <div className="w-4/12 h-full">
            <Skeleton className="w-full h-full rounded-sm" />
            <Skeleton className="w-3/4 h-3/4 rounded-sm" />
          </div>
        </div>
        <div className="w-7 h-8 mr-4">
          <Skeleton className="w-full h-full rounded-t-md rounded-sm" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="h-5  my-2" />
      </div>
      <Skeleton className="h-60 my-2" />
      <Skeleton className="h-3 rounded-sm" count={4} />
      <div className="my-1">
        <Skeleton className="h-[1px] rounded-sm" />
      </div>
      <div className="sm:px-4  flex gap-6 items-center">
        <div className="h-6 w-full">
          <Skeleton className=" w-full h-full  rounded-sm" />
        </div>
        <div className="h-6 w-full">
          <Skeleton className=" w-full h-full  rounded-sm" />
        </div>
        <div className="h-6 w-full">
          <Skeleton className=" w-full h-full  rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardLoading;
