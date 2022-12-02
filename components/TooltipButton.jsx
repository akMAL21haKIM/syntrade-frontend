export default function TooltipButton({ msg, children, stakePayoutError }) {
  return (
    <div className="relative flex justify-left items-center align-left group w-full">
      <div
        className={`absolute w-[13rem] z-99 ${
          stakePayoutError ? "flex" : "hidden"
        }`}
        style={{ left: "-14.5rem" }}
      >
        <span className="flex z-10 p-2 text-xs text-white tracking-wide leading-5 bg-red-500 shadow-lg">
          {msg}
        </span>
        <div className="absolute bottom-[1rem] w-3 h-3 ml-[12.5rem] rotate-45 bg-red-500"></div>
      </div>
      {children}
    </div>
  );
}
