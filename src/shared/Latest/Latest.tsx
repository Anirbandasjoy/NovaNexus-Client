import Marquee from "react-fast-marquee";

const Latest = () => {
  return (
    <div className="mt-3">
      <div className=" w-full flex items-center justify-center  mx-auto bg-gray-200">
        <button className="btn capitalize bg-[#D72050]  text-xs px-5 py-2 sm:text-lg text-white btn-error rounded-none">
          Latest
        </button>
        <Marquee
          className="font-bold sm:text-sm text-xs text-gray-400"
          speed={100}
        >
          Match Highlights: Germany vs Spain — as it happened ! Match
          Highlights: Germany vs Spain as...
        </Marquee>
      </div>
    </div>
  );
};

export default Latest;
