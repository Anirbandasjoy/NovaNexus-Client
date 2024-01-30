import useFetchNews from "../../../hooks/news/useFetchNews";
import Categories from "./Categories";
import NewsCard from "./NewsCard";
type newsTypes = {
  _id: string;
  title: string;
  details: string;
  name: string;
  image: string;
  publishDate: string;
  thumbnail_url: string;
  like: number;
};
const Middle = () => {
  const { newsData } = useFetchNews();
  console.log(newsData);
  return (
    <div className="w-full">
      <div className="sm:hidden">
        <Categories />
      </div>
      <div className=" w-full sm:h-[calc(100vh-72px)] h-[calc(100vh-50px)] overflow-auto">
        <div className="space-y-4  ">
          {newsData?.payload?.map((news: newsTypes) => (
            <NewsCard key={news?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Middle;
