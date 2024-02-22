import { FaRegBookmark } from "react-icons/fa";
import { BiComment, BiLike } from "react-icons/bi";
import { DateTimeFormatOptions, NewsType } from "../../../helper/Type";
import { Link } from "react-router-dom";
import { useAxios } from "../../../hooks/axios/useAxios";
import toast from "react-hot-toast";
import useFetchNewsBookmark from "../../../hooks/newBookmark/useFetchNewsBookmark";
import ShareNews from "./ShareNews";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Comments from "@/pages/newsDetails/Comments";

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
              {news?.profileId?.profileImage === null ? (
                <div>
                  <div className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                    {news?.profileId?.fullName?.slice(0, 2)}
                  </div>
                </div>
              ) : (
                <div className="w-11">
                  <img
                    className="w-full h-full rounded-full cursor-pointer"
                    src={news?.profileId?.profileImage}
                    alt="profile"
                  />
                </div>
              )}
              <div>
                <h1 className="font-semibold text-gray-600 dark:text-gray-300">
                  {news?.profileId?.fullName}
                </h1>
                <h2 className="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(news?.profileId?.createdAt)}
                </h2>
              </div>
            </div>
            <div onClick={() => handleCreateBookmark(news?._id)}>
              <FaRegBookmark className="sm:text-2xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold  text-gray-600 dark:text-gray-300">
              {news?.title}
              {/* Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S.
              Military Aid Package Yet */}
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
          {/* <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiComment className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Comment
            </p>
          </div> */}

          {/* modal start  */}
          <div>
            <Drawer className="w-full ">
              <DrawerTrigger className="w-full">
                <div className="flex items-center lg:px-7 gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
                  <BiComment className="text-[21px] w-full text-gray-500 dark:text-gray-300" />
                  <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
                    Comment
                  </p>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="lg:w-6/12 w-full mx-auto ">
                  {/* <Textarea className="bg-gray-200" /> */}
                  <div className="h-[70vh] overflow-auto">
                    <Comments payload={news} formatDate={formatDate} />
                  </div>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
          {/* modal end  */}

          <ShareNews
            shareURL={
              `https://novanexus.vercel.app/news-details/${news?._id}` || null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
