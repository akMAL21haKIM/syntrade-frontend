export default function SkeletonLoaderTradePage() {
  return (
    <div className="grid grid-cols-2">
      <div className="mx-8 px-8 mt-8">
        <div className="animate-pulse w-72 bg-gray-300 border-gray-300 border-4 rounded-md px-4 py-5" />
        <div className="animate-pulse w-[1250px] h-[600px] bg-gray-300 border-gray-300 border-4 rounded-md my-4" />
      </div>
      <aside
        class="w-72 h-11/12 pb-8 right-0 absolute bg-gray-50"
        aria-label="Sidebar"
      >
        <div class="animate-pulse mt-8 mx-6 py-2 px-4 h-14 bg-gray-300 rounded border-4 border-gray-300" />
        <div class="animate-pulse mt-6 mx-6 py-2 px-4 h-16 bg-gray-300 rounded border-4 border-gray-300" />
        <div class="animate-pulse mt-6 mx-6 py-2 px-4 h-[4.5rem] bg-gray-300 rounded border-4 border-gray-300" />
        <div class="animate-pulse mt-6 mx-6 py-2 px-4 h-24 bg-gray-300 rounded border-4 border-gray-300" />
        <div class="animate-pulse mt-6 mx-6 py-2 px-4 h-44 bg-gray-300 rounded border-4 border-gray-300" />
      </aside>
    </div>
  );
}
