import { ReactType } from "@/helper/Type";
import { BiSolidLike } from "react-icons/bi";
const AllReactsCard = ({ reacts }: { reacts: ReactType[] }) => {
  return (
    <div className="bg-pink-400 w-60 px-5 py-2 rounded-sm">
      <div className="flex">
        <div className="flex flex-col flex-1 items-center justify-center">
          <BiSolidLike className="text-7xl text-gray-200" />
          <h1 className="text-gray-100 text-[13px]">Total Reacts</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-4xl text-gray-100 font-bold">
            {reacts?.length < 10 ? (
              <span>0{reacts?.length}</span>
            ) : (
              <span> {reacts?.length}</span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllReactsCard;
