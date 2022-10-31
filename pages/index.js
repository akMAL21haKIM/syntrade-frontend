import LogoIcon from "../public/logo.svg?component";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { HiCurrencyDollar } from "react-icons/hi";
import Tooltip from "./components/tooltip";

export default function App() {
  return (
    <div className="flex bg-gray-100 font-sans text-gray-900">
      <aside className="flex h-screen w-20 flex-col items-center border-r e">
        <div className="flex h-18 w-full items-center justify-center border-b border-gray-200">
          <img src={LogoIcon.src} />
        </div>
        <nav className="flex flex-1 flex-col gap-y-4 pt-10 justify-center">
          <a
            className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50"
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
          {/* <button className="pt-2 rounded-full overflow-hidden">
            <img
              className="h-10 w-10 object-cover"
              src="/home/akmal/Desktop/drc-syntrade/public/logo.svg"
              alt=""
            />
          </button> */}
          <a
            className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
            href="#"
          >
            <HiUserCircle className="h-10 w-10 troke-current" />
            <Tooltip>Profile</Tooltip>
          </a>
          <a
            className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100"
            href="#"
          >
            <HiHome className="h-10 w-10 troke-current" />
            <Tooltip>Home</Tooltip>
          </a>
        </div>
      </aside>
      <aside className="h-screen w-[300px]">
        <div className="flex justify-between">
          <HiCurrencyDollar className="h-6 w-6 stroke-current" />
          <h2 className="text-xl font-bold text-gray-500 py3">10,000</h2>
        </div>
      </aside>
    </div>
  );
}
