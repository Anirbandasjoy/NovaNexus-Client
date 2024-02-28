import CreateNews from "@/pages/dashboard/pages/news/CreateNews";
import postAnimation from "../../../assets/animation/post.json";
import { useLottie } from "lottie-react";
const CreatePost = () => {
  const options = {
    animationData: postAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="mt-24">
      <div className="lg:flex lg:items-center ">
        <div>
          <h1 className="mb-5 text-xl font-bold text-blue-300">
            Create new post
          </h1>
          <div className="lg:w-[28rem] w-full h-[calc(100vh-200px)]  sm:h-[calc(100vh-130px)] overflow-auto">
            <CreateNews />
          </div>
        </div>
        <div className=" flex-1 text-center hidden lg:block">
          <div className="w-96 mx-auto">{View}</div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
