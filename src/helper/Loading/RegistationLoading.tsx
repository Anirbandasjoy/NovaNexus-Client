import { ThreeDots } from "react-loader-spinner";

const RegistationLoading = () => {
  return (
    <div className="">
      <ThreeDots
        visible={true}
        height="25"
        width="80"
        color="#d1d8e0"
        radius="5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default RegistationLoading;
