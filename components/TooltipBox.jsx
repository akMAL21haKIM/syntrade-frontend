const TooltipBox = ({ msg, children, stakePayoutError }) => {
  return (
    <div className="relative flex justify-left items-center bottom-[1rem] align-left group w-full">
      <div
        className={`absolute w-[13rem] z-99 ${
          stakePayoutError ? "flex" : "hidden"
        }`}
        style={{ left: "-12rem", bottom: "2rem" }}
      >
        <span className="flex z-10 p-2 text-xs text-white tracking-wide leading-5 bg-red-500 shadow-lg">
          {msg}
        </span>
        <div className="absolute z-99 bottom-[1rem] w-3 h-3 ml-[12.5rem] rotate-45 bg-red-500"></div>
      </div>
      {children}
    </div>
  );
};

export default TooltipBox;
