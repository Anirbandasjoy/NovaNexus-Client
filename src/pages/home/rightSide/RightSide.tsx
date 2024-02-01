import { FaBookmark } from "react-icons/fa";

const RightSide = () => {
  return (
    <div className=" dark:text-gray-300 hidden sm:block w-5/12">
      <div className="bg-gray-300 py-2 cursor-pointer flex justify-center gap-2 items-center dark:bg-gray-800  dark:border dark:border-gray-700 px-2  dark:text-gray-300 text-center text-gray-700  ">
        <FaBookmark className="sm:text-xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
        <h1 className="tex-lg sm:text-lg  font-bold ">All Bookmarks</h1>
      </div>
    </div>
  );
};

export default RightSide;
