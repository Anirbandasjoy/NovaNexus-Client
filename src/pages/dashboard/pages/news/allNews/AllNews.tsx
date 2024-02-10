import Title from "../../../../../helper/dasboardTitle/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingNews from "./PendingNews";
import RejectedNews from "./RejectedNews";
import ApprovedNews from "./ApprovedNews";

const AllNews = () => {
  return (
    <div>
      <Title title="All News" />
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
