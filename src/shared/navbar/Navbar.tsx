import { Link } from "react-router-dom";
import ToggoleBtn from "../../components/toggleBtn/ToggleBtn";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8">
      <div>
        <nav className="  ">
          <div className=" flex flex-wrap items-center justify-between mx-auto ">
            <ToggoleBtn />
            <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
              <Link
                to=""
                type="button"
                className="text-white bg-[#d72050]   focus:outline-none  font-semibold rounded-sm text-sm px-4 py-2 text-center"
              >
                Login
              </Link>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center  mt-5 sm:mt-0 justify-between duration-700 w-full md:flex md:w-auto ${
                open
                  ? "translate-x-0 "
                  : "-translate-x-[110%] sm:-translate-x-0"
              }`}
              id="navbar-sticky"
            >
              <ul className="flex absolute flex-col p-4 md:p-0 font-medium border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   ">
                <li>
                  <Link
                    to="/"
                    className="block  font-bold py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block font-bold py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block font-bold py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Carrer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block font-bold py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Blog
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
