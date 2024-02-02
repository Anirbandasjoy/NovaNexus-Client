import { FaRegBookmark } from "react-icons/fa";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { DateTimeFormatOptions, NewsType } from "../../../helper/Type";
import { Link } from "react-router-dom";
import { useAxios } from "../../../hooks/axios/useAxios";
import toast from "react-hot-toast";
import useFetchNewsBookmark from "../../../hooks/newBookmark/useFetchNewsBookmark";

const NewsCard = ({ news }: { news?: NewsType }) => {
  const { axiosInstance } = useAxios();
  const { refetch } = useFetchNewsBookmark();
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";

    const options: DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleCreateBookmark = async (id?: string) => {
    try {
      const { data } = await axiosInstance.post("/news-bookmark", {
        newsId: id,
      });
      console.log(data);
      toast.success("Create a new Bookmark");
      refetch();
    } catch (error) {
      // console.log(error.message);
      toast.error("News already exists");
    }
  };
  return (
    <div className="">
      <div className="bg-white  rounded-md pb-4 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 space-y-3">
          <div className="flex items-center  justify-between">
            <div className="flex gap-3">
              <div className="w-11">
                <img
                  className="w-full h-full rounded-full cursor-pointer"
                  src={news?.author?.image}
                  alt="profile"
                />
              </div>
              <div>
                <h1 className="font-semibold text-gray-600 dark:text-gray-300">
                  {news?.author?.name}
                </h1>
                <h2 className="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(news?.author?.publishDate)}
                </h2>
              </div>
            </div>
            <div onClick={() => handleCreateBookmark(news?._id)}>
              <FaRegBookmark className="sm:text-2xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold  text-gray-600 dark:text-gray-300">
              Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S.
              Military Aid Package Yet
            </h1>
          </div>
        </div>
        <div className="w-full space-y-3 ">
          <Link
            to={`/news-details/${news?._id}`}
            className="w-full cursor-pointer"
          >
            <img
              className="w-full h-full bg-cover"
              src={news?.thumbnail_url}
              alt="news"
            />
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 px-4">
            {news?.details?.slice(0, 400)}
            <Link
              className="ml-3 text-[#d72050] dark:text-red-400"
              to={`/news-details/${news?._id}`}
            >
              Read_More
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:px-4 w-full h-[1px] bg-gray-200 dark:bg-gray-700"></div>
        <div className="sm:px-4 mt-2 flex gap-6 sm:gap-0 items-center ">
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiLike className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Like
            </p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiComment className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Comment
            </p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiShare className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
