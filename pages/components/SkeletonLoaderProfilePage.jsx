export default function SkeletonLoaderProfilePage() {
  return (
    <div className="flex justify-center items-center w-full mt-12">
      <div className="text-center">
        <div className="animate-pulse inline-block whitespace-nowrap h-24 w-24 rounded-full bg-gray-300"></div>
        <div className="animate-pulse align-center rounded whitespace-nowrap pt-4 mt-5 mx-auto h-4 w-[9.5rem] bg-gray-300"></div>
        <div className="space-y-3 pt-8 w-full mt-1">
          <div className="animate-pulse whitespace-nowrap rounded bg-gray-300 text-left h-4 w-24"></div>
          <div className="mt-1">
            <div className="animate-pulse w-[22rem] h-10 whitespace-nowrap rounded border-2 bg-gray-300 border-gray-300 px-3 py-2 shadow-sm" />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md">
            <div className="animate-pulse inline-flex h-12 w-[10.5rem] items-center justify-center rounded-md border border-transparent bg-gray-300 px-7 py-3"></div>
          </div>
          <div className="ml-3 inline-flex">
            <div className="animate-pulse inline-flex h-12 w-[10.5rem] items-center justify-center rounded-md border border-transparent bg-gray-300 px-7 py-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
