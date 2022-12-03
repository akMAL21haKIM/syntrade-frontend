import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "../lib/icons";
import { classNames } from "../lib/utilities";

const TradeTypeDropdown = ({ tradeType, setTradeType, syntheticModel }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Listbox value={tradeType} onChange={setTradeType}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {" "}
            Change type of trade{" "}
          </Listbox.Label>
          <div className="relative text-left">
            <Listbox.Button
              onClick={(e) => {
                if (isClicked) {
                  setIsClicked(false);
                } else {
                  setIsClicked(true);
                }
              }}
              className="select-none items-center rounded-md bg-white py-2 text-xs font-medium text-gray-700 focus:outline-none"
            >
              <div className="flex justify-between">
                <div className="flex-1 mr-2">
                  {isClicked ? (
                    <ChevronRightIcon
                      strokeWidth="1"
                      fill="currentColor"
                      className="w-4 h-4"
                    />
                  ) : (
                    <ChevronLeftIcon
                      strokeWidth="1"
                      fill="currentColor"
                      className="w-4 h-4"
                    />
                  )}
                </div>
                <div className="grid grid-flow-col">
                  {tradeType.icon}

                  <p className="font-bold text-sm ml-2">{tradeType.title}</p>
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
                {syntheticModel.trade_type.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active, selected }) =>
                      classNames(
                        selected
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50",
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
  );
};

export default TradeTypeDropdown;
