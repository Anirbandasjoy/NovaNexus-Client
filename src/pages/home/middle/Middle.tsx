import useFetchNews from "../../../hooks/news/useFetchNews";
import NewsCard from "./NewsCard";

const Middle = () => {
  const { newsData } = useFetchNews();
  console.log(newsData);
  return (
    <div className=" w-full ">
      <div className="space-y-4">
        {newsData?.payload?.map((news) => (
          <NewsCard key={news?._id} />
        ))}
      </div>
    </div>
  );
};

export default Middle;
