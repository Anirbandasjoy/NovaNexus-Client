import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFetchNews from "@/hooks/news/useFetchNews";
import { NewsType } from "@/helper/Type";
import { Link } from "react-router-dom";

const PendingNews = () => {
  const { newsData } = useFetchNews();
  const allNewsData = newsData?.payload;
  const handleApprovedNews = () => {
    console.log("Approved News");
  };
  const handleRejectNews = () => {
    console.log("Reject News");
  };
  console.log(allNewsData);
  return (
    <div className="sm:h-[calc(100vh-120px)] h-[calc(100vh-170px)] overflow-auto ">
      <h1 className="my-2 text-sm">Pending News</h1>
      <Table className="z-10 ">
        {/* <TableCaption>A list of your Pending News.</TableCaption> */}
        <TableHeader className="bg-white dark:bg-gray-800">
          <TableRow>
            <TableHead className="">Thumbnil</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {allNewsData?.map((news: NewsType) => {
            return (
              <TableRow key={news?._id}>
                <TableCell className="">
                  <img
                    className="w-10 h-8 "
                    src={news?.thumbnail_url}
                    alt={news?.title}
                  />
                </TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>{news?.author?.name}</TableCell>
                <TableCell className="text-blue-600 hover:underline cursor-pointer">
                  <Link to={`/news-details/${news?._id}`}>Lear More</Link>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-blue-400 dark:text-white text-gray-900 text-sm px-3 py-1 rounded-sm font-normal">
                      Status
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={handleApprovedNews}>
                        Approved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleRejectNews}>
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingNews;
