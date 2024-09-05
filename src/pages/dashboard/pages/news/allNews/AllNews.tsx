/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "../../../../../helper/dasboardTitle/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingNews from "./PendingNews";
import RejectedNews from "./RejectedNews";
import ApprovedNews from "./ApprovedNews";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { useState } from "react";
import useFetchNews from "@/hooks/news/useFetchNews";

const AllNews = () => {
  const { handleSubmit, register } = useForm();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch news data based on search query
  const { newsData, isLoading, refetch } = useFetchNews(searchQuery);

  const onSubmit = (data: any) => {
    setSearchQuery(data.newsSearchText); // Update search query
    refetch(); // Refetch the data with the updated query
  };

  return (
    <div>
      <div className="flex sm:items-center flex-col gap-4 sm:w-10/12 w-full sm:gap-0 sm:flex-row sm:justify-between flex-wrap">
        <Title title="All News" />
        <form
          className="flex items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="relative">
              <Input
                placeholder="Search News"
                {...register("newsSearchText")}
              />
              <FaSearch className="absolute top-3 right-4 text-gray-400" />
            </div>
          </div>
          <div>
            <Button type="submit" className="text-xs">
              Search
            </Button>
          </div>
        </form>
      </div>
      {/* Display fetched news here (loading state, error handling, etc.) */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-5">
          <Tabs
            defaultValue="account"
            className="sm:w-10/12 w-full rounded-none"
          >
            <TabsList className="rounded-none">
              <TabsTrigger className="rounded-sm" value="account">
                Pending
              </TabsTrigger>
              <TabsTrigger className="rounded-sm" value="rejected">
                Rejected
              </TabsTrigger>
              <TabsTrigger className="rounded-sm" value="password">
                Approved
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <PendingNews news={newsData?.pendingNews} />
            </TabsContent>
            <TabsContent value="rejected">
              <RejectedNews news={newsData?.rejectedNews} />
            </TabsContent>
            <TabsContent value="password">
              <ApprovedNews news={newsData?.approvedNews} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AllNews;
