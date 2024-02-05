import useFetchNews from "../../../hooks/news/useFetchNews";
import Categories from "./Categories";
import NewsCard from "./NewsCard";
import { NewsType } from "../../../helper/Type";
import NewsCardLoading from "../../../components/Loading/NewsCardLoading";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
const Middle = ({ categoryId }: { categoryId: string | undefined }) => {
  const { newsData, isLoading } = useFetchNews();
  const allNewsData = newsData?.payload;
  const [filteredNews, setFilteredNews] = useState<NewsType[]>(allNewsData);

  useEffect(() => {
    if (allNewsData) {
      const filtered = categoryId
        ? allNewsData?.filter((news: NewsType) => news.category === categoryId)
        : allNewsData;
      setFilteredNews(filtered || []);
    }
    console.log(categoryId);
  }, [allNewsData, categoryId]);

  if (isLoading) {
    return (
      <div className="w-full sm:h-[calc(100vh-10px)] h-[calc(100vh-40px)] overflow-auto">
        <div className="space-y-4 ">
          {Array.from({ length: 3 }).map((_, index) => (
            <NewsCardLoading key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!filteredNews || filteredNews.length === 0) {
    console.log("Displaying error message");
    return (
      <div className="flex w-full flex-col items-center justify-center h-[calc(100vh-250px)]">
        <FaExclamationCircle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-2xl font-semibold my-4 dark:text-gray-300">
          404 - Not Found
        </h1>
        <p className="text-gray-600">Not found news with this category.</p>
      </div>
    );
  }

  // console.log(filteredNews);
  // console.log(categoryId);

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
        {!isLoading && filteredNews && (
          <div className="space-y-4">
            {filteredNews.map((news: NewsType) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Middle;
