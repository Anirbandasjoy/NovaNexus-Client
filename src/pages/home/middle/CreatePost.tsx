import CreateNews from "@/pages/dashboard/pages/news/CreateNews";

const CreatePost = () => {
  return (
    <div className="flex h-[80vh] items-center justify-center ">
      <div>
        <h1 className="mb-5 text-xl font-bold text-blue-300">
          Create new post
        </h1>
        <div className="lg:w-[28rem] w-full">
          <CreateNews />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
