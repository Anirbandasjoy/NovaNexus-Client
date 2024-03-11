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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import useGetAllUsersProfile from "@/hooks/userProfile/useGetAllUsersProfile";
import Title from "../../../../helper/dasboardTitle/Title";

import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FcApproval, FcCancel, FcHighPriority, FcOk } from "react-icons/fc";
import { ProfileType } from "@/helper/Type";
import toast from "react-hot-toast";
import { useAxios } from "@/hooks/axios/useAxios";
import useFetchNews from "@/hooks/news/useFetchNews";

const Users = () => {
  const { users, refetch: usersRefetch } = useGetAllUsersProfile();
  const { refetch: allNewsRefetch } = useFetchNews();
  const allUsers = users?.payload?.userProfiles;
  const { axiosInstance } = useAxios();

  const handleVerifyUserProfile = async (
    email: string | undefined,
    isVerified?: string | undefined
  ) => {
    if (!email) return;
    try {
      const toastId = toast.loading("Updating...");
      const { data } = await axiosInstance.patch(
        `/profile/update-verification/${email}`,
        { isVerified }
      );
      console.log(data);
      toast.success("Verified", {
        id: toastId,
      });
      usersRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id?: string | undefined) => {
    try {
      const toastId = toast.loading("Deleting...");
      const { data } = await axiosInstance.delete(`/profile/${id}`);
      console.log(data);
      toast.success("Deleted user", {
        id: toastId,
      });
      usersRefetch();
      allNewsRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Title title="All Users" />
      <div className="sm:h-[calc(100vh-120px)] h-[calc(100vh-170px)] mt-4 overflow-auto ">
        {/* <h1 className="my-2 text-sm">Pending News</h1> */}
        <Table className="z-10 ">
          {/* <TableCaption>A list of your Pending News.</TableCaption> */}
          <TableHeader className="bg-white dark:bg-gray-800">
            <TableRow>
              <TableHead>Verification</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {allUsers?.map((user: ProfileType) => {
              return (
                <TableRow key={user?._id}>
                  {/* <TableCell className="">
                  <img
                    className="w-10 h-8 "
                    src={news?.thumbnail_url}
                    alt={news?.title}
                  />
                </TableCell> */}
                  <TableCell>
                    {user?.isVerified === "verified" ? (
                      <div className="flex items-center gap-2">
                        <FcApproval className="text-lg" />
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FcCancel className="text-lg" />
                        Not Verified
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/profile/${user?.email}`}
                      className="flex items-center gap-2"
                    >
                      {user?.profileImage === null ? (
                        <div className="">
                          <div className="font-bold capitalize bg-blue-600 h-9 w-9 rounded-full text-sm flex justify-center items-center text-white">
                            {user?.fullName?.slice(0, 2)}
                          </div>
                        </div>
                      ) : (
                        <div className="w-9 h-9">
                          <img
                            className="w-full h-full rounded-full"
                            src={user?.profileImage}
                            alt="ProfileImage"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h1 className="hover:underline">{user?.fullName}</h1>
                        <h2 className="hover:underline">{user?.email}</h2>
                      </div>
                    </Link>
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
                            onClick={() =>
                              handleVerifyUserProfile(user?.email, "verified")
                            }
                          >
                            <FcOk className="text-lg" />
                            Verified
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() =>
                              handleVerifyUserProfile(user?.email, "normal")
                            }
                          >
                            <FcHighPriority className="text-lg" />
                            Cencel Verified
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() => handleDeleteUser(user?._id)}
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
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Users;
