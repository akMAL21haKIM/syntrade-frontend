import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon, BoomIcon } from "../../lib/icons";
import { syntheticModelOptions } from "../../lib/options";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SyntheticModelDropdown({
  setSyntheticModel,
  syntheticModel,
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Listbox value={syntheticModel} onChange={setSyntheticModel}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change type of synthetic model
          </Listbox.Label>
          <div className="left-[30px] z-10 top-[90px] absolute text-left">
            <Listbox.Button
              onClick={(e) => {
                if (isClicked) {
                  setIsClicked(false);
                } else {
                  setIsClicked(true);
                }
              }}
              className="w-72 inline-flex justify-between border-gray-100 border-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-200"
            >
              <div className="flex justify-between">
                <div className="grid grid-flow-col">
                  {syntheticModel.icon}

                  <p className="font-bold text-base mr-12 ml-4">
                    {syntheticModel.title}
                  </p>
                </div>
                <div className="flex-1 ">
                  {isClicked ? (
                    <ChevronDownIcon
                      fill="currentColor"
                      className="w-6 h-6 right-0"
                    />
                  ) : (
                    <ChevronUpIcon
                      fill="currentColor"
                      className="w-6 h-6 right-0"
                    />
                  )}
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
              <Listbox.Options className="absolute left-0 z-10 mt-2 w-72 origin-top-right overflow-hidden rounded-md bg-white border-4 border-gray-100">
                <div className="flex flex-col">
                  <div className="flex justify-start">
                    <p className="font-semibold p-4 text-sm">
                      Boom / Crash Indices
                    </p>
                  </div>
                </div>

                {syntheticModelOptions.slice(0, 2).map((option) => (
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

                <Listbox.Option
                  key={syntheticModelOptions[2].title}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "cursor-default select-none p-4 text-sm"
                    )
                  }
                  value={syntheticModelOptions[2]}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-start">
                      {syntheticModelOptions[2].icon}

                      <p className="font-medium ml-5">
                        {syntheticModelOptions[2].title}
                      </p>
                    </div>
                  </div>
                </Listbox.Option>
                <Listbox.Option
                  key={syntheticModelOptions[3].title}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "cursor-default select-none p-4 text-sm"
                    )
                  }
                  value={syntheticModelOptions[3]}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-start">
                      {syntheticModelOptions[3].icon}

                      <p className="font-medium ml-5">
                        {syntheticModelOptions[3].title}
                      </p>
                    </div>
                  </div>
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
