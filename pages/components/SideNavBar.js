import React from "react";
import LogoIcon from "../../public/logo.svg";
import Tooltip from "./Tooltip";
import Link from "next/link";

const SideNavBar = () => {
  return (
    <aside className="flex h-screen w-20 flex-col items-center border-r bg-[#F1F1F1] border-l border-gray-200">
      <div className="flex scale-125 items-center justify-center mt-3">
        <Link href="/">
          <img
            src={LogoIcon.src}
            className="scale-50 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-75 hover:cursor-pointer"
          />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-y-4 pt-10 mt-56">
        <Link
          className="group relative rounded-xl p-2 text-[#6366F1] hover:text-white hover:bg-[#6366F1]"
          href="/reports"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <Tooltip>Report</Tooltip>
        </Link>
        <Link
          className="group relative rounded-xl p-2 text-[#6366F1] hover:text-white hover:bg-[#6366F1]"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>

          <Tooltip>Wallet</Tooltip>
        </Link>

        <Link
          className="group relative rounded-xl p-2 text-[#6366F1] hover:text-white hover:bg-[#6366F1]"
          href="/profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <Tooltip>Profile</Tooltip>
        </Link>
      </nav>
    </aside>
  );
};

export default SideNavBar;
