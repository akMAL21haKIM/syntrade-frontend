export const SkeletonLoaderTradePage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="ml-[2rem] mt-8">
        <div className="animate-pulse w-72 left-[30px] z-10 top-[90px] bg-gray-300 border-gray-300 border-4 rounded-md px-4 py-5" />
        <div className="animate-pulse w-[calc(100vw-25rem)] h-[600px] bg-gray-300 border-gray-300 border-4 rounded-md my-4" />
      </div>
      <aside
        className="w-80 h-11/12 pb-8 right-0 absolute bg-gray-50 focus:outline-none cursor-default select-none"
        aria-label="Sidebar"
      >
        <div className="animate-pulse mt-8 mx-6 py-2 px-4 h-14 bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none" />
        <div className="animate-pulse mt-6 mx-6 py-2 px-4 h-16 bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none" />
        <div className="animate-pulse mt-6 mx-6 py-2 px-4 h-[4.5rem] bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none" />
        <div className="animate-pulse mt-6 mx-6 py-2 px-4 h-24 bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none" />
        <div className="animate-pulse mt-6 mx-6 py-2 px-4 h-44 bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none" />
      </aside>
    </div>
  );
}

export const SkeletonLoaderReportsPage = () => {
  return Array(5)
    .fill()
    .map((item, index) => (
      <tr key={index} className="animate-pulse">
        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 space-y-1 text-sm text-gray-500 hidden lg:table-cell md:table-cell">
          <div className="h-5 flex bg-gray-300 rounded"></div>
          <div className="h-5 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap hidden px-3 py-4 text-sm lg:table-cell md:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap hidden px-3 py-4 text-sm lg:table-cell md:table-cell font-semibold text-right">
          <div className="h-8 bg-gray-300 rounded flex-end"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 pr-4 text-sm text-gray-700 text-right">
          <div className="h-8 bg-gray-300 rounded flex-end"></div>
        </td>
      </tr>
    ));
}

export const SkeletonLoaderProfilePage = () => {
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
