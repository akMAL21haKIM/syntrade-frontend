import { Fragment, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import LogoIcon from "../public/old_logo.svg";
import { XMarkIcon, Bars3Icon, ReportsIcon, ProfileIcon } from "../lib/icons";
import { classNames } from "../lib/utilities";
import Link from "next/link";
import ResetBalance from "../graphql/resetBalance";
import { useMutation } from "@apollo/client";
import SingleActionModal from "./SingleActionModal";
import Notification from "./Notification";
import Cookies from "js-cookie";

const NavBar = ({ notify, setNotify }) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [openResetBalanceSuccessModal, setOpenResetBalanceSuccessModal] =
    useState(false);

  // const [resetBalance, { data, loading, error }] = useMutation(ResetBalance);

  const userId = 1;

  let isUserLoggedIn = false;

  if (Cookies.get("signedin")) {
    isUserLoggedIn = true;
  }

  const handleResetWalletBalance = async () => {
    // Reset user's wallet balance to 10,000 MYR
    // await resetBalance({
    //   variables: {
    //     userId: userId,
    //   },
    // });
    // useMutation(ResetBalance, { variables: { userId: userId } });
    setNotify(true);

    // Add popup modal saying that reset is successful
    // setOpenResetBalanceSuccessModal(true);
  };

  const handleLogout = async () => {
    // Log out
  };

  return (
    <>
      {/* <SingleActionModal
        id="modal-reset-wallet-success"
        openModal={openResetBalanceSuccessModal}
        setOpenModal={setOpenResetBalanceSuccessModal}
        modalTitle="Reset balance successful"
        modalDescription="You just reset your wallet balance to 10,000.00 MYR!"
      /> */}

      <Popover className="relative bg-white border-gray-100 border-b-2">
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">Syntrade</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={LogoIcon.src}
                  alt="Syntrade logo"
                />
              </Link>
              <p className="px-6 my-auto text-xl font-bold">Syntrade</p>
            </div>

            {/* Check if user is logged in or not.
        If user is logged in, show profile icon.
        Else, show log in and sign up buttons. */}

            {isUserLoggedIn ? (
              <>
                {/* Mobile menu */}
                <div className="-my-2 -mr-2 md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    />
                  </Popover.Button>
                  {/* Mobile menu transition */}
                  <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-20 absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
                    >
                      <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <img
                                className="h-10 w-auto"
                                src={LogoIcon.src}
                                alt="Syntrade"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                  fill="none"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                />
                              </Popover.Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 py-6 px-2">
                          <div>
                            <Link href="/trade">
                              <p className="mt-0 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:rounded">
                                Trade
                              </p>
                            </Link>

                            <Link href="/profile">
                              <p className="mt-1 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:rounded">
                                Profile
                              </p>
                            </Link>

                            <Link href="/reports">
                              <p className="mt-1 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:rounded">
                                Reports
                              </p>
                            </Link>

                            <Link
                              href="#"
                              onClick={() => handleResetWalletBalance()}
                            >
                              <p className="mt-1 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:rounded">
                                Reset balance
                              </p>
                            </Link>

                            <Link href="#">
                              <p className="mt-1 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:rounded">
                                Sign out
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
                {/* Desktop menu */}
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        onClick={(e) => {
                          if (isMenuClicked) {
                            setIsMenuClicked(false);
                          } else {
                            setIsMenuClicked(true);
                          }
                        }}
                        className="flex rounded-full bg-transparent text-sm focus:outline-none hover:ring-gray-100 hover:ring-4"
                      >
                        <span className="sr-only">Open user menu</span>
                        <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className={`h-full w-full hover:text-indigo-600 hover:opacity-60 ${
                              isMenuClicked
                                ? "text-indigo-600 opacity-60"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/trade"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Trade
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/reports"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Reports
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Reset balance
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                {/* Mobile menu */}
                <div className="-my-2 -mr-2 md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    />
                  </Popover.Button>
                  {/* Mobile menu transition */}
                  <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-20 absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
                    >
                      <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Syntrade"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                  fill="none"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                />
                              </Popover.Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                          <div>
                            <Link
                              href="/signup"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Sign up
                            </Link>
                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                              Existing user?{" "}
                              <Link
                                href="/login"
                                className="text-indigo-600 hover:text-indigo-500"
                              >
                                Log in
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
                {/* Desktop menu */}
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                  <Link
                    href="/login"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-indigo-600 bg-white px-4 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Popover>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default NavBar;
