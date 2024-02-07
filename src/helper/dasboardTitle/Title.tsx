const Title = ({ title }: { title: string }) => {
  return (
    <div>
      <div>
        <h1 className="sm:text-[28px] text-2xl dark:text-gray-400 font-semibold text-gray-600">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Title;
