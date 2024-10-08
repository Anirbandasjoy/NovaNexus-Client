import { Link, NavLink, useNavigate } from "react-router-dom";
import ToggoleBtn from "../../helper/toggleBtn/ToggleBtn";
import { useContext } from "react";
import DropDown from "../../helper/dropDown/DropDown";
import { AuthContext } from "../../contex/AuthProvider";
import toast from "react-hot-toast";
import { AuthContextType } from "../../helper/Type";
import { BiHomeAlt, BiSolidContact } from "react-icons/bi";
import { RiAccountBoxLine } from "react-icons/ri";
import { GoPlusCircle } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(
    AuthContext as React.Context<AuthContextType>
  );
  const location = localStorage.getItem("location");
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logout Successfully");
      navigate("/login");
      if (location) {
        localStorage.removeItem("location");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="py-4 bg-white dark:bg-gray-800 ">
      <div>
        <nav className="w-full  lg:max-w-4xl mx-auto xl:max-w-6xl 2xl:max-w-7xl px-4 lg:px-0">
          <div className=" flex flex-wrap items-center justify-between mx-auto ">
            <ToggoleBtn />
            <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
              <div className="flex items-center justify-center gap-4 ">
                <DropDown userName={user?.displayName} />
                {/* <div className="font-bold uppercase bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                  JD
                </div> */}
                {user ? (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button className="text-white bg-[#d72050] focus:outline-none text-xs  font-semibold rounded-sm sm:text-sm px-4  py-2  text-center">
                        Logout
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter className=" text-left">
                        <AlertDialogCancel className="text-center w-full">
                          No
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="w-full"
                          onClick={handleLogOut}
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Link
                    to="/login"
                    type="button"
                    className="text-white bg-[#d72050] focus:outline-none text-xs  font-semibold rounded-sm sm:text-sm px-4  py-2  text-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div
              className={`items-center sm:ml-[78px] hidden sm:block ml-0 z-10 mt-4 sm:mt-0 justify-between duration-700 w-full md:flex md:w-auto `}
              id="navbar-sticky"
            >
              <ul className="flex absolute sm:static w-full  sm:dark:bg-gray-800 flex-col p-4 md:p-0 font-medium  rounded-sm  border-gray-300 border sm:border-none dark:text-white dark:bg-gray-800   dark:border-gray-600 bg-gray-300 sm:bg-white  md:space-x-20  md:flex-row md:mt-0 ">
                <li>
                  <NavLink
                    to="/"
                    className="  duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:hover:text-[#e66f8f]   dark:text-gray-300 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 flex flex-col items-center justify-center"
                  >
                    <BiHomeAlt className="text-2xl" />
                    <p className="text-[10px]">Home</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className=" duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:hover:text-[#e66f8f]  dark:text-gray-300 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700  flex flex-col items-center"
                  >
                    <RiAccountBoxLine className="text-2xl" />
                    <p className="text-[10px]">About</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className=" duration-300 font-bold py-2 px-3 text-gray-700 rounded h md:hover:bg-transparent  md:p-0 hover:text-[#d72050] dark:text-gray-300 dark:hover:bg-gray-700  dark:hover:text-[#e66f8f] md:dark:hover:bg-transparent dark:border-gray-700 flex flex-col items-center justify-center"
                  >
                    <BiSolidContact className="text-2xl" />
                    <p className="text-[10px]">Contact</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create-post"
                    className=" duration-300 font-bold py-2 px-3 text-gray-700 rounded  md:hover:bg-transparent hover:text-[#d72050] md:p-0  dark:text-gray-300 dark:hover:bg-gray-700  dark:hover:text-[#e66f8f] md:dark:hover:bg-transparent dark:border-gray-700 flex flex-col items-center justify-center"
                  >
                    <GoPlusCircle className="text-2xl" />
                    <p className="text-[10px]">Post</p>
                  </NavLink>
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
