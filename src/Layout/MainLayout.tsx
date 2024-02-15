import { Outlet, useNavigation } from "react-router-dom";
import Header from "../shared/header/Header";
import Navbar from "../shared/navbar/Navbar";
import Latest from "../shared/Latest/Latest";
import Loading from "@/helper/Loading/Loading";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="">
      <Navbar />
      <div className="w-full   lg:max-w-4xl mx-auto xl:max-w-6xl 2xl:max-w-7xl px-4 lg:px-0">
        <Header />
        <Latest />

        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};

export default MainLayout;
