import {
  Table,
  TableBody,
  TableCaption,
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

const RejectedNews = () => {
  const handleApprovedNews = () => {
    console.log("Approved News");
  };
  const handleRejectNews = () => {
    console.log("Reject News");
  };
  return (
    <div>
      <h1 className="my-2 text-sm">Rejected News</h1>
      <Table>
        <TableCaption>A list of your Rejected News.</TableCaption>
        <TableHeader className="bg-white dark:bg-gray-800">
          <TableRow>
            <TableHead className=" ">Thumbnil</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Anirban Das joy</TableCell>
            <TableCell className="text-blue-600 hover:underline cursor-pointer">
              Lear More
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-blue-400 dark:text-white text-gray-900 text-sm px-3 py-1 rounded-sm font-normal">
                  Change Status
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
        </TableBody>
      </Table>
    </div>
  );
};

export default RejectedNews;
