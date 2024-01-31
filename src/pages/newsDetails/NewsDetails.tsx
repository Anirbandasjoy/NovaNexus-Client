import { useParams } from "react-router-dom";
import useFetchSignleNew from "../../hooks/news/useFetchSignleNew";
import Marquee from "react-fast-marquee";
import NewsCardLoading from "../../components/Loading/NewsCardLoading";
type ParamTypes = {
  id: string;
};
const NewsDetails = () => {
  const { id } = useParams<ParamTypes>();
  const { newsDetails, isLoading } = useFetchSignleNew(id);
  console.log(newsDetails);
  console.log(id);
  const { payload } = newsDetails || {};
  if (isLoading) {
    return <NewsCardLoading />;
  }
  return (
    <div className="mt-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="w-full h-full">
          <img
            className="w-full h-full"
            src={payload?.thumbnail_url}
            alt="newImage"
          />
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
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
