const ProfilePostSkeleton = () => {
  return (
    <div className="flex justify-center items-center mt-40">
      <div className="flex flex-col gap-4 w-96 h-96 rounded-xl p-6 shadow-lg">
        <div className="skeleton h-32 w-full rounded-md"></div>
        <div className="skeleton h-4 w-28 rounded-md"></div>
        <div className="skeleton h-4 w-full rounded-md"></div>
        <div className="skeleton h-4 w-full rounded-md"></div>
      </div>
    </div>
  );
};

export default ProfilePostSkeleton;
