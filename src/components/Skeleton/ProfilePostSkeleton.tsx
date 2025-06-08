const ProfilePostSkeleton = () => {
  return (
    <div className="flex justify-center items-center mt-40 bg-white">
      <div className="flex flex-col gap-4 w-96 h-96 rounded-xl p-6 shadow-lg bg-gray-50">
        <div className="skeleton h-32 w-full bg-gray-200 rounded-md"></div>
        <div className="skeleton h-4 w-28 bg-gray-200 rounded-md"></div>
        <div className="skeleton h-4 w-full bg-gray-200 rounded-md"></div>
        <div className="skeleton h-4 w-full bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProfilePostSkeleton;
