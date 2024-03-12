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

const AllNews = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex sm:items-center flex-col gap-4 sm:w-10/12 w-full sm:gap-0 sm:flex-row sm:justify-between flex-wrap">
        <Title title="All News" />
        <form
          className="flex items-center   gap-2"
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
            <Button className="text-xs">Search</Button>
          </div>
        </form>
      </div>
      <div className="mt-5">
        <Tabs defaultValue="account" className="sm:w-10/12 w-full rounded-none">
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
            <PendingNews />
          </TabsContent>
          <TabsContent value="rejected">
            <RejectedNews />
          </TabsContent>
          <TabsContent value="password">
            <ApprovedNews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllNews;
