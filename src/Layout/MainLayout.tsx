import { Outlet, useNavigation } from "react-router-dom";
import Header from "../shared/header/Header";
import Navbar from "../shared/navbar/Navbar";
import Latest from "../shared/Latest/Latest";
import Loading from "@/helper/Loading/Loading";
import Bottombar from "@/shared/bottomBar/Bottombar";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="relative">
      <div className="fixed w-full top-0 z-50">
        <Navbar />
      </div>
      <div className="w-full mt-20 lg:max-w-4xl mx-auto xl:max-w-6xl 2xl:max-w-7xl px-4 lg:px-0">
        <Header />
        <Latest />

        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <div className="z-40 w-full bottom-0 right-0 left-0 fixed">
        <Bottombar />
      </div>
    </div>
  );
};

export default MainLayout;
