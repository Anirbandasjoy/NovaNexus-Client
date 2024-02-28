import { RiLoginBoxLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { BiSolidContact } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { LuBookmarkPlus } from "react-icons/lu";

const Bottombar = () => {
  return (
    <div className="sm:hidden">
      <div className="flex justify-around absolute dark:bg-gray-800 bottom-0 bg-gray-300 text-gray-500 w-full py-4 items-center ">
        <div>
          <Link to="/">
            <IoHome className="text-2xl" />
          </Link>
        </div>

        <div>
          <Link to="/signIn">
            <RiLoginBoxLine className="text-2xl" />
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
          <Link to="/contact">
            <BiSolidContact className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
