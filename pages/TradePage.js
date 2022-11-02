import LogoIcon from "../public/logo.png?component";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiCurrencyDollar } from "react-icons/hi";
import Tooltip from "./components/tooltip";
import DropDown from "./components/dropdownmenu";
import RangeSliderT from "./components/slider";

export default function TradePage() {
  return (
    <div className="flex bg-white font-sans text-gray-900 md:max-w-2xl">
      {/* left navbar menu */}
      <aside className="flex h-screen w-20 flex-col items-center border-r bg-gray-200 border-l border-gray-200">
        <div className="flex scale-125 items-center justify-center border-b border-gray-200">
          <img src={LogoIcon.src} />
        </div>
        <nav className="flex flex-1 flex-col gap-y-4 pt-10 justify-center">
          <a
            className="group relative rounded-xl bg-gray-100 p-2 text-yellow-400 hover:bg-gray-50"
            href="#"
          >
            <HiOutlineDocumentReport className="h-10 w-10 stroke-current" />
            <Tooltip>Market</Tooltip>
          </a>
          <a
            className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
            href="#"
          >
            <HiCreditCard className="h-10 w-10 stroke-current" />
            <Tooltip>Card</Tooltip>
          </a>
          <a
            className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
            href="#"
          >
            <HiOutlineBell className="h-10 w-10 fill-current" />
            <Tooltip>Notification</Tooltip>
          </a>
        </nav>
        <div className="flex flex-col items-center gap-y-4 py-10 border-b border-gray-300">
          <a
            className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
            href="#"
          >
            <HiUserCircle className="h-10 w-10 troke-current" />
            <Tooltip>Profile</Tooltip>
          </a>
        </div>
      </aside>

      {/* main body - chart */}
      <div className="flex h-screen flex-1 flex-col">
        <main className="flex-1 px-5">
          <div className="my-5 h-32 bg-gray-300 ">
            <nav className="flex items-center justify-between px-12 py-6">
              <DropDown />
            </nav>
            <section className="py-16 px-12 bg-gray-600"></section>
          </div>
        </main>
      </div>

      {/* right side menu */}
      <aside className="absolute inset-y-0 right-0 h-screen w-[300px] flex flex-col bg-gray-200 border-l border-gray-200">
        <div className="flex h-18 items-center gap-x-4 px-6">
          <HiCurrencyDollar className="h-6 w-6 fill-current" />
          <h2 className="text-2xl font-bold text-gray-500 py3">
            10,000.00 USD
          </h2>
        </div>

        {/* Trade Type */}
        <div className="static h-36 w-38 m-7 bg-white rounded-md">
          <h3 className="text-xl font-medium text-black py-2 px-3 border-b border-gray-300">
            Trade type
          </h3>
          <div className="absolute h-10 w-1/2 bg-gray-100 mx-12 my-7 border border-gray-300 rounded-s">
            <h3 className="text-xl font-medium text-center pt-1">
              Rise / Fall
            </h3>
          </div>
        </div>

        {/* Duration */}
        <div className="static h-36 w-38 m-6 bg-white rounded-md">
          <h3 className="text-xl font-medium text-black py-2 px-3 border-b border-gray-300">
            Duration
          </h3>
          <div className="static">
            <RangeSliderT></RangeSliderT>
          </div>
        </div>

        {/* Stake / Payout */}
        <div className="static h-36 w-38 m-6 bg-white rounded-md items-center justify-center">
          <button className="relative h-10 w-1/2 text-lg font-bold rounded-tl-md border-b border-r hover:bg-blue-500 hover:text-white">
            Stake
          </button>
          <button className="relative h-10 w-1/2 text-lg font-bold rounded-tr-md border-b border-r hover:bg-blue-500 hover:text-white">
            Payout
          </button>
          {/* number counter */}
          <div className="flex h-10 w-3/4 rounded-lg relative bg-transparent mt-7 ml-8">
            <button
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="text"
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
              name="custom-input-number"
              placeholder="USD"
            ></input>
            <button
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>

        {/* Rise / Fall buttons */}
        <div className="static h-36 w-38 m-6 bg-white rounded-md">
          <button className="absolute h-10 w-1/2 mx-14 my-6 bg-teal-400 rounded-md hover:bg-teal-300">
            Rise
          </button>
          <button className="absolute h-10 w-1/2 mx-14 my-20 bg-red-400 rounded-md hover:bg-red-300">
            Fall
          </button>
        </div>
      </aside>

      {/* footer */}
      <footer>
        <div className="absolute h-10 text-center p-2 bg-gray-200 inset-x-0 bottom-0">
          <p>© 2022 Syntrade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
