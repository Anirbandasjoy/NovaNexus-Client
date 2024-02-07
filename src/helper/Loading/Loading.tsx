import { useLottie } from "lottie-react";
import loadingAnimation from "../../assets/animation/loading.json";
const Loading = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <div className="w-40">{View}</div>
    </div>
  );
};

export default Loading;
