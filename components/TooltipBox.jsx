export default function TooltipBox({ msg, children, stakePayoutError }) {
  return (
    <div className="relative flex justify-left items-center bottom-[1rem] align-left group w-full">
      <div
        className={`absolute w-[13rem] z-99 ${
          stakePayoutError ? "flex" : "hidden"
        }`}
        style={{ left: "-12rem", bottom: "2rem" }}
      >
        <span className="flex z-10 p-2 text-xs leading-none text-white bg-red-600 shadow-lg">
          {msg}
        </span>
        <div className="absolute z-99 bottom-[1rem] w-3 h-3 ml-[12.5rem] rotate-45 bg-red-600"></div>
      </div>
      {children}
    </div>
  );
}
