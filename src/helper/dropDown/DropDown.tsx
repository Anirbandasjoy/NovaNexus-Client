import React, { ReactNode, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/AuthProvider";
import { AuthContextType } from "../Type";

interface MenuItemComponentProps {
  children: ReactNode;
  path: string;
}

const DropDown = ({ userName }: { userName: string | null | undefined }) => {
  //   const [activeMenuItem, setActiveMenuItem] = useState("");
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        {user ? (
          <div>
            <Menu.Button className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
              {userName && userName?.slice(0, 2)}
            </Menu.Button>
          </div>
        ) : (
          <div>
            <div className="font-bold cursor-pointer capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
              {"D"}
            </div>
          </div>
        )}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="border-gray-300 z-30 border sm:border-none dark:border-gray-600  absolute right-0 mt-3 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <MenuItem path="/profile">
                  <CgProfile
                    className="mr-2 h-5 w-5 dark:text-white"
                    aria-hidden="true"
                  />
                  Profile
                </MenuItem>
              </Menu.Item>
              <Menu.Item>
                <MenuItem path="/dashboard">
                  <MdOutlineDashboardCustomize
                    className="mr-2 h-5 w-5 dark:text-white"
                    aria-hidden="true"
                  />
                  Dashboard
                </MenuItem>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

function MenuItem({ children, path }: MenuItemComponentProps) {
  return (
    <Link
      to={path}
      className="text-gray-700 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
    >
      {children}
    </Link>
  );
}

// Define your other icon components here...

export default DropDown;
