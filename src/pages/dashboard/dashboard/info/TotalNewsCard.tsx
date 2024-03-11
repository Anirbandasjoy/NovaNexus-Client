import { NewsType } from "@/helper/Type";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";

const TotalNewsCard = ({ news }: { news: NewsType[] }) => {
  return (
    <div className="bg-purple-500 w-60 px-5 py-2 rounded-sm">
      <div className="flex">
        <Link
          to="all-news"
          className="flex flex-col flex-1 items-center justify-center"
        >
          <FaNewspaper className="text-7xl text-gray-200" />
          <h1 className="text-gray-100">Total News</h1>
        </Link>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-4xl text-gray-100 font-bold">
            {news?.length < 10 ? (
              <span>0{news?.length}</span>
            ) : (
              <span> {news?.length}</span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalNewsCard;
