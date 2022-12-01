export default function Tooltip({ msg, children, stakePayoutError }) {
  return (
    <div className="relative flex justify-left items-center align-left group w-full">
      <div
        class={`absolute w-[13rem] z-99 ${
          stakePayoutError ? "flex" : "hidden"
        }`}
        style={{ left: "-14rem" }}
        className={`absolute w-[6rem] z-99 ${
          stakePayoutError ? "flex" : "hidden"
        }`}
        style={{ left: "-7rem" }}
      >
        <span className="flex z-10 p-2 text-xs leading-none text-white bg-red-600 shadow-lg">
          {msg}
        </span>
        <div class="absolute bottom-[1rem] w-3 h-3 ml-[12.5rem] rotate-45 bg-red-600 hover:-top-2"></div>
        <div className="absolute bottom-[1rem] w-3 h-3 ml-[5.5rem] rotate-45 bg-red-600 hover:-top-2"></div>
      </div>
      {children}
    </div>
  );
}
