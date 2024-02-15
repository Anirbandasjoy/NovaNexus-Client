import { RiLoginBoxLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";

import { BiSolidContact } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

const Bottombar = () => {
  return (
    <div className="sm:hidden">
      <div className="flex justify-around absolute dark:bg-gray-900 bottom-0 bg-gray-200 text-gray-500 w-full py-4 ">
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
          <Link to="/dashboard/post-news">
            <AiFillPlusCircle className="text-3xl" />
          </Link>
        </div>
        <div>
          <Link to="/blog">
            <FaBlog className="text-2xl" />
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
