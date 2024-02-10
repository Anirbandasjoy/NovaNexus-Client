import Title from "../../../../../helper/dasboardTitle/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AllNews = () => {
  return (
    <div>
      <Title title="All News" />
      <div className="mt-5">
        <Tabs defaultValue="account" className="w-[400px] rounded-none">
          <TabsList className="rounded-none">
            <TabsTrigger className="rounded-sm" value="account">
              Pending
            </TabsTrigger>
            <TabsTrigger className="rounded-sm" value="password">
              Approve
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllNews;
