import { useParams } from "react-router-dom";
import useFetchSignleNew from "../../hooks/news/useFetchSignleNew";
import Marquee from "react-fast-marquee";
import NewsCardLoading from "../../components/Loading/NewsCardLoading";
import { FaRegBookmark } from "react-icons/fa";
import { DateTimeFormatOptions } from "../../helper/Type";
import Comments from "./Comments";
type ParamTypes = {
  id: string;
};
const NewsDetails = () => {
  const { id } = useParams<ParamTypes>();
  const { newsDetails, isLoading } = useFetchSignleNew(id);
  // console.log(newsDetails);
  // console.log(id);
  const { payload } = newsDetails || {};
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";

    const options: DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return <NewsCardLoading />;
  }
  return (
    <div className="mt-3 pb-14">
      <div className="flex items-center mb-2 px-5   justify-between bg-gray-300 py-2 dark:bg-gray-800  dark:border dark:border-gray-700  sm:text-lg dark:text-gray-300 text-center text-gray-700  font-bold ">
        <div className="flex gap-3">
          <div className="w-11">
            <img
              className="w-full h-full rounded-full cursor-pointer"
              src={payload?.author?.image}
              alt="profile"
            />
          </div>
          <div>
            <h1 className="font-semibold text-left text-gray-600 dark:text-gray-300">
              {payload?.author?.name}
            </h1>
            <h2 className="text-xs text-gray-600  text-left dark:text-gray-300">
              {formatDate(payload?.author?.publishDate)}
            </h2>
          </div>
        </div>
        <div>
          <FaRegBookmark className="sm:text-2xl text-xl cursor-pointer text-gray-600 dark:text-gray-300" />
        </div>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <img
              className="w-full h-full"
              src={payload?.thumbnail_url}
              alt="newImage"
            />
          </div>
          <div className="hidden sm:block">
            <Comments payload={payload} formatDate={formatDate} />
          </div>
        </div>
        <div className="sm:w-8/12 w-full ">
          <div className="bg-[#D72050] py-2">
            <Marquee
              className="font-bold text-meduim sm:text-lg  text-gray-100  "
              speed={100}
            >
              Match Highlights: Germany vs Spain — as it happened ! Match
              Highlights: Germany vs Spain as...
            </Marquee>
          </div>
          <div className="mt-2">
            <p className="text-justify dark:text-gray-400">
              {payload?.details}
            </p>
          </div>
          <div className="mt-5 w-full sm:w-10/12 h-[2px] dark:h-[1px] dark:bg-gray-700 bg-gray-300"></div>
          <div className=" sm:hidden">
            <Comments payload={payload} formatDate={formatDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
