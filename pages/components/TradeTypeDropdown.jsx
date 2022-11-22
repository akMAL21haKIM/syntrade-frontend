import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  Boom,
  Crash,
  Volatility,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  RiseFall,
  Multipliers,
  EvenOdd,
  MatchesDiffers,
} from "../../lib/icons";

const tradeTypeOptions = [
  {
    title: "Rise / Fall",
    icon: RiseFall,
  },
  {
    title: "Multipliers",
    icon: Multipliers,
  },
  {
    title: "Even / Odd",
    icon: EvenOdd,
  },
  {
    title: "Matches / Differs",
    icon: MatchesDiffers,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TradeTypeDropdown() {
  const [selected, setSelected] = useState(tradeTypeOptions[0]);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Listbox value={selected} onChange={setSelected}>
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
              className="w-[250px] h-[57px] inline-flex rounded-md bg-white px-4 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <div className="flex justify-between">
                <div className="flex-1 mr-4">
                  {isClicked ? ChevronLeft : ChevronRight}
                </div>
                <div className="grid grid-flow-col">
                  {selected.icon}

                  <p className="font-bold text-sm ml-4">{selected.title}</p>
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
              <Listbox.Options className="absolute -left-[220px] -top-[10px] z-[10px] mt-2 w-54 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <p className="font-semibold p-4 text-sm">
                  Boom / Crash Indices
                </p>

                {tradeTypeOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
}
