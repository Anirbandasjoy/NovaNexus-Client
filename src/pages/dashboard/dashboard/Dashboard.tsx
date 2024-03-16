import useGetAllUsersProfile from "@/hooks/userProfile/useGetAllUsersProfile";
import useFetchNews from "@/hooks/news/useFetchNews";
import useFetchAllComments from "@/hooks/comments/useFetchAllComments";
import useFetchAllReacts from "@/hooks/react/useFetchAllReacts";
import AllReactsCard from "./info/AllReactsCard";
import AllCommentsCard from "./info/AllCommentsCard";
import TotalNewsCard from "./info/TotalNewsCard";
import TotalUsers from "./info/TotalUsers";
import DashboardNavbar from "../dashboardNavbar/DashboardNavbar";

const Dashboard = () => {
  const { users } = useGetAllUsersProfile("");
  const { newsData } = useFetchNews();
  const { comments } = useFetchAllComments();
  const { reacts } = useFetchAllReacts();

  return (
    <div className="">
      <DashboardNavbar />
      <div className="mt-4 ">
        <div className="flex gap-4 flex-wrap">
          <TotalUsers users={users?.payload?.userProfiles} />
          <TotalNewsCard news={newsData?.payload} />
          <AllCommentsCard comments={comments?.payload} />
          <AllReactsCard reacts={reacts?.payload} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
