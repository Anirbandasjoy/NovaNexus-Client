import {
  MdOutlineDashboardCustomize,
  MdOutlineSwapCalls,
} from "react-icons/md";
import Menu from "./Menu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiCandles } from "react-icons/bi";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useContext } from "react";
import { AuthContext } from "../../contex/AuthProvider";
import { AuthContextType } from "../../helper/Type";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SideMenu = () => {
  const { logOut } = useContext(AuthContext as React.Context<AuthContextType>);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logout Successfully");
      navigate("/login");
      if (location) {
        localStorage.removeItem("location");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="z-50">
      <div className="border-gray-300  z-50 bg-gray-200 dark:bg-gray-900  border-r dark:border-gray-700 ">
        <Link to="/">
          <h1 className="text-lg font-bold text-center bg-blue-400 dark:text-gray-600 py-2 text-gray-500">
            NovaNexus
          </h1>
        </Link>

        <div className=" mt-10 pl-1 flex flex-col justify-between h-[calc(100vh-95px)]  sm:h-[calc(100vh-100px)]">
          <div className="flex flex-col gap-4">
            <Menu
              menuName="Dashboard"
              path="/dashboard"
              Icon={MdOutlineDashboardCustomize}
            />

            <Menu
              menuName="News"
              path="/dashboard/all-news"
              Icon={MdOutlineSwapCalls}
            />
            <Menu
              menuName="Categories"
              path="/dashboard/categories"
              Icon={BiCandles}
            />

            <Menu
              menuName="Users"
              path="/dashboard/all-users"
              Icon={AiOutlineUsergroupAdd}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Menu
              menuName="Settings"
              path="/dashboard/settings"
              Icon={IoSettingsOutline}
            />
            {/* <Menu menuName="Logout" path="" Icon={IoLogOutOutline} /> */}

            <AlertDialog>
              <AlertDialogTrigger>
                <div className="flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-800 py-2 pl-3  cursor-pointer">
                  <IoLogOutOutline className="text-gray-700 dark:text-gray-400 text-[18px]" />
                  <h1 className="text-[14px] font-bold text-gray-700 dark:text-gray-400">
                    Logout
                  </h1>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className=" text-left">
                  <AlertDialogCancel className="text-center w-full">
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction className="w-full" onClick={handleLogOut}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
