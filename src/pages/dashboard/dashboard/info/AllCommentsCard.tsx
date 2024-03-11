import { CommentType } from "@/helper/Type";
import { FaComments } from "react-icons/fa";

const AllCommentsCard = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className="bg-orange-400 w-60 px-5 py-2 rounded-sm">
      <div className="flex">
        <div className="flex flex-col flex-1 items-center justify-center">
          <FaComments className="text-7xl text-gray-200" />
          <h1 className="text-gray-100 text-[13px]">Total Comments</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-4xl text-gray-100 font-bold">
            {comments?.length < 10 ? (
              <span>0{comments?.length}</span>
            ) : (
              <span> {comments?.length}</span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AllCommentsCard;
