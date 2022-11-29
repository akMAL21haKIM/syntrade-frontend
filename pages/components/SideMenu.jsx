import { React, Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import RangeSlider from "./RangeSlider";
import {
  SolidDollarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "../../lib/icons";
import { classNames } from "../../lib/utilities";

const Tooltip = ({ msg = "", children }) => {
  return (
    <div class="relative flex justify-left items-center align-left group w-full">
      <div
        class="absolute w-[6rem] z-99 hidden group-hover:flex"
        style={{ left: "-7rem" }}
      >
        <span class="flex z-10 p-2 text-xs leading-none text-white bg-red-600 shadow-lg">
          {msg}
        </span>
        <div class="absolute bottom-[1rem] w-3 h-3 ml-[5.5rem] rotate-45 bg-red-600 hover:-top-2"></div>
      </div>
      {children}
    </div>
  );
};

export default function SideMenu({ syntheticModel }) {
  const [loader, setLoader] = useState(false);
  const [selectedTradeType, setSelectedTradeType] = useState(
    syntheticModel.trade_type[0]
  );
  const [isClickedTradeTypeBox, setIsClickedTradeTypeBox] = useState(false);
  const [stakePayout, setStakePayout] = useState(10);
  const [selectedStakePayout, setSelectedStakePayout] = useState(true);
  const [disableIncrement, setDisableIncrement] = useState(false);
  const [disableDecrement, setDisableDecrement] = useState(false);
  const [blueIconTransition, setBlueIconTransition] = useState(false);
  const [redIconTransition, setRedIconTransition] = useState(false);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      setLoader(false);
    }, 1000);
  }, [selectedTradeType, stakePayout, selectedStakePayout]);

  const increment = (e) => {
    e.preventDefault();

    setDisableDecrement(false);

    if (parseFloat(stakePayout) > 30000) {
      // Disable increment button
      setDisableIncrement(true);
      // TODO: Show tooltip error message
    }

    setStakePayout(stakePayout + 1);
  };

  const decrement = (e) => {
    e.preventDefault();

    setDisableIncrement(false);
    // tooltip.hide();

    // If stakePayout is less than 0, set it to 0
    if (stakePayout <= 0) {
      setStakePayout(0);

      // Disable decrement button
      setDisableDecrement(true);

      // TODO: Show tooltip error message
      // tooltip.show();
    } else {
      // Enable decrement button
      setDisableDecrement(false);
      setStakePayout(stakePayout - 1);
    }
  };

  // Min stake / payout = 1.00
  // Max stake / payout = 30000.00
  // Input can only be numbers and a single dot
  const handleStakePayoutChange = (e) => {
    e.preventDefault();

    // Remove non digit characters from input
    // TODO: Make sure input can only take one period
    // TODO: Make sure input can take only two numbers after period
    const sanitisedInput = e.target.value.replace(/\D/g, "");
    console.log("sanitisedInput: ", sanitisedInput);

    // If stakePayout is less than 0, set it to 0
    if (sanitisedInput <= 0) {
      setStakePayout(0);
      // TODO: Display tooltip error message about min max stake payout
    } else if (sanitisedInput > 30000) {
      setStakePayout(sanitisedInput);
      // TODO: Display tooltip error message about min max stake payout
    } else {
      setStakePayout(sanitisedInput);
    }
  };

  return (
    <aside
      class="w-80 h-11/12 right-0 absolute bg-gray-50 pb-8"
      aria-label="Sidebar"
    >
      <div class="mt-8 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
        <p class="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
          <SolidDollarIcon
            className="w-6 h-6 fill-indigo-600"
            fill="currentColor"
          />
          <span class="ml-3">10,000.00 USD</span>
        </p>
      </div>
      <div class="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200 focus:outline-none">
        <Listbox value={selectedTradeType} onChange={setSelectedTradeType}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">
                {" "}
                Change type of trade{" "}
              </Listbox.Label>
              <div className="relative text-left">
                <Listbox.Button
                  onClick={(e) => {
                    if (isClickedTradeTypeBox) {
                      setIsClickedTradeTypeBox(false);
                    } else {
                      setIsClickedTradeTypeBox(true);
                    }
                  }}
                  className="select-none items-center rounded-md bg-white py-2 text-xs font-medium text-gray-700 focus:outline-none"
                >
                  <div className="flex justify-between">
                    <div className="flex-1 mr-2">
                      {isClickedTradeTypeBox ? (
                        <ChevronLeftIcon
                          strokeWidth="1"
                          fill="currentColor"
                          className="w-4 h-4"
                        />
                      ) : (
                        <ChevronRightIcon
                          strokeWidth="1"
                          fill="currentColor"
                          className="w-4 h-4"
                        />
                      )}
                    </div>
                    <div className="grid grid-flow-col">
                      {selectedTradeType.icon}

                      <p className="font-bold text-sm ml-2">
                        {selectedTradeType.title}
                      </p>
                    </div>
                  </div>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute -left-[235px] -top-[20px] z-10 mt-2 w-[13rem] rounded-md bg-white border-gray-100 border-4 focus:outline-none">
                    <p className="font-semibold p-4 text-sm select-none cursor-default">
                      Trade Types
                    </p>
                    {syntheticModel.trade_type.map((tradeTypeOption) => (
                      <Listbox.Option
                        key={tradeTypeOption.title}
                        className={({ active, selected }) =>
                          classNames(
                            selected
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50",
                            "cursor-default select-none p-4 text-sm"
                          )
                        }
                        value={tradeTypeOption}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-col">
                            <div className="flex justify-start">
                              {tradeTypeOption.icon}

                              <p className="font-medium ml-5">
                                {tradeTypeOption.title}
                              </p>
                            </div>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div class="mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
        <RangeSlider></RangeSlider>
      </div>
      <div className="relative mt-6 mx-6 bg-gray-50 rounded border-4 border-gray-100">
        <div className="relative">
          <span className="relative grid grid-cols-2 justify-between rounded">
            <Tooltip msg="Stake and payout must be within 1.00 to 30000.00">
              <button
                type="button"
                className={`rounded-tl w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                  selectedStakePayout != true
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  if (selectedStakePayout == true) {
                    setSelectedStakePayout(false);
                  }
                }}
              >
                Stake
              </button>
            </Tooltip>
            <Tooltip msg="Stake and payout must be within 1.00 to 30000.00">
              <button
                type="button"
                className={`rounded-tr w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                  selectedStakePayout != false
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedStakePayout == false) {
                    setSelectedStakePayout(true);
                  }
                }}
              >
                Payout
              </button>
            </Tooltip>
          </span>
        </div>
        <div className="bg-white rounded">
          <span className="grid grid-cols-4 justify-between">
            <button
              type="button"
              className={`col-span-1 rounded-l px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${
                disableDecrement ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => decrement(e)}
            >
              –
            </button>
            <div className="col-span-2 grid grid-cols-3 justify-center align-center pr-4 focus:outline-none border-none">
              <input
                type="text"
                className="font-medium text-gray-700 col-span-2 focus:outline-none border-none border-transparent focus:border-transparent focus:ring-0"
                name="stake-payout-input"
                defaultValue="10"
                value={stakePayout}
                onChange={(e) => handleStakePayoutChange(e)}
              ></input>
              <p className="text-gray-600 font-medium my-auto col-span-1 focus:outline-none cursor-default select-none">
                USD
              </p>
            </div>

            <button
              type="button"
              className={`col-span-1 rounded-r px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${
                disableIncrement ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => increment(e)}
            >
              +
            </button>
          </span>
        </div>
      </div>
      <div
        className={`mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ${
          selectedTradeType.simplified_title == "matches_differs"
            ? "block"
            : "hidden"
        }`}
      >
        <div className="select-none cursor-default">
          <div className="grid grid-flow-col justify-between">
            <p className="text-sm mb-1 mt-0 font-semibold text-gray-700 cursor-default select-none">
              Number Predictions
            </p>
          </div>
          <div className="px-2 grid grid-cols-5 gap-5 justify-between">
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              0
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              1
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              2
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              3
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              4
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              5
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              6
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              7
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              8
            </div>
            <div className="text-sm py-2 px-4 bg-indigo-700 text-center text-white font-semibold justify-self-center rounded">
              9
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mx-6 py-2 px-4 rounded border-4 border-gray-100 bg-white">
        <div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-light text-gray-500 mb-1 focus:outline-none cursor-default select-none">
              Payout
            </p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                12.00 USD
              </p>
            )}
          </div>

          <button
            className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
              loader
                ? "bg-indigo-600 opacity-50 disabled:pointer-events-none"
                : "hover:bg-indigo-700 bg-indigo-600"
            }`}
          >
            <div
              className={`bg-transparent ${
                blueIconTransition
                  ? "translate-x-20 ease-out cubic-bezier(0.4, 0, 1, 1) duration-200"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                console.log("blueIconTransition", blueIconTransition);
                if (blueIconTransition == false) {
                  setBlueIconTransition(true);

                  setTimeout(async () => {
                    setBlueIconTransition(false);
                  }, 700);
                } else {
                  setBlueIconTransition(false);
                }
              }}
            >
              {selectedTradeType.blueIcon}
            </div>

            <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
              {selectedTradeType.blueText}
            </p>
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-sm font-light text-gray-500 mb-1 focus:outline-none cursor-default select-none">
              Payout
            </p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                12.00 USD
              </p>
            )}
          </div>
          <button
            className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
              loader
                ? "bg-red-600 opacity-50 disabled:pointer-events-none"
                : "hover:bg-red-700 bg-red-600"
            }`}
          >
            <div
              className={`bg-transparent ${
                redIconTransition
                  ? "translate-x-20 ease-out cubic-bezier(0.4, 0, 1, 1) duration-200"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                console.log("redIconTransition", redIconTransition);
                if (redIconTransition == false) {
                  setRedIconTransition(true);

                  setTimeout(async () => {
                    setRedIconTransition(false);
                  }, 700);
                } else {
                  setRedIconTransition(false);
                }
              }}
            >
              {selectedTradeType.redIcon}
            </div>

            <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
              {selectedTradeType.redText}
            </p>
          </button>
        </div>
      </div>
    </aside>
  );
}
