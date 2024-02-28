import CreateNews from "@/pages/dashboard/pages/news/CreateNews";

const CreatePost = () => {
  return (
    <div className="mt-24">
      <div>
        <h1 className="mb-5 text-xl font-bold text-blue-300">
          Create new post
        </h1>
        <div className="lg:w-[28rem] w-full h-[calc(100vh-80px)]  sm:h-[calc(100vh-130px)] overflow-auto">
          <CreateNews />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
