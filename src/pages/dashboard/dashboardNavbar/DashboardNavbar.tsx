import { RiNotification2Line } from "react-icons/ri";
import Title from "../../../helper/dasboardTitle/Title";
import DropDown from "@/helper/dropDown/DropDown";
import { AuthContext } from "@/contex/AuthProvider";
import { useContext } from "react";
import { AuthContextType } from "@/helper/Type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  return (
    <div className="flex justify-between w-[98%]">
      <Title title="Dashboard" />
      <div className="flex gap-4 items-center ">
        <Popover>
          <PopoverTrigger>
            <div className="relative">
              <RiNotification2Line className="text-xl cursor-pointer" />
              <div className="w-3 h-3 bottom-3 cursor-pointer bg-red-500 absolute flex justify-center items-center rounded-full">
                <span className="text-[8px] text-white">1</span>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="h-60 ">Notifications</PopoverContent>
        </Popover>

        <DropDown userName={user?.displayName} />
      </div>
    </div>
  );
};

export default DashboardNavbar;
