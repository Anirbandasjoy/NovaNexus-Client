import { RiNotification2Line } from "react-icons/ri";
import Title from "../../../helper/dasboardTitle/Title";
import DropDown from "@/helper/dropDown/DropDown";
import { AuthContext } from "@/contex/AuthProvider";
import { useContext } from "react";
import { AuthContextType } from "@/helper/Type";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  return (
    <div className="flex justify-between w-[98%]">
      <Title title="Dashboard" />
      <div className="flex gap-4 items-center ">
        <div className="relative">
          <RiNotification2Line className="text-xl cursor-pointer" />
          <div className="w-3 h-3 bottom-3 cursor-pointer bg-red-500 absolute flex justify-center items-center rounded-full">
            <span className="text-[8px] text-white">1</span>
          </div>
        </div>
        <DropDown userName={user?.displayName} />
      </div>
    </div>
  );
};

export default DashboardNavbar;
