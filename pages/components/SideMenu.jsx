import { React, Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import RangeSlider from "./RangeSlider";
import { tradeTypeOptions } from "../../lib/options";
import {
  SolidDollarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EvenOddIcon,
  EvenIcon,
  OddIcon,
} from "../../lib/icons";
import { classNames } from "../../lib/utilities";

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
      // TODO: Disable increment button
      setDisableIncrement(true);
      // TODO: Show tooltip error message
    }

    setStakePayout(stakePayout + 1);
  };

  const decrement = (e) => {
    e.preventDefault();

    // If stakePayout is less than 0, set it to 0
    if (stakePayout <= 0) {
      setStakePayout(0);
      // Disable decrement button
      setDisableDecrement(true);
      // TODO: Show tooltip error message
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
      // TODO: Display tooltip error message about min max stake payout
      setStakePayout(sanitisedInput);
    } else {
      setStakePayout(sanitisedInput);
    }
  };

  return (
    <aside
      class="w-72 h-11/12 right-0 absolute bg-gray-50 pb-8"
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
      <div class="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200">
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
                  className="select-none items-center rounded-md bg-white py-2 text-xs font-medium text-gray-700"
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
                  <Listbox.Options className="absolute -left-[235px] -top-[20px] z-10 mt-2 w-[13rem] rounded-md bg-white border-gray-100 border-4">
                    <p className="font-semibold p-4 text-sm">Trade Types</p>
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
      <div className="mt-6 mx-6 bg-gray-50 rounded border-4 border-gray-100">
        <span className="grid grid-cols-2 justify-between rounded">
          <button
            type="button"
            className={`rounded-tl px-4 py-2 text-sm font-semibold focus:outline-none ${
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
          <button
            type="button"
            className={`rounded-tr px-4 py-2 text-sm font-semibold focus:outline-none ${
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
        </span>
        <div className="bg-white rounded">
          <span className="grid grid-cols-4 justify-between">
            <button
              // disableDecrement ? "visible" : "invisible"
              type="button"
              data-tooltip-target="tooltip-left"
              data-tooltip-placement="left"
              className={`col-span-1 rounded-l px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${
                disableDecrement ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => decrement(e)}
            >
              –
            </button>
            <div
              id="tooltip-left"
              role="tooltip"
              class={`absolute z-20 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 ${
                disableDecrement ? "visible inline-block" : "invisible"
              }`}
            >
              Tooltip on left
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="col-span-2 grid grid-cols-3 justify-center align-center pr-4 ">
              <input
                type="text"
                className="font-medium text-gray-700 col-span-2 focus:outline-none"
                name="stake-payout-input"
                defaultValue="10"
                value={stakePayout}
                onChange={(e) => handleStakePayoutChange(e)}
              ></input>
              <p className="text-gray-600 font-medium my-auto col-span-1">
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
      <div className="mt-6 mx-6 py-2 px-4 rounded border-4 border-gray-100 bg-white">
        <div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-light text-gray-500 mb-1">Payout</p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded"></div>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right">
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
            {selectedTradeType.blueIcon}

            <p className="text-sm font-semibold text-white text-right">
              {selectedTradeType.blueText}
            </p>
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-sm font-light text-gray-500 mb-1">Payout</p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded"></div>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right">
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
            {selectedTradeType.redIcon}

            <p className="text-sm font-semibold text-white text-right">
              {selectedTradeType.redText}
            </p>
          </button>
        </div>
      </div>
    </aside>
  );
}
