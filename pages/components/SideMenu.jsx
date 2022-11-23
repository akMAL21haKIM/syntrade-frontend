import { React, Fragment, useState } from "react";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideMenu() {
  const [selectedTradeType, setSelectedTradeType] = useState(
    tradeTypeOptions[0]
  );
  const [isClickedTradeTypeBox, setIsClickedTradeTypeBox] = useState(false);
  const [stakePayout, setStakePayout] = useState(10);

  const increment = (e) => {
    e.preventDefault();
    setStakePayout(stakePayout + 1);
  };

  const decrement = (e) => {
    e.preventDefault();
    setStakePayout(stakePayout - 1);
  };

  const handleChange = (e) => {
    e.preventDefault();

    // Input must be numbers only

    // If stakePayout is less than 0, set it to 0
    if (stakePayout < 0) {
      setStakePayout(0);
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
                  <Listbox.Options className="absolute -left-[235px] -top-[20px] z-10 mt-2 w-54 overflow-hidden rounded-md bg-white border-gray-100 border-4">
                    <p className="font-semibold p-4 text-sm">Trade Types</p>

                    {tradeTypeOptions.map((option) => (
                      <Listbox.Option
                        key={option.title}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "cursor-default select-none p-4 text-sm"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-col">
                            <div className="flex justify-start">
                              {option.icon}

                              <p className="font-medium ml-5">{option.title}</p>
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
            className="rounded-tl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-100 hover:text-gray-700"
          >
            Stake
          </button>
          <button
            type="button"
            className="rounded-tr bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Payout
          </button>
        </span>
        <div className="bg-white rounded">
          <span className="grid grid-cols-4 justify-between">
            <button
              type="button"
              className="col-span-1 rounded-l px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              –
            </button>
            <div className="col-span-2 grid grid-cols-3 justify-center align-center pr-4 ">
              <input
                type="tel"
                className="font-medium text-gray-700 col-span-2 focus:outline-none"
                name="stake-payout-input"
                defaultValue={10}
                onChange={(e) => handleChange(e)}
              ></input>
              <p className="text-gray-600 font-medium my-auto col-span-1">
                USD
              </p>
            </div>

            <button
              type="button"
              className="col-span-1 rounded-r px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
            <p className="text-sm font-semibold text-gray-700 mb-1 text-right">
              12.00 USD
            </p>
          </div>

          <button className="px-4 py-4 bg-indigo-600 rounded w-full grid grid-cols-2 hover:bg-indigo-700">
            <EvenIcon
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 stroke-white"
            />

            <p className="text-sm font-semibold text-white text-right">Even</p>
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-sm font-light text-gray-500 mb-1">Payout</p>
            <p className="text-sm font-semibold text-gray-700 mb-1 text-right">
              12.00 USD
            </p>
          </div>
          <button className="px-4 py-4 bg-red-600 rounded w-full grid grid-cols-2 hover:bg-red-700">
            <OddIcon
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 stroke-white"
            />

            <p className="text-sm font-semibold text-white text-right">Odd</p>
          </button>
        </div>
      </div>
    </aside>
  );
}
