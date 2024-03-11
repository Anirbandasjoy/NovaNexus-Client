import { NavLink } from "react-router-dom";

type MenuProps = {
  menuName: string;
  path: string;
  Icon: React.ElementType;
};

const Menu = ({ menuName, path, Icon }: MenuProps) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-gray-800 py-2 pl-3 cursor-pointer
        ${
          isActive
            ? "bg-gray-300 dark:bg-gray-800"
            : "text-gray-600  dark:text-gray-300 "
        }`}
    >
      <Icon className="text-gray-700 dark:text-gray-400 text-[18px]" />
      <h1 className="text-[14px] font-bold text-gray-700 dark:text-gray-400">
        {menuName}
      </h1>
    </NavLink>
  );
};

export default Menu;
