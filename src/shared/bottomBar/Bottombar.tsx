import { IoHome } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { LuBookmarkPlus } from "react-icons/lu";
import { FaBlog } from "react-icons/fa";

const Bottombar = () => {
  return (
    <div className="sm:hidden">
      <div className="flex justify-around absolute dark:bg-gray-800 bottom-0 bg-white text-red-400 dark:text-red-300  border border-t-gray-200 dark:border-t-gray-700 shadow-2xl w-full py-4 items-center ">
        <div>
          <Link to="/">
            <IoHome className="text-2xl" />
          </Link>
        </div>

        <div>
          <Link to="/contact">
            <GrContact className="text-2xl" />
          </Link>
        </div>
        <div>
          <Link to="/create-post">
            <AiFillPlusCircle className="text-3xl" />
          </Link>
        </div>
        <div>
          <Link to="/bookmarks">
            <LuBookmarkPlus className="text-[26px]" />
          </Link>
        </div>

        <div>
          <Link to="/signIn">
            <FaBlog className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
