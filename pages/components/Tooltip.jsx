export default function Tooltip({ children }) {
  return (
    <div className="absolute inset-y-0 left-12 group-hover:flex items-center hidden">
      <div className="relative whitespace-nowrap px-4 py-2 bg-gray-400 rounded-md text-sm font-semibold text-black drop-shadow-lg">
        <div className="absolute inset-y-0 flex items-center -left-1">
          <div className="w-2 h-2 rotate-45 bg-gray-400"></div>
        </div>
        {children}
      </div>
    </div>
  );
}
