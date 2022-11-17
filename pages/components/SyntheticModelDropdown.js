import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  Boom,
  Crash,
  Volatility,
  ChevronUp,
  ChevronDown,
} from "../../lib/trades";

const syntheticModelOptions = [
  {
    title: "Boom 100 Index",
    icon: Boom,
  },
  {
    title: "Boom 300 Index",
    icon: Boom,
  },
  {
    title: "Boom 500 Index",
    icon: Boom,
  },
  {
    title: "Crash 100 Index",
    icon: Crash,
  },
  {
    title: "Crash 300 Index",
    icon: Crash,
  },
  {
    title: "Crash 500 Index",
    icon: Crash,
  },
  {
    title: "Volatility 10 Index",
    icon: Volatility,
  },
  {
    title: "Volatility 25 Index",
    icon: Volatility,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SyntheticModelDropdown() {
  const [selected, setSelected] = useState(syntheticModelOptions[0]);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {" "}
            Change type of synthetic model{" "}
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
              className="w-72 inline-flex justify-between border-gray-300 border-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <div className="flex justify-between">
                <div className="grid grid-flow-col">
                  {selected.icon}

                  <p className="font-bold text-base mr-12 ml-4">
                    {selected.title}
                  </p>
                </div>
                <div className="flex-1">
                  {isClicked ? ChevronDown : ChevronUp}
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
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex flex-col">
                  <div className="flex justify-start">
                    <p className="font-semibold p-4 text-sm">
                      Boom / Crash Indices
                    </p>
                  </div>
                </div>

                {syntheticModelOptions.slice(0, 5).map((option) => (
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

                <div className="flex flex-col">
                  <div className="flex justify-start">
                    <p className="font-semibold p-4 text-sm">
                      Volatility Indices
                    </p>
                  </div>
                </div>

                {syntheticModelOptions.slice(-2, -1).map((option) => (
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
                    <div className="flex flex-col">
                      <div className="flex justify-start">
                        {option.icon}

                        <p className="font-medium ml-5">{option.title}</p>
                      </div>
                    </div>
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
