import { FaBookmark } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useFetchNewsBookmark from "../../../hooks/newBookmark/useFetchNewsBookmark";
import { NewsType } from "../../../helper/Type";
import toast from "react-hot-toast";
import { useAxios } from "../../../hooks/axios/useAxios";
const RightSide = () => {
  const { bookmarkNews, refetch } = useFetchNewsBookmark();
  const { axiosInstance } = useAxios();
  const handleDeleteBookmarkNews = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/news-bookmark/${id}`);
      console.log(data);
      toast.success("Delete this News");
      console.log(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(bookmarkNews);
  return (
    <div className=" dark:text-gray-300 hidden sm:block w-5/12 ">
      <div className="bg-gray-300 py-2 cursor-pointer flex justify-center gap-2 items-center dark:bg-gray-800  dark:border dark:border-gray-700 px-2  dark:text-gray-300 text-center text-gray-700  ">
        <FaBookmark className="sm:text-xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
        <h1 className="tex-lg sm:text-lg  font-bold ">All Bookmarks</h1>
      </div>
      <div className="mt-5 w-full sm:h-[calc(100vh-72px)] h-[calc(100vh-50px)] overflow-auto space-y-3">
        {bookmarkNews?.payload?.map((news: NewsType) => {
          return (
            <div
              key={news?._id}
              className=" bg-gray-300  dark:bg-gray-800  dark:border dark:border-gray-700   dark:text-gray-300 text-center text-gray-700  font-bold  "
            >
              <div className="w-full cursor-pointer relative">
                <img src={news?.newsId?.thumbnail_url} alt="NewsImage" />
                <IoMdClose
                  className="text-xl bg-white text-gray-600 rounded-sm p-[1px] absolute top-0 right-0"
                  onClick={() => handleDeleteBookmarkNews(news?._id)}
                />
              </div>
              <h1 className="py-2">{news?.newsId?.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSide;
