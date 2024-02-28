import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFetchNews from "@/hooks/news/useFetchNews";
import { NewsType } from "@/helper/Type";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import { FcCancel, FcHighPriority, FcOk } from "react-icons/fc";
import useDeleteNews from "@/hooks/news/useDeleteNews";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import useUpdateStatus from "@/hooks/news/useUpdateStatus";

const PendingNews = () => {
  const { newsData } = useFetchNews();
  const { handleUpdateStatus } = useUpdateStatus();
  const { handleDeleteNews } = useDeleteNews();
  const [pendingNews, setPendingNews] = useState([]);
  const allNewsData = newsData?.payload;
  const handleApprovedNews = async (id?: string | undefined) => {
    if (!id) return;
    await handleUpdateStatus(id, "approved");
  };
  const handleRejectNews = async (id?: string | undefined) => {
    if (!id) return;
    await handleUpdateStatus(id, "rejected");
  };
  const deleteNews = async (id?: string) => {
    if (!id) return;
    await handleDeleteNews(id);
  };

  useEffect(() => {
    const filterData = allNewsData?.filter(
      (news: NewsType) => news?.status === "pending"
    );
    setPendingNews(filterData);
  }, [allNewsData]);

  if (!pendingNews || pendingNews.length === 0 || pendingNews === undefined) {
    return (
      <div className="text-white py-2 font-semibold bg-red-500 flex items-center gap-2 pl-5">
        <MdErrorOutline className="text-lg  animate-bounce" />
        <h1>News Not Found</h1>
      </div>
    );
  }

  return (
    <div className="sm:h-[calc(100vh-120px)] h-[calc(100vh-170px)] overflow-auto ">
      <h1 className="my-2 text-sm">Pending News</h1>
      <Table className="z-10 ">
        {/* <TableCaption>A list of your Pending News.</TableCaption> */}
        <TableHeader className="bg-white dark:bg-gray-800">
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {pendingNews?.map((news: NewsType) => {
            return (
              <TableRow key={news?._id}>
                {/* <TableCell className="">
                  <img
                    className="w-10 h-8 "
                    src={news?.thumbnail_url}
                    alt={news?.title}
                  />
                </TableCell> */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    {news?.status === "pending" && "Pending"}
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/profile/${news?.profileId?.email}`}
                    className="flex items-center gap-2"
                  >
                    {news?.profileId?.profileImage === null ? (
                      <div className="">
                        <div className="font-bold capitalize bg-blue-600 h-8 w-8 rounded-full text-sm flex justify-center items-center text-white">
                          {news?.profileId?.fullName?.slice(0, 2)}
                        </div>
                      </div>
                    ) : (
                      <div className="w-8 h-8">
                        <img
                          className="w-full h-full rounded-full"
                          src={news?.profileId?.profileImage}
                          alt="ProfileImage"
                        />
                      </div>
                    )}
                    <div className="hover:underline">
                      {news?.profileId?.fullName}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-blue-600 hover:underline cursor-pointer">
                  <Link to={`/news-details/${news?._id}`}>Lear More</Link>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-blue-400 dark:text-white text-gray-900 text-sm px-3 py-1 rounded-sm font-normal">
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <div
                          className="flex gap-1 items-center cursor-pointer"
                          onClick={() => handleApprovedNews(news?._id)}
                        >
                          <FcOk className="text-lg" />
                          Approved
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          className="flex gap-1 items-center cursor-pointer"
                          onClick={() => handleRejectNews(news?._id)}
                        >
                          <FcHighPriority className="text-lg" />
                          Rejected
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div
                          className="flex gap-1 items-center cursor-pointer"
                          onClick={() => deleteNews(news?._id)}
                        >
                          <FcCancel className="text-[19px]" />
                          Delete
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingNews;
