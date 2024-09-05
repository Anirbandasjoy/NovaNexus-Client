// import { FaRegBookmark } from "react-icons/fa";
import {
  BiComment,
  BiEdit,
  BiLike,
  BiShare,
  BiSolidLike,
} from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AuthContextType,
  CommentType,
  DateTimeFormatOptions,
  NewsType,
  ReactType,
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
import React, { useContext, useEffect, useState } from "react";
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
import { FcApproval } from "react-icons/fc";
import useFetchAllReacts from "@/hooks/react/useFetchAllReacts";
import likeSound from "../../../assets/audio/like.mp3";
import useGetSingleNewsReact from "@/hooks/react/useGetSingleNewsReact";
import TimeAgo from "@/components/timeAgo/TimeAgo";

type Comment = {
  _id: string;
};

const NewsCard = ({ news }: { news?: NewsType }) => {
  const [playLikeSound, setPlayLikeSound] = useState(false);
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  const { axiosInstance } = useAxios();
  const { refetch: bookmarkRefetch } = useFetchNewsBookmark();
  const { handleDeleteNews } = useDeleteNews();
  const { sigleUserProfile } = useGetSingleUserProfile(user?.email);
  const userId = sigleUserProfile?.payload?._id;
  const navigate = useNavigate();
  const { reacts, refetch: reactRefetch } = useFetchAllReacts();
  const [newsId, setNewsId] = useState<string | undefined | null>(null);
  const { singleNewsReacts, refetch: singleNewsReactRefetch } =
    useGetSingleNewsReact(newsId);
  console.log(singleNewsReacts);

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

  const deleteNews = async (id?: string, comments?: Comment[] | undefined) => {
    if (!id) return;
    await handleDeleteNews(id, comments);
  };

  const handleCommentNavigate = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (playLikeSound) {
      const audio = new Audio(likeSound);
      audio.play();
      audio.onended = () => {
        setPlayLikeSound(false);
      };
    }
  }, [playLikeSound]);

  const handleCreateReact = async (newsId: string | undefined) => {
    if (!newsId) return;
    const react = "like";
    try {
      const { data } = await axiosInstance.post("/react", {
        newsId,
        profileId: userId,
        react,
      });
      console.log(data);
      singleNewsReactRefetch();
      reactRefetch();
      setPlayLikeSound(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleNewsReact = async (id: string | undefined | null) => {
    setNewsId(id);
  };

  useEffect(() => {
    handleSingleNewsReact(news?._id);
  }, [news?._id]);
  console.log(singleNewsReacts);

  return (
    <div className="">
      <div className="bg-white  rounded-md pb-4 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 space-y-3">
          <div className="flex   justify-between">
            <Link
              to={`/profile/${news?.profileId?.email}`}
              className="flex gap-3 "
            >
              <div className="relative">
                {news?.profileId?.profileImage === null ? (
                  <div>
                    <div className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                      {news?.profileId?.fullName?.slice(0, 2)}
                    </div>
                  </div>
                ) : (
                  <div className="w-11 h-11">
                    <img
                      className="w-full h-full rounded-full object-cover cursor-pointer"
                      src={news?.profileId?.profileImage}
                      alt="profile"
                    />
                  </div>
                )}
                {news?.profileId?.isVerified === "verified" && (
                  <FcApproval className="text-[17px] absolute -bottom-1 right-[1px]" />
                )}
              </div>
              <div className="relative">
                <h1 className="font-semibold text-gray-600 dark:text-gray-300">
                  {news?.profileId?.fullName}
                </h1>
                <h2 className="text-xs text-gray-600 dark:text-gray-300">
                  <TimeAgo date={news?.createdAt || ""} />
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
                        onClick={() => deleteNews(news?._id, news?.comments)}
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
        <div className="mt-8 mb-2">
          <div className="flex justify-between px-8">
            <div className="flex gap-1 items-center">
              <BiSolidLike className="text-green-400" />

              <Dialog>
                <DialogTrigger>
                  <p className="text-xs text-gray-600">
                    {singleNewsReacts?.payload?.length}
                    <span className="cursor-pointer hover:underline ml-[2px]">
                      others
                    </span>
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <h1 className="text-green-500 font-bold">ALL</h1>
                    </DialogTitle>
                    <div className="w-full h-[1px] bg-gray-500"></div>
                    <DialogDescription>
                      <div className="h-60 overflow-auto mt-2 space-y-4">
                        {singleNewsReacts?.payload?.map((react: ReactType) => (
                          <div>
                            {react?.profileId?.email && (
                              <div className="flex gap-2 items-center">
                                <Link
                                  to={`/profile/${react?.profileId?.email}`}
                                  className=""
                                >
                                  {react?.profileId?.profileImage === null ? (
                                    <div>
                                      <div className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                                        {news?.profileId?.fullName?.slice(0, 2)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-11 h-11">
                                      <img
                                        className="w-full h-full rounded-full object-cover cursor-pointer"
                                        src={react?.profileId?.profileImage}
                                        alt="profile"
                                      />
                                    </div>
                                  )}
                                </Link>
                                <div>
                                  <Link
                                    to={`/profile/${react?.profileId?.email}`}
                                    className="hover:underline cursor-pointer text-[15px] font-bold"
                                  >
                                    {react?.profileId?.fullName}
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-1  items-center">
              <BiComment className="text-green-400" />
              <Dialog>
                <DialogTrigger>
                  <p className="text-xs text-gray-600">
                    {news?.comments?.length}
                    <span className="cursor-pointer hover:underline ml-[2px]">
                      others
                    </span>
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <h1 className="text-green-500 font-bold">ALL</h1>
                    </DialogTitle>
                    <div className="w-full h-[1px] bg-gray-500"></div>
                    <DialogDescription>
                      <div className="h-60 overflow-auto mt-2 space-y-4">
                        {news?.comments?.map((comment: CommentType) => (
                          <div>
                            {comment?.profileId?.email && (
                              <div className="flex gap-2 items-center">
                                <Link
                                  to={`/profile/${comment?.profileId?.email}`}
                                  className=""
                                >
                                  {comment?.profileId?.profileImage === null ? (
                                    <div>
                                      <div className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                                        {news?.profileId?.fullName?.slice(0, 2)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-11 h-11">
                                      <img
                                        className="w-full h-full rounded-full object-cover cursor-pointer"
                                        src={comment?.profileId?.profileImage}
                                        alt="profile"
                                      />
                                    </div>
                                  )}
                                </Link>
                                <div>
                                  <Link
                                    to={`/profile/${comment?.profileId?.email}`}
                                    className="hover:underline cursor-pointer text-[15px] font-bold"
                                  >
                                    {comment?.profileId?.fullName}
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <BiShare className="text-green-400" />
              <p className="text-xs text-gray-600">12</p>
            </div>
          </div>
        </div>
        <div className=" sm:px-4 w-11/12 mx-auto h-[1px] bg-gray-200 dark:bg-gray-700"></div>
        <div className="sm:px-4 mt-2 flex gap-6 sm:gap-0 items-center ">
          {reacts?.payload?.find(
            (react: ReactType) =>
              react?.newsId === news?._id && react?.profileId === userId
          ) ? (
            <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100  dark:hover:bg-gray-700 py-1 justify-center  rounded-sm text duration-200">
              <BiSolidLike className="text-[21px] text-green-500 dark:text-green-500" />
              <p className="text-[17px] font-bold text-green-500 dark:text-green-500">
                Like
              </p>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200"
              onClick={() => handleCreateReact(news?._id)}
            >
              <BiLike className="text-[21px] text-gray-500 dark:text-gray-300" />
              <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
                Like
              </p>
            </div>
          )}

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
        <div className=" sm:px-4 w-11/12 mx-auto h-[1px] mt-2  bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default NewsCard;
