import { useState } from "react";
import LeftSide from "./leftSide/LeftSide";
import Middle from "./middle/Middle";
import RightSide from "./rightSide/RightSide";

const Home = () => {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const getCategoryId = (id: string | undefined) => {
    setCategoryId(id);
  };
  return (
    <div className="sm:mt-4 ">
      <div className="flex gap-8">
        <LeftSide getCategoryId={getCategoryId} />
        <Middle categoryId={categoryId} />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
