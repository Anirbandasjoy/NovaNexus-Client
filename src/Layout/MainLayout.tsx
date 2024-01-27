import { Outlet } from "react-router-dom";
import Header from "../shared/header/Header";

const MainLayout = () => {
  return (
    <div className="w-full lg:max-w-4xl mx-auto xl:max-w-6xl 2xl:max-w-7xl px-4 lg:px-0">
      <Header />
      {<Outlet />}
    </div>
  );
};

export default MainLayout;
