import { FC } from "react";
import useFetchNews from "../../../hooks/news/useFetchNews";
import Categories from "./Categories";
import NewsCard from "./NewsCard";
import { NewsPayloadType, NewsType } from "../../../helper/Type";
import NewsCardLoading from "../../../components/Loading/NewsCardLoading";
type MiddleComponentProps = {
  newsData?: NewsPayloadType;
};
const Middle: FC<MiddleComponentProps> = () => {
  const { newsData, isLoading } = useFetchNews();
  // console.log(newsData);

  return (
    <div className="w-full">
      <div className="sm:hidden">
        <Categories />
      </div>
      <div className="w-full sm:h-[calc(100vh-10px)] h-[calc(100vh-40px)] overflow-auto">
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <NewsCardLoading key={index} />
            ))}
          </div>
        )}
        {!isLoading && (
          <div className="space-y-4">
            {newsData?.payload.map((news: NewsType) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Middle;
