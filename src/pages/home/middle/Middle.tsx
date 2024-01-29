import useFetchNews from "../../../hooks/news/useFetchNews";
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
    <div className=" w-full h-[calc(100vh-72px)] overflow-auto">
      <div className="space-y-4  ">
        {newsData?.payload?.map((news: newsTypes) => (
          <NewsCard key={news?._id} />
        ))}
      </div>
    </div>
  );
};

export default Middle;
