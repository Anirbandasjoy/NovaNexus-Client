import { FaRegBookmark } from "react-icons/fa";
import profile from "../../../assets/images/anirban.jpg";
import news from "../../../assets/images/news1.png";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
const NewsCard = () => {
  return (
    <div className="">
      <div className="bg-white  rounded-md pb-4 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 space-y-3">
          <div className="flex items-center  justify-between">
            <div className="flex gap-3">
              <div className="w-11 ">
                <img
                  className="w-full h-full rounded-full cursor-pointer"
                  src={profile}
                  alt="profile"
                />
              </div>
              <div>
                <h1 className="font-semibold text-gray-600 dark:text-gray-300">
                  Anirban Das
                </h1>
                <h2 className="text-xs text-gray-600 dark:text-gray-300">
                  12/02/2024
                </h2>
              </div>
            </div>
            <div>
              <FaRegBookmark className="text-2xl cursor-pointer text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold  text-gray-600 dark:text-gray-300">
              Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S.
              Military Aid Package Yet
            </h1>
          </div>
        </div>
        <div className="w-full space-y-3 ">
          <img className="w-full h-full bg-cover" src={news} alt="news" />
          <p className="text-sm text-gray-600 dark:text-gray-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quis
            optio neque quisquam dolore natus voluptatibus accusantium
            cupiditate similique nihil dolorem explicabo fugit doloremque sit
            error magni ipsa ab, ipsum aut aspernatur nam. Facere, dicta
          </p>
        </div>
        <div className="mt-8 px-4 w-full h-[1px] bg-gray-200 dark:bg-gray-700"></div>
        <div className="px-4 mt-2 flex items-center ">
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiLike className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Like
            </p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiComment className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Comment
            </p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer w-full hover:bg-gray-100 dark:hover:bg-gray-700 py-1 justify-center rounded-sm duration-200">
            <BiShare className="text-[21px] text-gray-500 dark:text-gray-300" />
            <p className="text-[17px] font-bold text-gray-500 dark:text-gray-300">
              Share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
