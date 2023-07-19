const Skeleton = ({ skeletonCount = 1 }: { skeletonCount?: number }) => {
  const skeletons = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletons.push(
      <div key={i} className="border rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center w-full h-full py-2 px-5">
          <div className="flex flex-col justify-between items-start gap-1.5 w-full">
            <h2 className="text-base font-semibold text-black whitespace-nowrap min-w-[50px] min-h-[20px] lg:min-w-[80px] truncate max-w-[75px] lg:max-w-[80px] lg:min-h-[25px] animate-pulse bg-slate-200"></h2>
            <p className="text-xs font-normal text-black whitespace-nowrap min-w-[75px] min-h-[15px] lg:min-w-[100px] truncate max-w-[75px] lg:max-w-[100px] lg:min-h-[25px] animate-pulse bg-slate-200"></p>
          </div>
          <div className="flex flex-col justify-between items-start  min-w-[80px] min-h-[80px] lg:min-w-[100px] truncate max-w-[75px] lg:max-w-[150px] lg:min-h-[100px] animate-pulse bg-slate-200 rounded-lg"></div>
          <div className="flex flex-col justify-between items-end gap-1.5 w-full">
            <h2 className="text-base font-semibold text-black whitespace-nowrap min-w-[50px] min-h-[20px] lg:min-w-[80px] truncate max-w-[75px] lg:max-w-[80px] lg:min-h-[25px] animate-pulse bg-slate-200"></h2>
            <p className="text-xs font-normal text-black whitespace-nowrap  min-w-[75px] min-h-[15px] lg:min-w-[100px] truncate max-w-[75px] lg:max-w-[100px] lg:min-h-[25px] animate-pulse bg-slate-200"></p>
          </div>
        </div>
      </div>
    );
  }

  return <>{skeletons}</>;
};

export default Skeleton;
