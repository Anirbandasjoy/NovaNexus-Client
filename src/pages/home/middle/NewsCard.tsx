// import { FaRegBookmark } from "react-icons/fa";
import { BiComment, BiEdit, BiLike } from "react-icons/bi";

import {
  AuthContextType,
  DateTimeFormatOptions,
  NewsType,
} from "../../../helper/Type";
import { Link, useNavigate } from "react-router-dom";
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
import React, { useContext } from "react";
import { AuthContext } from "@/contex/AuthProvider";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuBookmarkPlus } from "react-icons/lu";
// import useFetchNews from "@/hooks/news/useFetchNews";
import useGetSingleUserProfile from "@/hooks/userProfile/useGetSingleUserProfile";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeleteNews from "@/hooks/news/useDeleteNews";
import { AiOutlineCheckCircle } from "react-icons/ai";

const NewsCard = ({ news }: { news?: NewsType }) => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  const { axiosInstance } = useAxios();
  const { refetch: bookmarkRefetch } = useFetchNewsBookmark();
  // const { refetch: newsRefetch } = useFetchNews();
  const { handleDeleteNews } = useDeleteNews();
  const { sigleUserProfile } = useGetSingleUserProfile(user?.email);
  const userId = sigleUserProfile?.payload?._id;
  const navigate = useNavigate();
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
      const toastId = toast.loading("Creating bookmark...");
      const { data } = await axiosInstance.post("/news-bookmark", {
        newsId: id,
        profileId: userId,
      });
      console.log(data);
      toast.success("Created a new Bookmark", {
        id: toastId,
      });
      bookmarkRefetch();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("News already exists");
    }
  };

  const deleteNews = async (id?: string) => {
    if (!id) return;
    await handleDeleteNews(id);
  };

  const handleCommentNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="">
      <div className="bg-white  rounded-md pb-4 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 space-y-3">
          <div className="flex   justify-between">
            <Link
              to={`/profile/${news?.profileId?.email}`}
              className="flex gap-3 "
            >
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
              <div className="relative">
                <h1 className="font-semibold text-gray-600 dark:text-gray-300">
                  {news?.profileId?.fullName}
                </h1>
                <h2 className="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(news?.profileId?.createdAt)}
                </h2>
                {news?.status === "approved" && (
                  <div className="flex gap-1 absolute -right-24 -top-1">
                    <AiOutlineCheckCircle className="text-red-500 text-[14px]" />
                    <h1 className="text-xs text-red-500">Verifed News</h1>
                  </div>
                )}
              </div>
            </Link>
            {/* <div onClick={() => handleCreateBookmark(news?._id)}>
              <FaRegBookmark className="sm:text-2xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
            </div> */}
            {/* <div className="mr-2">
              <BsThreeDots className="sm:text-3xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
            </div> */}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="mr-2">
                  <BsThreeDots className="sm:text-3xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={() => handleCreateBookmark(news?._id)}
                  >
                    <LuBookmarkPlus />
                    Bookmark
                  </div>
                </DropdownMenuItem>
                {user?.email === news?.profileId?.email && (
                  <>
                    <DropdownMenuItem>
                      <Link
                        to={`/edit-post/${news?._id}`}
                        className="flex gap-1 items-center cursor-pointer"
                      >
                        <BiEdit />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div
                        className="flex gap-1 items-center cursor-pointer"
                        onClick={() => deleteNews(news?._id)}
                      >
                        <RiDeleteBin6Line />
                        Delete
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
          {user ? (
            <div>
              <Drawer>
                <DrawerTrigger>
                  <div className="flex items-center lg:px-7 gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
                    <BiComment className="text-[21px] w-full text-gray-500 dark:text-gray-300" />
                    <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
                      Comment
                    </p>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    {/* <Textarea className="bg-gray-200" /> */}
                    <div className="lg:w-6/12 w-full mx-auto ">
                      <div className="h-[70vh] overflow-auto">
                        <Comments payload={news} formatDate={formatDate} />
                      </div>
                    </div>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div>
          ) : (
            <div
              onClick={handleCommentNavigate}
              className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200"
            >
              <BiComment className="text-[21px] text-gray-500 dark:text-gray-300" />
              <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
                Comment
              </p>
            </div>
          )}
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
