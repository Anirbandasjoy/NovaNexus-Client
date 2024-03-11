import { ProfileType } from "@/helper/Type";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const TotalUsers = ({ users }: { users: ProfileType[] }) => {
  return (
    <div className="bg-blue-400 w-60 px-5 py-2 rounded-sm">
      <div className="flex">
        <Link
          to="all-users"
          className="flex cursor-pointer flex-col flex-1 items-center justify-center"
        >
          <FaUsers className="text-7xl text-gray-200" />
          <h1 className="text-gray-100">Total Users</h1>
        </Link>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-4xl text-gray-100 font-bold">
            {users?.length < 10 ? (
              <span>0{users?.length}</span>
            ) : (
              <span> {users?.length}</span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;
