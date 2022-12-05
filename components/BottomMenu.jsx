import { React, useState } from "react";
import { SolidDollarIcon } from "../lib/icons";
import TradeTypeDropdown from "../components/TradeTypeDropdown";

const BottomMenu = ({ syntheticModel, setOpenTradeSuccessModal, notify }) => {
  return (
    <div className="bg-gray-50 pb-8 hidden 2xl:hidden xl:hidden lg:hidden md:hidden sm:block absolute inset-x-0 bottom-0">
      <div className="mt-8 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100">
        <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
          <SolidDollarIcon
            className="w-6 h-6 fill-indigo-600"
            fill="currentColor"
          />

          <span className="ml-3 my-auto">10,000.00 MYR</span>
        </p>
      </div>
      <div className="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200 focus:outline-none">
        <TradeTypeDropdown
          tradeType={tradeType}
          setTradeType={setTradeType}
          syntheticModel={syntheticModel}
        />
      </div>
    </div>
  );
};

export default BottomMenu;
