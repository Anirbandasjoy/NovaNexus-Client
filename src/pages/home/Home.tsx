import { useState } from "react";
import LeftSide from "./leftSide/LeftSide";
import Middle from "./middle/Middle";
import RightSide from "./rightSide/RightSide";
// import Bottombar from "@/shared/bottomBar/Bottombar";

const Home = () => {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const getCategoryId = (id: string | undefined) => {
    setCategoryId(id);
  };
  return (
    <div className="sm:mt-2 relative">
      <div className="flex gap-8">
        <LeftSide getCategoryId={getCategoryId} />
        <Middle categoryId={categoryId} />
        <div className="hidden sm:block w-5/12 ">
          <RightSide />
        </div>
      </div>
      {/* <Bottombar /> */}
    </div>
  );
};

export default Home;
