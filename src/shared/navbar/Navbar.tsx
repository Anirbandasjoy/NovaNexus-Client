import { Link } from "react-router-dom";
import ToggoleBtn from "../../components/toggleBtn/ToggleBtn";
import { useState } from "react";
import DropDown from "../../components/dropDown/DropDown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 ">
      <div>
        <nav className="">
          <div className=" flex flex-wrap items-center justify-between mx-auto ">
            <ToggoleBtn />
            <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
              <div className="flex items-center justify-center gap-4 ">
                <DropDown />
                {/* <div className="font-bold uppercase bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                  JD
                </div> */}
                <Link
                  to=""
                  type="button"
                  className="text-white bg-[#d72050] focus:outline-none text-sm  font-semibold rounded-sm sm:text-sm px-4  py-2  text-center"
                >
                  Login
                </Link>
              </div>

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                  onClick={() => setOpen(!open)}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center sm:ml-[82px] ml-0 z-10 mt-4 sm:mt-0 justify-between duration-700 w-full md:flex md:w-auto ${
                open
                  ? "translate-x-0 "
                  : "-translate-x-[110%] sm:-translate-x-0"
              }`}
              id="navbar-sticky"
            >
              <ul className="flex absolute sm:static w-full  sm:dark:bg-gray-900 flex-col p-4 md:p-0 font-medium  rounded-sm  border-gray-300 border sm:border-none dark:text-white dark:bg-gray-800   dark:border-gray-600 bg-gray-300 sm:bg-gray-200  md:space-x-8  md:flex-row md:mt-0  ">
                <li>
                  <Link
                    to="/"
                    className="block  duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/carrer"
                    className="block duration-300 font-bold py-2 px-3 text-gray-700 rounded h md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Carrer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="block duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent hover:text-[#d72050] md:p-0  dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
