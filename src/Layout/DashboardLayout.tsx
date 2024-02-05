import { Outlet } from "react-router-dom";
import SideMenu from "../pages/dashboard/SideMenu";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="sm:w-2/12 w-7/12 ">
          <SideMenu />
        </div>
        <div className="w-full pl-5 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
