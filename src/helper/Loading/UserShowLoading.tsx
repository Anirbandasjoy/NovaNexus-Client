const UserShowLoading = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-1   ">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default UserShowLoading;
