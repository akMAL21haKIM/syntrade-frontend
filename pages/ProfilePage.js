import LogoIcon from "../public/logo.svg?component";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoWalletSharp } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi";
import { HiCurrencyDollar } from "react-icons/hi";
import Tooltip from "./components/Tooltip";
import Footer from "./components/Footer";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

const TradePage = () => {
  return (
    <div className="flex bg-white font-sans text-gray-900 md:max-w-2xl">
      {/* left navbar menu */}
      <aside className="flex h-screen w-20 flex-col items-center border-r bg-[#F1F1F1] border-l border-gray-200">
        <div className="flex scale-125 items-center justify-center mt-3">
          <img
            src={LogoIcon.src}
            href=""
            className="scale-50 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-75 hover:cursor-pointer"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-y-4 pt-10 mt-56">
          <a
            className="group relative rounded-xl p-2 text-[#6366F1] hover:text-white hover:bg-[#6366F1]"
            href="#"
          >
            <HiOutlineDocumentReport className="h-10 w-10 stroke-current" />
            <Tooltip>Report</Tooltip>
          </a>

          <a className="group relative rounded-xl p-2 text-[#6366F1]" href="#">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${
                  open
                    ? "group relative rounded-xl p-2 text-white bg-[#6366F1]"
                    : "text-opacity-90"
                }`}
                  >
                    <span>
                      <IoWalletSharp className="h-10 w-10 stroke-current" />
                    </span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter=" duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave=" duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 mt-3 w-80 translate-x-16 -translate-y-16 px-4 sm:px-0">
                      <div className="bg-white p-3 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <h3>Your balance:</h3>
                        <div className="flex h-18 items-center gap-x-4 px-6">
                          <HiCurrencyDollar className="h-6 w-6 fill-current" />
                          <h2 className="text-xl font-bold text-gray-500 py3">
                            10,000.00 USD
                          </h2>
                        </div>
                        <button className="w-1/2 items-center justify-center rounded-md text-center text-lg text-white bg-[#6366F1]">
                          Reset
                        </button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </a>
          <a
            className="group relative rounded-xl p-2 text-white bg-[#6366F1]"
            href="#"
          >
            <HiUserCircle className="h-10 w-10 troke-current" />
            <Tooltip>Profile</Tooltip>
          </a>
        </nav>
      </aside>

      {/* main body - chart */}
      <div className="flex h-screen flex-1 flex-col">
        <main className="flex-1 px-5">
          <div></div>
        </main>
      </div>

      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default TradePage;
