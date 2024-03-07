import { IoMdClose } from "react-icons/io";
import useFetchNewsBookmark from "../../../hooks/newBookmark/useFetchNewsBookmark";
import { AuthContextType, NewsType } from "../../../helper/Type";
import { SiZeromq } from "react-icons/si";
import toast from "react-hot-toast";
import { useAxios } from "../../../hooks/axios/useAxios";
import { LuBookmarkPlus } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contex/AuthProvider";
import { Link } from "react-router-dom";
const RightSide = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  const [filterBookmarkData, setFilterBookmarkData] = useState([]);
  const { bookmarkNews, refetch } = useFetchNewsBookmark();
  const { axiosInstance } = useAxios();
  const handleDeleteBookmarkNews = async (id: string) => {
    try {
      const toastId = toast.loading("Deleting bookmar...");
      const { data } = await axiosInstance.delete(`/news-bookmark/${id}`);
      console.log(data);
      toast.success("Delete this News", {
        id: toastId,
      });
      console.log(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filterData = bookmarkNews?.payload?.filter(
      (news: NewsType) => news?.profileId?.email === user?.email
    );
    setFilterBookmarkData(filterData);
  }, [bookmarkNews?.payload, user?.email]);
  // console.log(bookmarkNews);

  console.log(bookmarkNews?.payload);
  return (
    <div className=" dark:text-gray-300  w-full ">
      <div className="bg-gray-300 py-2 cursor-pointer flex justify-center gap-2 items-center dark:bg-gray-800  dark:border dark:border-gray-700 px-2  dark:text-gray-300 text-center text-gray-700  ">
        <LuBookmarkPlus className="sm:text-xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
        <Link to="/bookmarks" className="tex-lg sm:text-lg  font-bold ">
          All Bookmarks
        </Link>
      </div>
      {filterBookmarkData?.length === 0 ||
      bookmarkNews?.payload?.length === 0 ||
      bookmarkNews?.payload === undefined ? (
        <div className="flex justify-center mt-4 bg-blue-100 py-14">
          <div className="flex flex-col gap-2 items-center justify-center w-full ">
            <SiZeromq className="text-red-500" />
            <h1 className="text-red-500 font-bold text-lg">Not Added</h1>
          </div>
        </div>
      ) : (
        <div className="mt-5 w-full sm:h-[calc(100vh-145px)] h-[calc(100vh-50px)] overflow-auto space-y-3">
          {filterBookmarkData?.map((news: NewsType) => {
            return (
              <div
                key={news?._id}
                className=" bg-gray-300  relative dark:bg-gray-800  dark:border dark:border-gray-700   dark:text-gray-300  items-center flex text-center text-gray-700  font-bold  "
              >
                <div className="w-16 h-14 cursor-pointer ">
                  <img
                    className="w-full h-full rounded-sm"
                    src={news?.newsId?.thumbnail_url}
                    alt="NewsImage"
                  />
                </div>
                <Link to={`/news-details/${news?.newsId?._id}`} className=" ">
                  <h1 className=" text-left ml-4 hover:underline text-blue-600">
                    {news?.newsId?.title?.slice(0, 15)}
                  </h1>
                  <h2 className="font-normal  ml-4 text-left text-[8px]">
                    {news?.newsId?.details?.slice(0, 35)}...
                  </h2>
                </Link>
                <IoMdClose
                  className="text-xl bg-white cursor-pointer dark:bg-gray-900 dark:text-white dark:border dark:border-gray-500 text-gray-600 rounded-sm p-[1px] absolute top-0 right-0"
                  onClick={() => handleDeleteBookmarkNews(news?._id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RightSide;
