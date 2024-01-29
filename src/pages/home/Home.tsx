import LeftSide from "./leftSide/LeftSide";
import Middle from "./middle/Middle";
import RightSide from "./rightSide/RightSide";

const Home = () => {
  return (
    <div className="mt-5">
      <div className="flex gap-8">
        <LeftSide />
        <Middle />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
