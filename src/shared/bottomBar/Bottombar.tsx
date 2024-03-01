import { IoHome } from "react-icons/io5";
import { GrAdd, GrContact } from "react-icons/gr";
import { NavLink } from "react-router-dom";

import { LuBookmarkPlus } from "react-icons/lu";
import { FaBlog } from "react-icons/fa";

const Bottombar = () => {
  return (
    <div className="sm:hidden">
      <div className="flex justify-around absolute dark:bg-gray-800 bottom-0 bg-white text-red-400 dark:text-red-300  border border-t-gray-200 dark:border-t-gray-700 shadow-2xl w-full py-3 items-center ">
        <div>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <IoHome className="text-2xl" />
            <p className="text-[10px]">Home</p>
          </NavLink>
        </div>

        <div>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <GrContact className="text-2xl" />
            <p className="text-[10px]">Contact</p>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/create-post"
            className="flex flex-col items-center gap-1"
          >
            <GrAdd className="text-2xl" />
            <p className="text-[10px]">Post</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="/bookmarks" className="flex flex-col items-center gap-1">
            <LuBookmarkPlus className="text-[26px]" />
            <p className="text-[10px]">Bookmarks</p>
          </NavLink>
        </div>

        <div>
          <NavLink to="/signIn" className="flex flex-col items-center gap-1">
            <FaBlog className="text-2xl" />
            <p className="text-[10px]">Blog</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
